import { useEffect, useState, useCallback, createContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

export const BackendContext = createContext();

export const BackendContextProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [toWatchList, setToWatchList] = useState([]);
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const UserSyncHandler = () => {
    useEffect(() => {
      const saveUser = async () => {
        if (!isLoaded || !isSignedIn || synced) {
          return;
        }
        try {
          const token = await getToken({ template: "pickQuick" });
          const userData = {
            id: user.id,
            email: user.primaryEmailAddress.emailAddress,
            username: user.username,
            photoUrl: user.imageUrl,
            createdAt: user.createdAt,
          };

          await axios.post(`${backendBaseUrl}/users/add`, userData, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setSynced(true);
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      };
      saveUser(), setUserLoading(false);
    }, []);
    return null;
  };

  const populateToWatchList = (list) => {
    setToWatchList(list);
  };

  const fetchWatchListFromBackend = useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }
    try {
      const token = await getToken({ template: "pickQuick" });
      const userData = {
        id: user.id,
        email: user.primaryEmailAddress.emailAddress,
        username: user.username,
        photoUrl: user.imageUrl,
        createdAt: user.createdAt,
      };
      const res = await axios.get(`${backendBaseUrl}/towatch/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatMovies = res.data.movies.map(
        ({ posterPath: poster_path, ...rest }) => ({ poster_path, ...rest })
      );
      populateToWatchList(formatMovies);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }, [isLoaded, isSignedIn, user, getToken, backendBaseUrl]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchWatchListFromBackend();
    }
  }, [isLoaded, isSignedIn, user, fetchWatchListFromBackend]);

  const addMovieToWatchList = async (movie) => {
    try {
      const token = await getToken({ template: "pickQuick" });
      const movieData = {
        id: movie.id,
        originalTitle: movie.original_title,
        posterPath: movie.poster_path,
        title: movie.title,
        originalName: movie.original_name,
      };

      await axios.put(`${backendBaseUrl}/towatch/${user.id}/add`, movieData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      });
      await fetchWatchListFromBackend();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const removeMovieFromWatchList = async (movie) => {
    try {
      const token = await getToken({ template: "pickQuick" });
      await axios.delete(
        `${backendBaseUrl}/towatch/${user.id}/remove/${movie.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      await fetchWatchListFromBackend();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const checkToWatchList = (movie) => {
    if (!movie || !movie.id) return false;
    return toWatchList.some((m) => m && m.id === movie.id);
  };

  const handleToWatchClick = (movie) => {
    console.log(`WatchList length on click: ${toWatchList.length}`);
    if (checkToWatchList(movie)) {
      removeMovieFromWatchList(movie);
      console.log(`WatchList length after remove: ${toWatchList.length}`);
    } else {
      addMovieToWatchList(movie);
      console.log(`WatchList length after add: ${toWatchList.length}`);
    }
  };

  return (
    <BackendContext.Provider
      value={{
        toWatchList,
        UserSyncHandler,
        populateToWatchList,
        fetchWatchListFromBackend,
        addMovieToWatchList,
        removeMovieFromWatchList,
        checkToWatchList,
        handleToWatchClick,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
export default BackendContextProvider;
