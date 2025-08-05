import { options } from "./call-headers.js";

import { useEffect } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export function getRandomMovies(list, count) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function sortByRank(listOfObjects) {
  const sorted = [...listOfObjects].sort((a, b) => a.rank - b.rank);
  return sorted;
}

export function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 80000);
  return randomNumber;
}

export function getRandomNumberBelow10() {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
}

export function getRandomElement(arr) {
  let randomIndex = Math.floor(Math.random() * 20) + 1;
  console.log(`Movie from utils: ${arr[randomIndex]}`);
  return arr[randomIndex];
}

export const filterByDate = (arr, dateRange) => {
  let startDate = dateRange[0];
  let endDate = dateRange[1];
  let moviesByDate = arr.filter(
    (movie) =>
      movie.release_date.slice(0, 3) >= startDate &&
      movie.release_date.slice(0, 3) <= endDate + 9
  );
  return moviesByDate;
};

export function filterByGenre(genreArr, list) {
  let filteredMovieList = list;
  if (genreArr) {
    let genreFilter = 0;
    while (genreFilter < genreArr.length - 1) {
      filteredMovieList = filteredMovieList.filter((movie) => {
        if (Object.values(movie.genres).includes()) {
          return { ...movie };
        }
      });
      genreFilter++;
    }
  }
  return filteredMovieList;
}

export const genreOptions = [
  {
    value: 28,
    label: "Action",
  },
  {
    value: 12,
    label: "Adventure",
  },
  {
    value: 16,
    label: "Animation",
  },
  {
    value: 35,
    label: "Comedy",
  },
  {
    value: 80,
    label: "Crime",
  },
  {
    value: 99,
    label: "Documentary",
  },
  {
    value: 18,
    label: "Drama",
  },
  {
    value: 10751,
    label: "Family",
  },
  {
    value: 14,
    label: "Fantasy",
  },
  {
    value: 36,
    label: "History",
  },
  {
    value: 27,
    label: "Horror",
  },
  {
    value: 0,
    label: "LGBTQ",
  },
  {
    value: 10402,
    label: "Music",
  },
  {
    value: 9648,
    label: "Mystery",
  },
  {
    value: 10749,
    label: "Romance",
  },
  {
    value: 878,
    label: "Science Fiction",
  },
  {
    value: 10770,
    label: "TV Movie",
  },
  {
    value: 53,
    label: "Thriller",
  },
  {
    value: 10752,
    label: "War",
  },
  {
    value: 37,
    label: "Western",
  },
];
// symbols in url that separate options within the same category (replaces a comma between ex: genres): %2C%20
// but I just found something that showed you could leave the comma there, but no spaces between. , is and | is or
// place an "&" before any filter category at the end of the URL

export const apiQueryOptions = [
  "with_watch_providers",
  "with_original_language",
  "with_origin_country",
  "with_keywords",
  "with_genres",
  "with_cast",
  "sort_by=popularity.desc",
];
// ("https://api.themoviedb.org/3/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=undefined");
// ("/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=2");

/*** Call Functions ***/
export async function searchByGenre(arr) {
  let movieList = [];
  for (let i = 0; i < arr.length; i++) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${arr[i]}`,
      options
    );
    const data = await res.json();

    movieList.push(Object.values(data["results"]));
  }
  return movieList;
}

export const formatGenreFilters = (arr) => {
  let i = 1;
  let genres = [];
  while (i < arr.length - 1) {
    i++;
    // console.log(arr[i]);
    return genres.push(`${arr[i]}%2C%20`);
  }
  return genres.push(arr[0]);
};
