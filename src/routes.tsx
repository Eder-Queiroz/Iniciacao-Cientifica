import {BrowserRouter,Routes,Route  } from "react-router-dom";

import Home from "./pages/Home";
import Grade from "./pages/Grade";
import Disciplinas from "./pages/Disciplinas";
import Professores from "./pages/Professores";
import Restrições from "./pages/Restrições";
import Turmas from "./pages/Turmas";

function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home/>} />
                <Route path="Grade" element = {<Grade/>} />
                <Route path="Disciplinas" element = {<Disciplinas/>} />
                <Route path="Professores" element = {<Professores/>} />
                <Route path="Restrições" element = {<Restrições/>} />
                <Route path="Turmas" element = {<Turmas/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;