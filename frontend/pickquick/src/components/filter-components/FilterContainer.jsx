import { useRef } from "react";
import providerData from "../../assets/data/tmdb-watch-providers.json";
import genreData from "../../assets/data/tmdbGenres.json";
import { useAppContext } from "../../context/AppContext.jsx";
import { FiSearch } from "react-icons/fi";
import FilterDropdown from "./FilterModal.jsx";
import SearchModal from "../services/SearchModal.jsx";
import { sortByRank } from "../services/utils.js";

function FilterContainer() {
  const genres = genreData;
  const providers = sortByRank(providerData);
  const searchModalRef = useRef(null);
  const {
    selectedGenres,
    setSelectedGenres,
    selectedProviders,
    setSelectedProviders,
    handleFilterSubmit,
  } = useAppContext();

  return (
    <div className=" relative h-[100dvh]  text-white flex md:flex-row items-start  gap-4 justify-content-start flex-col lg:justify-center">
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
      <FiSearch
        size={20}
        className="text-slate-600 dark:text-slate-100 cursor-pointer"
        onClick={() => searchModalRef.current?.openModal()}
      />
      <SearchModal ref={searchModalRef} />
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
