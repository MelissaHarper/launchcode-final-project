import axios from "axios";
import { api } from "./call-headers";
import { getRandomNumberBelow10 } from "./utils";

const BASE_URL = import.meta.env.VITE_BASE_TMDB_API_URL;

export async function getWithFilters(type, genreId, providerId, payload) {
  try {
    const page = getRandomNumberBelow10();
    const response = await api().get(
      `/discover/${type}`,
      {
        params: {
          include_adult: false,
          sort_by: "popularity.desc",
          page: page,
          watch_region: "US",
          with_genres: genreId.join(","),
          with_watch_providers: providerId.join(","),
          with_watch_monetization_types: "flatrate,free,ads,rent,buy",
        },
      },
      { payload }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function getGenres(payload) {
  const url = `${BASE_URL}/genre/movie/list`;
  const { data } = await api().get(url, { payload });
  return data.genres;
}

export async function getProviders(payload) {
  const url = `${BASE_URL}/watch/providers/movie`;
  const { data } = await axios.get(url, { payload });
  return data.results;
}

export const getTrending = async (type, payload) => {
  const response = await api().get(`/trending/all/${type}`, {
    payload,
  });
  return response;
};

export const getNewRelease = async (type, payload) => {
  const response = await api().get(`/${type}/latest`, { payload });
  return response;
};

export const getPopular = async (type, payload) => {
  const response = await api().get(`/${type}/popular`, { payload });
  return response;
};

export const getTopRated = async (type, payload) => {
  const response = await api().get(`/${type}/top_rated`, { payload });
  return response;
};

export const getNowPlaying = async (payload) => {
  const response = await api().get("/movie/now_playing", { payload });
  return response;
};

export const getUpcoming = async (payload) => {
  const response = await api().get("/movie/upcoming", { payload });
  return response;
};

export const getAiringToday = async (payload) => {
  const response = await api().get("/tv/airing_today", { payload });
  return response;
};

export const getOnTheAir = async (payload) => {
  const response = await api().get("/tv/on_the_air", { payload });
  return response;
};

export const getDetail = async (type, id, payload) => {
  const response = await api()
    .get(`/${type}/${id}`, { payload })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return response;
};

export const getCredits = async (type, id, payload) => {
  const response = await api().get(`/${type}/${id}/credits`, {
    payload,
  });
  return response;
};

export const getTrailers = async (type, id, payload) => {
  const response = await api().get(`/${type}/${id}/videos`, {
    payload,
  });
  return response;
};

export const getReviews = async (type, id, payload) => {
  const response = await api().get(`/${type}/${id}/reviews`, {
    payload,
  });
  return response;
};

export const getRecommendation = async (type, id, payload) => {
  const response = await api().get(`/${type}/${id}/recommendations`, {
    payload,
  });
  return response;
};

export const searchFilm = async (payload) => {
  const response = await api().get(`search/movie`, { payload });
  return response;
};

export const searchTv = async (payload) => {
  const response = await api().get(`search/tv`, { payload });
  return response;
};
