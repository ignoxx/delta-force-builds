import { MetaFunction } from '@remix-run/react';
import { useState, useEffect } from "react"
import { WeaponBuildCard } from "~/components/WeaponBuildCard";
import { FilterButtons } from "~/components/FilterButtons";
import { SortButtons, SortOption } from "~/components/SortButtons";
import { SearchInput } from "~/components/SearchInput";
import { pb } from "~/lib/pb";
import { Build } from "~/lib/build";
import { CreateBuildModal } from '~/components/CreateBuildModal';
import { ServerFilterButtons } from '~/components/ServerButtons';
import { ModeFilterButtons } from '~/components/ModeFilterButtons';
import { SeasonButtons, SeasonQuickFilter } from '~/components/SeasonButtons';

const pepes: string[] = [
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

async function getBuilds(searchQuery?: string, sortOption?: SortOption, typeFilter?: string, serverFilter?: string, modeFilter?: string, seasonFilter?: SeasonQuickFilter): Promise<Build[]> {
  const searchFilter = searchQuery ? `(title ~ "${searchQuery}"  || description ~ "${searchQuery}"  || weapon ~ "${searchQuery}" || author ~ "${searchQuery}" || code ~ "${searchQuery}")` : null
  const weaponTypeFilter = typeFilter ? `(type.name = "${typeFilter}")` : null
  const gameServerFilter = serverFilter ? `(server ~ "${serverFilter}")` : null
  const gameModeFilter = modeFilter ? `(mode ~ "${modeFilter}")` : null
  const gameSeasonFilter = seasonFilter ? `(${seasonFilter.filter})` : null

  const allFilters = Array.from([searchFilter, weaponTypeFilter, gameServerFilter, gameModeFilter, gameSeasonFilter]).filter((x) => { return x != null })
  let filter = ""

  if (allFilters.length === 1) {
    filter = allFilters.pop()
  } else if (allFilters.length > 1) {
    filter = allFilters.join(" && ")
  }

  let sortFilter: string = sortOption
  if (sortFilter.startsWith("-")) {
    sortFilter = sortFilter.split("-")[1]
  }

  if (!(!searchFilter && !weaponTypeFilter && serverFilter === "global" && !gameModeFilter && sortFilter === "copies")) {
    // @ts-expect-error "plausible exists"
    window.plausible('Filter set', {
      props: {
        searchFilter: searchQuery,
        weaponFilter: typeFilter,
        serverFilter: serverFilter,
        modeFilter: modeFilter,
        seasonFilter: seasonFilter?.label ?? null,
        sortFilter: sortFilter
      }
    })
  }

  const builds = await pb.collection("builds_view").getFullList<Build>({
    filter: filter,
    sort: sortOption ?? "-copies",
    expand: "type",
  });

  return builds
}

export default function Index() {
  const [sortOption, setSortOption] = useState<SortOption>("-copies")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [serverFilter, setServerFilter] = useState<string | undefined>("global")
  const [modeFilter, setModeFilter] = useState<string | undefined>()
  const [seasonFilter, setSeasonFilter] = useState<SeasonQuickFilter | undefined>()
  const [builds, setBuilds] = useState<Build[]>([])

  useEffect(() => {
    getBuilds(searchQuery, sortOption, typeFilter, serverFilter, modeFilter, seasonFilter).then((builds) => {
      setBuilds(builds)
    })
  }, [searchQuery, sortOption, typeFilter, serverFilter, modeFilter, seasonFilter])

  const onBuildCreated = (newBuild: Build) => {
    setBuilds([newBuild, ...builds])
  };


  return (
    <div className="min-h-screen m-1 lg:m-8">
      <header className="bg-background p-4 flex justify-center items-center mt-20">

        <img
          src={`/pepes/${pepe}`}
          alt={""}
          className="w-16 h-16 object-contain rounded-md mr-6 no-drag"
        />
        <div>
          <h1 className="text-xl font-bold flex flex-shrink items-center justify-center">Loadouts for <span className='pl-1 text-green-400'>Delta Force</span></h1>
          <div>
            <div className='flex justify-start items-center gap-1'>
              <CreateBuildModal className='text-xs underline text-green-300 opacity-85 cursor-pointer' onBuildCreated={onBuildCreated} />
              <div className='text-xs text-gray-600 no-underline'> by <a href='https://x.com/moonsteroid' target='_blank' className='underline' rel="noreferrer">@moonsteroid</a></div>
            </div>
          </div>
        </div>
      </header>
      <main className="p-4 pt-8 lg:p-6 lg:pt-12">
        <div className="space-y-10 mb-12">
          <SearchInput onSearch={setSearchQuery} />
          <div className="flex flex-col items-center justify-center gap-2">
            <ServerFilterButtons setFilter={setServerFilter} selected={serverFilter} />
            <SeasonButtons setFilter={setSeasonFilter} selected={seasonFilter} />
            <FilterButtons setFilter={setTypeFilter} selected={typeFilter} />
            <ModeFilterButtons setFilter={setModeFilter} selected={modeFilter} />
          </div>
          <SortButtons setSort={setSortOption} selected={sortOption} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {builds.map((build) => (
            <WeaponBuildCard key={build.id} build={build} />
          ))}
        </div>
      </main>
    </div>)
}

