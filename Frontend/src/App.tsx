import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./components/Navbar/Navbar";
//import { ErrorModal } from "./components/ErrorModal/ErrorModal";

export const App = () => {
  return (
    <>
      <Navbar />
      {/* <ErrorModal /> */}

      <main className="app-main">
        <AppRouter />
      </main>
    </>
  );
};