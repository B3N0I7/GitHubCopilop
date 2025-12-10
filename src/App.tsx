import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ModePage from "./pages/ModePage";
import InstructionPage from "./pages/InstructionPage";
import CustomAgentsPage from "./pages/CustomAgentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Modes routes */}
          <Route path="modes">
            <Route index element={<Navigate to="/modes/ask-mode" replace />} />
            <Route path=":modeId" element={<ModePage />} />
          </Route>

          {/* Instructions routes */}
          <Route path="instructions">
            <Route
              index
              element={
                <Navigate to="/instructions/prompt-engineering" replace />
              }
            />
            <Route path=":instructionId" element={<InstructionPage />} />
          </Route>

          {/* Custom Agents route */}
          <Route path="custom-agents" element={<CustomAgentsPage />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
