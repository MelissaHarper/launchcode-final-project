import { useEffect, useState, useCallback, useRef, createContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import ErrorModal from "../components/services/ErrorModal";

export const BackendContext = createContext();

export const BackendContextProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [toWatchList, setToWatchList] = useState([]);
  const [synced, setSynced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const errorModalRef = useRef(null);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const openErrorModal = (err) => {
    setError(err);
    errorModalRef.current?.openModal();
  };

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
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "1",
            },
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

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.message.length === 0
    )
      return alert("Please complete all fields");
    try {
      const token = await getToken({ template: "pickQuick" });
      let feedbackData;

      feedbackData = {
        userId: user.id,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
      await axios.post(`${backendBaseUrl}/feedback/submit`, feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });
      formData.name = "";
      formData.email = "";
      formData.message = "";
      return alert("Thank you for your feedback.");
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
    }
  };

  const populateToWatchList = (list) => {
    try {
      setToWatchList(list);
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
    }
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
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });

      const formatMovies = res.data.movies.map(
        ({ posterPath: poster_path, ...rest }) => ({ poster_path, ...rest })
      );
      populateToWatchList(formatMovies);
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
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
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });
      await fetchWatchListFromBackend();
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
    }
  };

  const removeMovieFromWatchList = async (movie) => {
    try {
      const token = await getToken({ template: "pickQuick" });
      await axios.delete(
        `${backendBaseUrl}/towatch/${user.id}/remove/${movie.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );
      await fetchWatchListFromBackend();
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
    }
  };

  const checkToWatchList = (movie) => {
    if (!movie || !movie.id) return false;
    return toWatchList.some((m) => m && m.id === movie.id);
  };

  const handleToWatchClick = (movie) => {
    try {
      if (checkToWatchList(movie)) {
        removeMovieFromWatchList(movie);
      } else {
        addMovieToWatchList(movie);
      }
    } catch (err) {
      openErrorModal(
        err.response?.data ||
          (err.message &&
            " You are currently using a development version of this site. Some features may not be available at this time.")
      );
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
        handleFeedbackSubmit,
        formData,
        setFormData,
        userLoading,
        error,
        errorModalRef,
        openErrorModal,
      }}
    >
      {children}
      <ErrorModal ref={errorModalRef}>{error}</ErrorModal>
    </BackendContext.Provider>
  );
};
export default BackendContextProvider;
