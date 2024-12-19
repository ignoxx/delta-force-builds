import { ClientActionFunctionArgs, MetaFunction, useLoaderData } from '@remix-run/react';
import { useState, useMemo } from "react"
import { WeaponBuildCard } from "~/components/WeaponBuildCard";
import { FilterButtons } from "~/components/FilterButtons";
import { SortDropdown, SortOption } from "~/components/SortDropdown";
import { SearchInput } from "~/components/SearchInput";
import { pb } from "~/lib/pb";
import { Build } from "~/lib/build";

export const meta: MetaFunction = () => {
  return [
    { title: "Delta Force - Loadouts" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getBuilds(searchQuery: string, sortOption: string, typeFilter?: string): Promise<Build[]> {
  let filter = searchQuery.length > 0 ? `title ~ "${searchQuery}" || description ~ "${searchQuery}"` : ""
  filter += typeFilter ? `type.name = "${typeFilter}"` : ""

  const builds = await pb.collection("builds").getFullList<Build>({
    filter: filter,
    sort: sortOption === "mostLiked" ? "-likes" : "created",
    expand: "type",
  });

  return builds
}

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const url = new URL(request.url);
  const sortOption = url.searchParams.get("sort") || "mostLiked";
  const searchQuery = url.searchParams.get("query") || "";

  const builds = await getBuilds(searchQuery, sortOption)

  return builds;
}

export default function Index() {
  const [sortOption, setSortOption] = useState<SortOption>("mostLiked")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [builds, setBuilds] = useState(useLoaderData<typeof clientLoader>())

  useMemo(async () => {
    console.log("REFETCHING with", searchQuery, sortOption, typeFilter)
    setBuilds(await getBuilds(searchQuery, sortOption, typeFilter))

  }, [searchQuery, sortOption, typeFilter])

  console.log(builds)

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="space-y-4 mb-6">
        <SearchInput onSearch={setSearchQuery} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <FilterButtons setFilter={setTypeFilter} selected={typeFilter} />
        </div>
        <div className="flex flex-wrap items-end justify-end gap-2">
          <SortDropdown onSort={setSortOption} currentSort={sortOption} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {builds.map((build) => (
          <WeaponBuildCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  )
}

