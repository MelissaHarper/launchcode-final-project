import providerData from "../../assets/data/tmdb-watch-providers.json";
import genreData from "../../assets/data/tmdbGenres.json";
import { useAppContext } from "../../context/AppContext.jsx";
import { sortByRank } from "../services/utils.js";
import FilterDropdown from "./FilterModal.jsx";

function FilterContainer() {
  const genres = genreData;
  const providers = sortByRank(providerData);
  const {
    selectedGenres,
    setSelectedGenres,
    selectedProviders,
    setSelectedProviders,
    selectedKeywords,
    setSelectedKeywords,
    handleFilterSubmit,
  } = useAppContext();

  return (
    <>
      <div className=" relative   text-white flex  flex-wrap gap-4 justify-center flex-col md:flex-row lg:justify-center">
        <div className=" w-[400px] ">
          <FilterDropdown
            header={"Genres"}
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
          <FilterDropdown
            header={"Streaming Service Providers"}
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
        <div className=" w-[400px] ">
          <FilterDropdown
            header={"Keywords"}
            assignedList={selectedKeywords}
            setAssignedList={setSelectedKeywords}
            selectionIdentifier={"Keywords"}
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
      </div>
      <div className="mt-4">
        <button onClick={handleFilterSubmit}>Submit</button>
      </div>
    </>
  );
}

export default FilterContainer;
