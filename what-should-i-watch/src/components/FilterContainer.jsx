import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "./FilterByGenre.jsx";
import Modal from "@mui/material/Modal";
import { filterByGenre } from "./services/utils.js";
import "../styles/filterContainer.css";

function FilterContainer({ movieList, setMovieList }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFilters = () => {
    setMovieList(filterByGenre(selectedGenre.label, movieList));
    navigate(`/recommendations`);
  };

  return (
    <div className="filter-container">
      <p className="filter-directions">
        {" "}
        Click the button for the type of filter you would like to apply
      </p>

      <div>
        <button className="reusable-button" onClick={handleOpen}>
          Genre
        </button>
        <Modal open={open} onClose={handleClose}>
          <div className="filter-popup">
            <Filter
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
          </div>
        </Modal>
      </div>

      {selectedGenre && (
        <div className="confirm-input">
          <h2>Search Parameters:</h2>
          <p>
            {`Genres:
            ${selectedGenre.map((obj) => {
              return `${obj.label} `;
            })}`}
          </p>
        </div>
      )}
      <button className="reusable-button" onClick={handleFilters}>
        Get me my movies!
      </button>
    </div>
  );
}

export default FilterContainer;
