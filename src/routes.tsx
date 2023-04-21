import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Grade from "./pages/Grade";
import Cursos from "./pages/Cursos";
import Disciplinas from "./pages/Disciplinas";
import Professores from "./pages/Professores";
import Restrições from "./pages/Restrições";
import Turmas from "./pages/Turmas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/grade",
        element: <Grade />,
      },
      {
        path: "/cursos",
        element: <Cursos />,
      },
      {
        path: "/disciplinas",
        element: <Disciplinas />,
      },
      {
        path: "/professores",
        element: <Professores />,
      },
      {
        path: "/restricoes",
        element: <Restrições />,
      },
      {
        path: "/turmas",
        element: <Turmas />,
      },
    ],
  },
]);

export default router;
