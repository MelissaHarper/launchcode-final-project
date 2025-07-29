import Select from "react-select";
import makeAnimated from "react-select/animated";
import { genreOptions } from "./services/utils";

const Filter = ({ selectedGenre, setSelectedGenre }) => {
  const animatedComponents = makeAnimated();
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#212529",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div>
      {selectedGenre !== undefined ? (
        <Select
          defaultValue={selectedGenre}
          onChange={setSelectedGenre}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          name="genres"
          options={genreOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          styles={customStyles}
        />
      ) : (
        <p> {`The child did not receive ${selectedGenre}`} </p>
      )}
    </div>
  );
};

export default Filter;
