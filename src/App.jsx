import { Route, Routes } from "react-router";
import CardsPage from "./components/CardsPage";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFounfPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="main" element={<MainPage />} />
          <Route path="characters" element={<CardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
