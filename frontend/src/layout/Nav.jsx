
import { NavLink } from "react-router-dom";

function Nav(){
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cadastros" >Reserva</NavLink></li>
                <li><NavLink to="/pagina2">Hóspede</NavLink></li>
                <li><NavLink to="/pagina3">Quarto</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;