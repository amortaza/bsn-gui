/* eslint-disable */
import React from 'react'

import Avatar from '@mui/material/Avatar';

const Header = () => {

    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" style={{marginLeft:"1em"}} href="/">Baby ServiceNow!</a>
            <Avatar alt="Remy Sharp" src="/golang.png" style={{marginRight:"1em"}}/>
        </nav>
    )
}

export default Header