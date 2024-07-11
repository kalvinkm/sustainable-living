import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { CollectionPoints } from "./components/CollectionPoints";
import { SearchResults } from "./components/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection-points" element={<CollectionPoints />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
