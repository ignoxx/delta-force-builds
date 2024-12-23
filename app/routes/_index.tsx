import { ClientActionFunctionArgs, MetaFunction, useLoaderData } from '@remix-run/react';
import { useState, useMemo } from "react"
import { WeaponBuildCard } from "~/components/WeaponBuildCard";
import { FilterButtons } from "~/components/FilterButtons";
import { SortButtons, SortOption } from "~/components/SortButtons";
import { SearchInput } from "~/components/SearchInput";
import { pb } from "~/lib/pb";
import { Build } from "~/lib/build";
import { CreateBuildModal } from '~/components/CreateBuildModal';

export const meta: MetaFunction = () => {
  return [
    { title: "Delta Force - Loadouts" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getBuilds(searchQuery: string, sortOption: SortOption, typeFilter?: string): Promise<Build[]> {
  const searchFilter = searchQuery ? `(title ~ "${searchQuery}"  || description ~ "${searchQuery}"  || weapon ~ "${searchQuery}")` : null
  const weaponTypeFilter = typeFilter ? `("${typeFilter}" = type.name)` : null

  let filter = ""
  if (searchFilter && weaponTypeFilter) {
    filter = `${searchFilter} && ${weaponTypeFilter}`
  } else if (searchFilter) {
    filter = searchFilter
  } else if (weaponTypeFilter) {
    filter = weaponTypeFilter
  }

  const builds = await pb.collection("builds").getFullList<Build>({
    filter: filter,
    sort: sortOption,
    expand: "type",
  });

  return builds
}

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const url = new URL(request.url);
  const sortOption: SortOption = url.searchParams.get("sort") as SortOption || "-likes";
  const searchQuery = url.searchParams.get("query") || "";

  const builds = await getBuilds(searchQuery, sortOption)

  return builds;
}

export default function Index() {
  const [sortOption, setSortOption] = useState<SortOption>("-copies")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [builds, setBuilds] = useState(useLoaderData<typeof clientLoader>())

  useMemo(async () => {
    setBuilds(await getBuilds(searchQuery, sortOption, typeFilter))
  }, [searchQuery, sortOption, typeFilter])

  console.log(builds)

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Delta Force Loadouts</h1>
        <CreateBuildModal />
      </header>
      <main className="p-4 pt-8 lg:p-6 lg:pt-12">
        <div className="space-y-10 mb-12">
          <SearchInput onSearch={setSearchQuery} />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FilterButtons setFilter={setTypeFilter} selected={typeFilter} />
          </div>
          <SortButtons setSort={setSortOption} selected={sortOption} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {builds.map((build) => (
            <WeaponBuildCard key={build.id} build={build} />
          ))}
        </div>
      </main>
    </div>)
}

