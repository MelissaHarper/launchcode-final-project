import { useEffect, useState, useCallback, createContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

export const BackendContext = createContext();

export const BackendContextProvider = ({ children }) => {
  const [toWatchList, setToWatchList] = useState([]);

  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const UserSyncHandler = () => {
    const [synced, setSynced] = useState(false);

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
          console.log("✅ User synced to backend");
          setSynced(true);
        } catch (error) {
          console.error(
            "❌ Error saving user:",
            error.response?.data || error.message
          );
        }
      };
      saveUser();
    }, [synced]);
    return null;
  };

  const populateToWatchList = (list) => {
    setToWatchList(list);
  };

  const fetchWatchListFromBackend = useCallback(async () => {
    // useCallback to avoid infinite rerendering

    if (!isLoaded || !isSignedIn) {
      return console.error("User not signed in");
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
      const res = await axios.get(
        `${backendBaseUrl}/towatch/${user.id}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      populateToWatchList(res.data.movies);
      console.log("Watchlist fetched from backend:", res.data);
    } catch (error) {
      console.error(
        "Error fetching watchlist:",
        error.response?.data || error.message
      );
    }
  }, [isLoaded, isSignedIn, getToken, user, backendBaseUrl]);

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
      console.log("✅ Movie synced to backend");
    } catch (error) {
      console.error(
        "❌ Error saving Movie:",
        error.response?.data || error.message
      );
    }
  };

  const removeMovieFromWatchList = async (movie) => {
    try {
      const token = await getToken({ template: "pickQuick" });

      const movieData = {
        id: movie.id ? movie.id : null,
        originalTitle: movie.original_title ? movie.original_title : null,
        posterPath: movie.poster_path ? movie.poster_path : null,
        title: movie.title ? movie.title : null,
        originalName: movie.original_name ? movie.original_name : null,
      };

      await axios.delete(
        `${backendBaseUrl}/towatch/${user.id}/remove/${movie.id}`,
        movieData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchWatchListFromBackend();
      console.log("✅ Movie synced to backend");
    } catch (error) {
      console.error(
        "❌ Error saving Movie:",
        error.response?.data || error.message
      );
    }
  };

  const checkToWatchList = (movie) => {
    if (!movie || !movie.id) return false; // Prevent null/undefined errors
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
