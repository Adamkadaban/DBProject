import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { GeospatialAnalysis } from "./pages/GeospatialAnalysis";
import { FlightOptimization } from "./pages/FlightOptimization";
import { TimeSeriesAnalysis } from "./pages/TimeSeriesAnalysis";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GeospatialAnalysis" element={<GeospatialAnalysis />} />
        <Route path="/FlightOptimization" element={<FlightOptimization />} />
        <Route path="/TimeSeriesAnalysis" element={<TimeSeriesAnalysis />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
