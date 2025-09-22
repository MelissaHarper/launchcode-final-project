import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { searchKeyword } from "../services/call-functions.js";
import { options } from "../services/call-headers.js";
import FilterDropdown from "./FilterModal.jsx";

const KeywordSearch = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleSearch = async (value) => {
    setValueSearch(value);
    const results = [];
    const params = {
      query: value,
      page: 1,
      language: "en-US",
    };

    const resKeyword = await searchKeyword(params, options);

    if (resKeyword.data.results.length > 0)
      results.push(...resKeyword.data.results.splice(0, 4));
    results.sort((a, b) => (a.title || a.name > b.title || b.name ? 1 : -1));
    setSearchList(results);
  };

  return (
    <>
      <div className="relative w-full">
        <FilterDropdown.Close />
        <FiSearch />
        <label>
          <input
            name="keyword-search"
            type="text"
            placeholder="Search for keywords"
            className="w-full p-2 pl-10 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-600 placeholder:dark:text-slate-400 border border-gray-400/60 dark:border-slate-700 focus:!border-blue-500 outline-none rounded-md transition-all duration-300"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="max-h-[40vh] mt-4 space-y-4 overflow-y-auto scroll-thin">
        {/* Search List */}
        {valueSearch &&
          searchList.length > 0 &&
          searchList.map((list) => {
            return <FilterDropdown.Item key={list.id} option={list} />;
          })}

        {/* No result search */}
        {valueSearch && searchList.length === 0 && (
          <div className="h-20 flex justify-center items-center text-slate-600 dark:text-slate-400">
            No results found
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordSearch;
