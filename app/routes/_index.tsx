import { ClientActionFunctionArgs, MetaFunction, useLoaderData } from '@remix-run/react';
import { useState, useMemo } from "react"
import { WeaponBuildCard } from "~/components/WeaponBuildCard";
import { FilterButtons } from "~/components/FilterButtons";
import { SortButtons, SortOption } from "~/components/SortButtons";
import { SearchInput } from "~/components/SearchInput";
import { pb } from "~/lib/pb";
import { Build } from "~/lib/build";
import { CreateBuildModal } from '~/components/CreateBuildModal';
import { ServerFilterButtons } from '~/components/ServerButtons';
import { Separator } from "~/components/ui/separator";

// array of paths of pepes in pepes/..
const pepes: string[] = [
  "1759-pepe-deletethis.png",
  "2652-pepe-gun.png",
  "3168-pepe-gun.png",
  "3351-pepe-swat.png",
  "6023-gunscared.png",
  "7451-pepegunr.png",
  "7627-garman-pepe.png",
  "7688-pepegun.png",
  "8029-peepogun.png",
  "8509-peepohappygun.png",
  "9990-pepeclown.png",
]

function getRandomPepe(): string {
  return pepes[Math.floor(Math.random() * pepes.length)]
}

const pepe = getRandomPepe()

export const meta: MetaFunction = () => {
  return [
    { title: "Delta Force - Loadouts" },
    { name: "description", content: "Explore and share you build codes for Warfare and Operation modes!" },
  ];
};

async function getBuilds(searchQuery: string, sortOption: SortOption, typeFilter?: string, serverFilter?: string): Promise<Build[]> {
  const searchFilter = searchQuery ? `(title ~ "${searchQuery}"  || description ~ "${searchQuery}"  || weapon ~ "${searchQuery}" || author ~ "${searchQuery}")` : null
  const weaponTypeFilter = typeFilter ? `("${typeFilter}" = type.name)` : null
  const gameServerFilter = serverFilter ? `("${serverFilter}" ~ server)` : null

  const allFilters = Array.from([searchFilter, weaponTypeFilter, gameServerFilter]).filter((x) => { return x != null })
  let filter = ""

  if (allFilters.length === 1) {
    filter = allFilters.pop()
  } else if (allFilters.length > 1) {
    filter = allFilters.join(" && ")
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
  const searchQuery = url.searchParams.get("query") || "";
  const sortOption: SortOption = url.searchParams.get("sort") as SortOption || "-copies";
  const serverFilter = url.searchParams.get("server") || "global";

  const builds = await getBuilds(searchQuery, sortOption, serverFilter)

  return builds;
}

export default function Index() {
  const [sortOption, setSortOption] = useState<SortOption>("-copies")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [serverFilter, setServerFilter] = useState<string | undefined>("global")
  const [builds, setBuilds] = useState(useLoaderData<typeof clientLoader>())

  useMemo(async () => {
    setBuilds(await getBuilds(searchQuery, sortOption, typeFilter, serverFilter))
  }, [searchQuery, sortOption, typeFilter, serverFilter])

  return (
    <div className="min-h-screen m-1 lg:m-8">
      <header className="bg-background p-4 flex justify-center items-center mt-20">
        <img
          src={`/pepes/${pepe}`}
          alt={""}
          className="w-16 h-16 object-contain rounded-md mr-6"
        />
        <div>
          <h1 className="text-xl font-bold flex flex-shrink items-center justify-center">Loadouts for <span className='pl-1 text-green-400'>Delta Force</span></h1>
          <div className='text-xs underline text-green-300 opacity-85 cursor-pointer'> <CreateBuildModal /> </div>
        </div>
      </header>
      <main className="p-4 pt-8 lg:p-6 lg:pt-12">
        <div className="space-y-10 mb-12">
          <SearchInput onSearch={setSearchQuery} />
          <div className="flex flex-col items-center justify-center gap-2">
            <ServerFilterButtons setFilter={setServerFilter} selected={serverFilter} />
            <Separator className='max-w-60' />
            <FilterButtons setFilter={setTypeFilter} selected={typeFilter} />
          </div>
          <SortButtons setSort={setSortOption} selected={sortOption} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {builds.map((build) => (
            <WeaponBuildCard key={build.id} build={build} />
          ))}
        </div>
      </main>
    </div>)
}

