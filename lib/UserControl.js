import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'



export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className="logged-user">
            <Image width={37} height={37} src="/logo.png" alt="Profile Picture" className="logged-user__img" />
            <span className="logged-user__name">Ariana</span>
            <FontAwesomeIcon icon={faAngleDown} size="sm" className="logged-user__options"/>
        </span>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div 
            className="logged-user__dropdown"

        >
            <MenuItem className="logged-user__dropdown" onClick={handleClose}>Profile</MenuItem>
            <MenuItem className="logged-user__dropdown" onClick={handleClose}>My account</MenuItem>
            <MenuItem className="logged-user__dropdown" onClick={handleClose}>Logout</MenuItem>
        </div>
        
      </Menu>
    </div>
  );
}