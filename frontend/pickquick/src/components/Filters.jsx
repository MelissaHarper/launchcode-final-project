import { createContext, useContext, useRef, useState } from "react";
import { useClickOutside } from "./services/utils";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { tmdbImgBaseUrl } from "./services/call-headers";

const FilterContext = createContext();
const FilterDropdown = ({
  children,
  setMovieList,
  assignedList,
  setAssignedList,
  options,
  selectionIdentifier,
}) => {
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
        <FiChevronDown color="white" size={24} />
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
        className={`absolute bottom-full -translate-x-5 text-white rounded border border-[#828FA340] translate-y-full rounded bg-[#20212c] w-full list-none z-1`}
      >
        <FilterDropdown.Close />
        <div className="flex flex-col p-2 z-10">
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
      if (prevList.includes(option)) {
        const updatedList = prevList.filter((item) => item !== option);
        return updatedList;
      } else {
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

      {option.imgUrl && (
        <img
          className="w-6 h-6 "
          src={`${tmdbImgBaseUrl}${option.imgUrl}`}
          alt={`${option.name} image`}
        />
      )}
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
            {option.imgUrl && (
              <img
                className="w-6 h-6 "
                src={`${tmdbImgBaseUrl}${option.imgUrl}`}
                alt={`${option.name} image`}
              />
            )}

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
