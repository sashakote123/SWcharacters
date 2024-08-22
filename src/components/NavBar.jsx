import { Outlet } from 'react-router';
import logo from './../images/Logo.svg'
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {

    const setActive = ({ isActive }) => isActive ? 'active-link' : '';

    return (
        <>
            <header className="navbar">
                <div className="container">
                    <div className="header">
                        <Link to='main' className="header__logo">
                            <img src={logo} alt="" />
                        </Link>
                        <ul className="header__nav">
                            <li className="nav__link">
                                <NavLink className={setActive} to='main'>Home</NavLink>
                            </li>
                            <li className="nav__link">
                                <NavLink className={setActive} to='characters'>Characters</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <Outlet />
        </>

    );
}

export default NavBar;