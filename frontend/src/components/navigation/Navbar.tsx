import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import React, {useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import { ROLES } from "../../Roles";

export const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    }

    const userLinks = [
      ['/', 'Home'],
      ['/reservations', 'Reservations']
    ];
    const adminLinks = [
        ['/dupa', 'Dupa'],
        ['/reservations', 'My Reservations']
    ];
    const isAdmin = user?.roles.map(role => role.authority).includes(ROLES.ADMIN);
    const links = isAdmin ? adminLinks : userLinks;

    const createNavLink = (link: string, linkText: string, className: string = 'NavLink') => {
        return (
            <NavLink to={link} className={className}>
                { linkText }
            </NavLink>
        );
    };

    return (
        <>
            <nav className="Nav">
                <div className="NavMenu">
                    {links.map(([link, linkText]) => createNavLink(link, linkText))}
                </div>
                <div className="NavBtn">
                    <button className='NavBtnLink' onClick={handleLogoutClick}> Log out</button>
                </div>
            </nav>
        </>
    );
};
