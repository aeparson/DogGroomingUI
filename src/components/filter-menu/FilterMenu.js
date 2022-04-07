import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Button } from '@material-ui/core';
import { IconContext } from 'react-icons';
import demographicFilters from './FilterMenuData';
import './FilterMenu.css';

function FilterMenu() {
  const [sidebar, setSidebar] = useState(false);

  // const [checked, setChecked] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const handleChange = () => setChecked(!checked);

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className="closed-menu">
          <Button className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Button className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Button>
            </li>
            {demographicFilters.map((item) => (
              <li key={item} className={item.cName}>
                <span>
                  <input type="checkbox" />
                </span>
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default FilterMenu;
