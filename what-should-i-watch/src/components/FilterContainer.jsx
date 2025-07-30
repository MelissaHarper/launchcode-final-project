// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Filter from "./FilterByGenre.jsx";
// import Modal from "@mui/material/Modal";
// import { filterByGenre } from "./services/utils.js";
// import "../styles/filterContainer.css";
import { createContext, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWithFilters } from "./services/call-functions.js";
import genreData from "../assets/data/tmdbGenres.json";
import providerData from "../assets/data/watchProvidersIDsNames.json";
import { options } from "./services/call-headers.js";
import FilterDropdown from "./Filters.jsx";
import { sortByRank } from "./services/utils.js";

function FilterContainer({ setMovieList }) {
  const genres = genreData;
  const providers = sortByRank(providerData);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="bg-[#2b2c37] h-[100dvh] text-white flex  p-20 gap-4 items-center flex-col">
      <div className=" w-[400px] ">
        <p className="text-2xl ">Genres</p>
        <FilterDropdown
          setMovieList={setMovieList}
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
          setMovieList={setMovieList}
          assignedList={selectedProviders}
          setAssignedList={setSelectedProviders}
          options={providers}
          selectionIdentifier={"Streaming Providers"}
        >
          <FilterDropdown.Header />
          <FilterDropdown.Button
          // listStyles={
          //   "!-left-5 !-translate-x-full bg-[#605e80]  border text-white"
          // }
          />
          <FilterDropdown.AssignedList />
        </FilterDropdown>
      </div>
    </div>
  );
  // const [selectedGenre, setSelectedGenre] = useState(null);
  // const [open, setOpen] = useState(false);
  // const navigate = useNavigate();

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleFilters = () => {
  //   setMovieList(filterByGenre(selectedGenre.label, movieList));
  //   navigate(`/recommendations`);
  // };

  // return (
  //   <div className="filter-container">
  //     <p className="filter-directions">
  //       {" "}
  //       Click the button for the type of filter you would like to apply
  //     </p>

  //     <div>
  //       <button className="reusable-button" onClick={handleOpen}>
  //         Genre
  //       </button>
  //       <Modal open={open} onClose={handleClose}>
  //         <div className="filter-popup">
  //           <Filter
  //             selectedGenre={selectedGenre}
  //             setSelectedGenre={setSelectedGenre}
  //           />
  //         </div>
  //       </Modal>
  //     </div>

  //     {selectedGenre && (
  //       <div className="confirm-input">
  //         <h2>Search Parameters:</h2>
  //         <p>
  //           {`Genres:
  //           ${selectedGenre.map((obj) => {
  //             return `${obj.label} `;
  //           })}`}
  //         </p>
  //       </div>
  //     )}
  //     <button className="reusable-button" onClick={handleFilters}>
  //       Get me my movies!
  //     </button>
  //   </div>
  // );
}

export default FilterContainer;
