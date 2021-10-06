import React from 'react'

import Avatar from '@mui/material/Avatar';

const Header = () => {

    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand">Baby ServiceNow!</a>
            <Avatar alt="Remy Sharp" src="/golang.png" />
        </nav>
    )
}

export default Header