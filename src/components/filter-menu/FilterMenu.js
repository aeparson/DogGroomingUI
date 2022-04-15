import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import demographicFilters from './FilterMenuData';
import './FilterMenu.css';

function FilterMenu({
  onFilter, setWebRoute, pushover
}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [checked, setChecked] = useState(new Array(demographicFilters.length).fill(false));

  const handleChange = (position) => {
    const updatedCheckedState = checked.map((item, index) => (index === position ? !item : item));
    setChecked(updatedCheckedState);
    setWebRoute(updatedCheckedState.reduce(
      (fullFilterAddy, currentState, index) => {
        if (currentState === true) {
          return fullFilterAddy + demographicFilters[index].filterAddy;
        }
        return fullFilterAddy;
      },
      ''
    ));
  };

  const sidebarPush = () => {
    showSidebar();
    pushover(!sidebar);
  };

  const checkStyle = { color: '#179297' };

  return (
    <>
      <IconContext.Provider value={{ color: '#179297' }}>
        <div className="closed-menu">
          <IconButton aria-label="open filter menu sidebar" className="menu-bars">
            <FaIcons.FaBars onClick={sidebarPush} />
          </IconButton>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li />
            <li className="navbar-toggle">
              <IconButton aria-label="close filter menu sidebar" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={sidebarPush} />
              </IconButton>
            </li>
            {demographicFilters.map((item, index) => (
              <li key={item.id} className={item.cName}>
                <Checkbox
                  style={checkStyle}
                  checked={checked[index]}
                  onClick={() => handleChange(index)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <span className="margin-left" />
                {item.title}
              </li>
            ))}
            <li />
            <Box textAlign="center">
              <Button
                className="filter-prod-button"
                onClick={onFilter}
                variant="contained"
                disableElevation
                size="small"
              >
                APPLY FILTERS
              </Button>
            </Box>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default FilterMenu;
