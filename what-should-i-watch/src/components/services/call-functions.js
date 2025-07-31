import { api } from "./call-headers";
import axios from "axios";
import { getRandomNumberBelow10 } from "./utils";

const BASE_URL = "https://api.themoviedb.org/3";

// export const getWithFilters = async (searchTerms, payload) => {
//   const response = await api().get(
//     `/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${searchTerms}`,
//     {
//       payload,
//     }
//   );
//   return response;
// };
export const clerkMiddleware = (options) => {
  return async (context, next) => {
    const clerkClient = options.clerkClient || defaultClerkClient;

    const requestState = await clerkClient.authenticateRequest(context.req, {
      authorizedParties: ["https://example.com"],
    });

    if (requestState.headers) {
      // This adds observability headers to the res
      requestState.headers.forEach((value, key) =>
        context.res.headers.append(key, value)
      );

      const locationHeader = requestState.headers.get("location");

      if (locationHeader) {
        return context.redirect(locationHeader, 307);
      } else if (requestState.status === "handshake") {
        throw new Error("Clerk: unexpected handshake without redirect");
      }
    }

    context.set("clerkAuth", requestState.toAuth());
    context.set("clerk", clerkClient);

    await next();
  };
};

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
        },
      },
      { payload }
    );

    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function getGenres(payload) {
  const url = `${BASE_URL}/genre/movie/list`;
  const { data } = await api().get(url, { payload });
  return data.genres; // Array of { id, name }
}

export async function getProviders(payload) {
  const url = `${BASE_URL}/watch/providers/movie`;
  const { data } = await axios.get(url, { payload });
  return data.results; // Array of { provider_id, provider_name, logo_path }
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
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
