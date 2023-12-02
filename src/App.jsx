import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectiveRoute from "./components/ProtectiveRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectiveRoute>
              <Dashboard />
            </ProtectiveRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
