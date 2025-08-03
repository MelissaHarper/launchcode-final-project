import { useEffect, useState, useCallback, createContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext.jsx";
import axios from "axios";

export const BackendContext = createContext();

export const BackendContextProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { populateToWatchList } = useAppContext();
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
    }, [isLoaded, isSignedIn, getToken, user, synced, backendBaseUrl]);
    return null;
  };

  const fetchWatchListFromBackend = useCallback(async () => {
    // useCallback to avoid infinite rerendering
    if (!isLoaded || !isSignedIn) {
      return console.error("User not signed in");
    }
    try {
      const token = await getToken({ template: "pickQuick" });
      const res = await axios.get(`${backendBaseUrl}/towatch/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    const token = await getToken({ template: "pickQuick" });
    const userData = {
      id: user.id,
    };

    await fetch(`${backendBaseUrl}/towatch/${userData.id}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    await fetchWatchListFromBackend();
  };

  const removeMovieFromWatchList = async (movie) => {
    const token = await getToken({ template: "pickQuick" });
    const userData = {
      id: user.id,
    };
    await fetch(`${backendBaseUrl}/towatch/${userData.id}/remove/${movie.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    await fetchWatchListFromBackend();
  };

  return (
    <BackendContext.Provider
      value={{
        UserSyncHandler,
        fetchWatchListFromBackend,
        addMovieToWatchList,
        removeMovieFromWatchList,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
export default BackendContextProvider;
