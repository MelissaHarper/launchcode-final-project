import genreData from "../assets/data/tmdbGenres.json";
import providerData from "../assets/data/watchProvidersIDsNames.json";
import FilterDropdown from "./Filters.jsx";
import { sortByRank } from "./services/utils.js";
import { useAppContext } from "../context/AppContext.jsx";

function FilterContainer() {
  const genres = genreData;
  const providers = sortByRank(providerData);
  const {
    selectedGenres,
    setSelectedGenres,
    selectedProviders,
    setSelectedProviders,
    handleFilterSubmit,
  } = useAppContext();

  return (
    <div className=" relative h-[100dvh] -top-30 md:-top-20 text-white flex md:flex-row items-start  gap-4 justify-content-start flex-col lg:justify-center">
      <div className=" w-[400px] ">
        <p className="text-2xl ">Genres</p>
        <FilterDropdown
          assignedList={selectedGenres}
          setAssignedList={setSelectedGenres}
          options={genres}
          selectionIdentifier={"Selected Genres"}
        >
          <FilterDropdown.Header />
          <FilterDropdown.Button
            listStyles={
              "!-left-5 !-translate-x-full bg-[#605e80]  border text-white"
            }
          />
          <FilterDropdown.AssignedList />
        </FilterDropdown>
      </div>
      <div className=" w-[400px] ">
        <p className="text-2xl ">Streaming Service Providers</p>
        <FilterDropdown
          assignedList={selectedProviders}
          setAssignedList={setSelectedProviders}
          options={providers}
          selectionIdentifier={"Streaming Providers"}
        >
          <FilterDropdown.Header />
          <FilterDropdown.Button
            listStyles={
              "!-left-5 !-translate-x-full bg-[#605e80]  border text-white"
            }
          />
          <FilterDropdown.AssignedList />
        </FilterDropdown>
      </div>
      <button
        className="md:absolute md:top-23 md:right-1 lg:top-23 lg:right-10 xl:right-20 2xl:right-66"
        onClick={handleFilterSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default FilterContainer;
