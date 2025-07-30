import { createContext, useContext, useRef, useState } from "react";
import { useClickOutside } from "./services/utils";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { tmdbImgBaseUrl } from "./services/call-headers";
// import { useNavigate } from "react-router-dom";
// import { getWithFilters } from "./services/call-functions.js";
// import genreData from "../assets/data/tmdbGenres.json";
// import providerData from "../assets/data/watchProvidersIDsNames.json";
// import { options } from "./services/call-headers.js";
const FilterContext = createContext();
const FilterDropdown = ({
  children,
  setMovieList,
  assignedList,
  setAssignedList,
  options,
  selectionIdentifier,
}) => {
  //   const [genres, setGenres] = useState([]);
  //   const [providers, setProviders] = useState([]);
  //   const [selectedGenres, setSelectedGenres] = useState();
  //   const [selectedProviders, setSelectedProviders] = useState();
  //   const navigate = useNavigate();
  const FilterDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useClickOutside(FilterDropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <FilterContext.Provider
      value={{
        setMovieList,
        assignedList,
        setAssignedList,
        options,
        selectionIdentifier,
        FilterDropdownRef,
        isDropdownOpen,
        setIsDropdownOpen,
      }}
    >
      <div ref={FilterDropdownRef}>{children}</div>
    </FilterContext.Provider>
  );
};

const Button = () => {
  const { setIsDropdownOpen } = useContext(FilterContext);
  return (
    <button
      className="  px-4 py-2 flex items-center justify-between w-full rounded border border-[#828FA340] hover:border-primary cursor-pointer relative text-[#605e80]"
      onClick={() => setIsDropdownOpen(true)}
    >
      <span className="block">
        <FiChevronDown color="#635FC7" size={24} />
      </span>

      <FilterDropdown.List />
    </button>
  );
};

const Header = () => {
  return <label className="mt-4 mb-2 text-sm"></label>;
};

const ListContainer = () => {
  const { options, isDropdownOpen } = useContext(FilterContext);

  return (
    isDropdownOpen && (
      <ul
        className={`absolute bottom-full translate-x-9 text-white  left-full translate-y-full rounded bg-[#20212c] w-max list-none `}
      >
        <FilterDropdown.Close />
        <div className="flex flex-col p-2">
          {options?.map((option, index) => (
            <FilterDropdown.Item key={index} option={option} />
          ))}
        </div>
      </ul>
    )
  );
};

const Item = ({ option }) => {
  const { assignedList, setAssignedList } = useContext(FilterContext);

  function handleAssign(option) {
    setAssignedList((prevList) => {
      // Check if the option already exists in the list
      if (prevList.includes(option)) {
        // If option exists, remove it from the list
        const updatedList = prevList.filter((item) => item !== option);
        return updatedList;
      } else {
        // If option doesn't exist, add it to the list
        return [...prevList, option];
      }
    });
  }

  return (
    <li
      key={option.id}
      className={`flex items-center gap-2 p-4 hover:bg-[#2b2c37] rounded transition-all duration-200 `}
      onClick={() => handleAssign(option)}
    >
      {assignedList.includes(option) && <FiCheck />}

      <img
        className="w-6 h-6 "
        src={`${tmdbImgBaseUrl}${option.imgUrl}`}
        alt={`${option.name} image`}
      />
      <span>{option.name}</span>
    </li>
  );
};

const AssignedList = () => {
  const { assignedList, setAssignedList, selectionIdentifier } =
    useContext(FilterContext);

  function handleRemove(id) {
    setAssignedList((assignedList) =>
      assignedList.filter((option) => option.id !== id)
    );
  }

  if (assignedList.length === 0)
    return (
      <p className="mt-4 p-2 shadow-sm bg-[#828fa318] rounded">
        No options selected.
      </p>
    );

  return (
    <div className="mt-4 p-2 shadow-sm bg-[#828fa318] rounded">
      <h2 className="px-2 my-3 font-bold">{`Selected ${selectionIdentifier}: `}</h2>
      <div className="flex flex-wrap gap-4 ">
        {assignedList?.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-1 w-[47.5%] p-2 hover:bg-[#20212c] rounded transition-all duration-200"
            onClick={() => handleRemove(option.id)}
          >
            <img
              className="w-6 h-6 "
              src={`${tmdbImgBaseUrl}${option.imgUrl}`}
              alt={`${option.name} image`}
            />

            <span>{option.name}</span>
            <span className="ml-auto cursor-pointer p-1 hover:bg-[#2b2c37] rounded-full">
              <FaXmark />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Close = () => {
  const { setIsDropdownOpen } = useContext(FilterContext);
  return (
    <div
      className="absolute top-0 right-0 flex items-center justify-center -translate-y-full gap-2 bg-[#C0392B] px-2 py-1 rounded-t"
      onClick={(e) => {
        e.stopPropagation();
        setIsDropdownOpen(false);
      }}
    >
      <span>Close</span>
      <span>
        <FaXmark size={20} />
      </span>
    </div>
  );
};

export default FilterDropdown;

FilterDropdown.List = ListContainer;
FilterDropdown.Item = Item;
FilterDropdown.Header = Header;
FilterDropdown.Button = Button;
FilterDropdown.AssignedList = AssignedList;
FilterDropdown.Close = Close;
// useEffect(() => {
//   setGenres(genreData);
//   setProviders(providerData);
// }, []);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const movies = await getWithFilters({
//     type: "movie",
//     genreId: selectedGenres,
//     providerId: selectedProviders,
//     payload: options,
//   });
//   setMovieList(movies);

//   navigate(`/recommendations`);
// };

// return (
//   <form
//     onSubmit={handleSubmit}
//     className="p-4 space-y-4 bg-zinc-800 text-white"
//   >
//     <div>
//       <label className="block mb-1">Genre</label>
//       <select
//         value={selectedGenres}
//         onChange={(e) => setSelectedGenres(...selectedGenres, e.target.value)}
//         className="w-full p-2 rounded bg-zinc-700"
//       >
//         <option value="">All Genres</option>
//         {genres.map((genre) => (
//           <option key={genre.id} value={genre.id}>
//             {genre.name}
//           </option>
//         ))}
//       </select>
//     </div>

//     <div>
//       <label className="block mb-1">Provider</label>
//       <select
//         value={selectedProviders}
//         onChange={(e) =>
//           setSelectedProviders(...selectedProviders, e.target.value)
//         }
//         className="w-full p-2 rounded bg-zinc-700"
//       >
//         <option value="">All Providers</option>
//         {providers.map((p) => (
//           <option key={p.provider_id} value={p.provider_id}>
//             {p.provider_name}
//           </option>
//         ))}
//       </select>
//     </div>

//     <button type="submit" className="bg-indigo-600 px-4 py-2 rounded">
//       Get Picks
//     </button>
//   </form>
// );
// }
