import React from "react";
import './Navbar.css';

interface LinkButtonProps {
    onClick: () => void;
    text: string;
    className: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ onClick, text, className }) => {
    return (
        <div className={className}>
            <button className='NavBtnLink' onClick={onClick}>{text}</button>
        </div>
    );
};
