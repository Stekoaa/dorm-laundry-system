import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MenuItemProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    text: string;
}

interface ButtonWithMenuProps {
    menuItemsProps: MenuItemProps[];
    disabled: boolean;
}

export const ButtonWithMenu: React.FC<ButtonWithMenuProps> = ({ menuItemsProps, disabled }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const createMenuItem = (menuItem: MenuItemProps) => {
        return (
            <MenuItem onClick={menuItem.onClick} style={{fontSize: '10px'}}>
                {menuItem.text}
            </MenuItem>
        );
    };

    return (
        <div>
            <IconButton
                id='demo-positioned-button'
                aria-controls={anchorEl ? 'demo-positioned-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={anchorEl ? 'true' : undefined}
                onClick={handleClick}
                disabled={disabled}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id='demo-positioned-menu'
                aria-labelledby='demo-positioned-button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                disableScrollLock={true}
                slotProps={{
                    paper: {
                        style: {
                            // Override padding when the menu is open
                            paddingRight: open ? 0 : undefined,
                        },
                    },
                }}
            >
                {menuItemsProps.map(createMenuItem)}
            </Menu>
        </div>
    );
};
