import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1 className="header__title">Radial Bracket Maker</h1>
    <NavLink className="header__btn" to='/nba' >nba</NavLink>
    <NavLink className="header__btn" to='/nhl' >nhl</NavLink>
    <NavLink className="header__btn" to='/nhlAnalysis' >nhl info</NavLink>
    <NavLink className="header__btn" to='/nbaAnalysis' >nba info</NavLink>
  </header>
);

export default Header;