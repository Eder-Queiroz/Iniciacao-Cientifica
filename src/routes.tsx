import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Grade from "./pages/Grade";
import Cursos from "./pages/Cursos";
import Disciplinas from "./pages/Disciplinas";
import Professores from "./pages/Professores";
import Restrições from "./pages/Restrições";
import Turmas from "./pages/Turmas";

function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/restricoes" element={<Restrições />} />
        <Route path="/turmas" element={<Turmas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
