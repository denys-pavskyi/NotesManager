import { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./components/navbar/Navbar";
import { ErrorModal } from "./components/error-modal/ErrorModal";
import { useError } from "./contexts/ErrorContext";
import { setErrorCallback } from "./services/apiClient";

export const App = () => {
  const { showError } = useError();

  useEffect(() => {
    // Set up the error callback from apiClient
    setErrorCallback(showError);
  }, [showError]);

  return (
    <>
      <Navbar />
      <ErrorModal />

      <main className="app-main">
        <AppRouter />
      </main>
    </>
  );
};