import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react-router";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router";

// Import clerk Publishable Key
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Throw error if key not imported
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  // For future Clerk Authorization
  <AppContextProvider>
    <BrowserRouter>
      {/* // For future Clerk Authorization */}
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <StrictMode>
          <App />
        </StrictMode>
        {/* // For future Clerk Authorization */}
      </ClerkProvider>
    </BrowserRouter>
  </AppContextProvider>
);
