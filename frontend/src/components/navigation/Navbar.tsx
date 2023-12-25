import { NavLink } from "react-router-dom";
import './Navbar.css';
import React, {useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import {ROLES} from "../../Roles";

export const Navbar: React.FC = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = user?.roles.map(role => role.authority).includes(ROLES.ADMIN);

    const userLinks = [
      ['/home', 'Home'],
      ['/reservations', 'Reservations']
    ];

    const adminLinks = [
        ['/dupa', 'Dupa'],
        ['/reservations', 'Reservations']
    ];

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
                    {createNavLink('/logout', 'Log out', 'NavBtnLink')}
                </div>
            </nav>
        </>
    );
};
