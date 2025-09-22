import {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from "react";
// import { useNavigate } from "react-router-dom";

import { options, tmdbApiKey } from "./call-headers.js";
import { searchKeyword } from "./call-functions";
/* For future development
import { searchFilm, searchTv, searchKeyword } from "./call-functions"
*/

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
// import MovieListSearch from "components/MovieListSearch"

import { FiSearch } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";

const ModalSearch = forwardRef((props, ref) => {
  // Variables
  //   const navigate = useNavigate();
  const { setSelectedKeywords } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSearchList([]);
    setValueSearch("");
  };

  // Handle search function
  const handleSearch = async (value) => {
    setValueSearch(value);
    const results = [];
    const params = {
      query: value,
      page: 1,
      language: "en-US",
      api_key: tmdbApiKey,
    };

    /* For future development

      // const resMovie = await searchFilm(params)
      // const resTv = await searchTv(params)

      */

    const resKeyword = await searchKeyword(params, options);

    /* For future development

      // if (resMovie.data.results.length > 0) results.push(...resMovie.data.results.splice(0, 4))
      // if (resTv.data.results.length > 0) results.push(...resTv.data.results.splice(0, 4))

      */

    if (resKeyword.data.results.length > 0)
      results.push(...resKeyword.data.results.splice(0, 4));
    results.sort((a, b) => (a.title || a.name > b.title || b.name ? 1 : -1));
    setSearchList(results);
  };

  // Handle click result search
  const handleSearchClick = (item, isRecent) => {
    if (!isRecent) {
      // Set to local storage
      const recents = [...recentSearch, item];
      localStorage.setItem("recent-search", JSON.stringify(recents));
    }
    setSelectedKeywords(item);

    // navigate(`/${item.first_air_date ? "tv" : "movie"}/detail/${item.id}`);
    closeModal();
  };

  // Handle clear recent
  const handleClearRecent = () => {
    setRecentSearch([]);
    localStorage.removeItem("recent-search");
  };

  useEffect(() => {
    if (isOpen) {
      const recents = localStorage.getItem("recent-search");
      if (recents) setRecentSearch(JSON.parse(recents));
    }
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999999]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-4 text-left align-middle rounded-xl bg-background-light dark:bg-slate-900 shadow-xl transform overflow-hidden transition-all">
                <div className="relative w-full">
                  <FiSearch />
                  <label>
                    <input
                      name="tmdb-search"
                      type="text"
                      placeholder="Search for keywords"
                      className="w-full p-2 pl-10 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-600 placeholder:dark:text-slate-400 border border-gray-400/60 dark:border-slate-700 focus:!border-blue-500 outline-none rounded-md transition-all duration-300"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </label>
                </div>

                <div className="max-h-[40vh] mt-4 space-y-4 overflow-y-auto scroll-thin">
                  {/* Recent Search */}
                  {recentSearch.length > 0 && !valueSearch && (
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Recent
                        </p>
                        <button
                          className="font-semibold text-sm text-red-600 dark:text-red-500 cursor-pointer"
                          onClick={handleClearRecent}
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearch.map((list) => (
                        <li
                          key={list.id}
                          onClick={() => {
                            handleSearchClick(list, true);
                          }}
                        >
                          {list.name}
                          {/* <MovieListSearch
                            movie={list}
                            isRecent={true}
                            handleSearchClick={handleSearchClick}
                          /> */}
                        </li>
                      ))}
                    </div>
                  )}

                  {/* If Recent Search Is Null */}
                  {recentSearch.length === 0 && !valueSearch && (
                    <div className="h-20 flex justify-center items-center text-slate-600 dark:text-slate-400">
                      No recent searches
                    </div>
                  )}

                  {/* Search List */}
                  {valueSearch &&
                    searchList.length > 0 &&
                    searchList.map((list) => {
                      return (
                        <div
                          key={list.id}
                          onClick={() => {
                            handleSearchClick(list);
                          }}
                        >
                          {list.name}
                          {/* <MovieListSearch
                            movie={list}
                            handleSearchClick={handleSearchClick}
                          /> */}
                        </div>
                      );
                    })}

                  {/* No result search */}
                  {valueSearch && searchList.length === 0 && (
                    <div className="h-20 flex justify-center items-center text-slate-600 dark:text-slate-400">
                      No results found
                    </div>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

ModalSearch.displayName = "ModalSearch";
export default ModalSearch;
