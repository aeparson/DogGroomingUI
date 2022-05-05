import React, { useEffect, useState, useCallback } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ExpandMore } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import {
  brandFilters, categoryFilters, colorFilters, demographicFilters,
  materialFilters,
  priceFilters
} from './FilterMenuData';
import styles from './FilterMenu.module.css';

function FilterMenu({
  onFilter, pushover, setWebRoute
}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  // keys correspond to the model binder productfilterparams.cs
  const [filters, setFilters] = useState({
    demographic: demographicFilters,
    brand: brandFilters,
    category: categoryFilters,
    material: materialFilters,
    color: colorFilters,
    price: priceFilters
  });
  /**
 * @name handleFilterChange
 * @description updates the filter state off of the selected option
 */
  const handleFilterChange = (section, filterId, event) => {
    if (section === 'price') {
      const productPrice = filters.price;
      productPrice[filterId].value = event.target.value;
      setFilters({
        ...filters,
        price: productPrice
      });
    } else {
      const updatedFilters = filters[section].map((filter) => {
        // this const only exists to circumvent the eslint settings
        const f = filter;
        if (f.id === filterId) {
          f.value = !filter.value;
        }
        return f;
      });
      setFilters({
        ...filters,
        [section]: updatedFilters
      });
    }
  };

  /**
 * @name updateWebRoute
 * @description Filters products based upon the newly constructed query
 * @return returns products on ui based on web address
 */

  const updateWebRoute = useCallback((query) => {
    setWebRoute(query);
  }, [setWebRoute]);

  // create the filter query
  useEffect(() => {
    let query = '';
    const sections = Object.keys(filters);
    sections.forEach((section) => {
      query += `filterBy=${section}&`;
      if (section === 'price') {
        const prices = filters.price;
        if (prices[0].value) {
          query += `${prices[0].filterAddy}${prices[0].value}&`;
        }
        if (prices[1].value) {
          query += `${prices[1].filterAddy}${prices[1].value}&`;
        }
      } else {
        filters[section].forEach((filter) => {
          if (filter.value) {
            query += filter.filterAddy;
          }
        });
      }
    });
    updateWebRoute(query);
  }, [filters, updateWebRoute]);

  const sidebarPush = () => {
    showSidebar();
    pushover(!sidebar);
  };

  const checkStyle = { color: '#179297' };

  return (
    <>
      <IconContext.Provider value={{ color: '#179297' }}>
        <div className={styles.closedMenu}>
          <IconButton aria-label="open filter menu sidebar" className={styles.menuBars} onClick={sidebarPush}>
            <FaIcons.FaBars />
          </IconButton>
        </div>
        <nav className={sidebar ? styles.navMenuActive : styles.navMenu}>
          <ul className={styles.navMenuItems}>
            <li />
            <li className={styles.navbarToggle}>
              <IconButton aria-label="close filter menu sidebar" className={styles.menuBars} onClick={sidebarPush}>
                <AiIcons.AiOutlineClose />
              </IconButton>
            </li>
            <Accordion className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="brand-content"
                id="brand-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  BRANDS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filters.brand.map((item) => (
                    <li key={item.id} className={styles.navText}>
                      <Checkbox
                        style={checkStyle}
                        checked={item.value}
                        onClick={() => handleFilterChange('brand', item.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className={styles.marginLeft} />
                      {item.title}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Accordion className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="category-content"
                id="category-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  CATEGORIES
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filters.category.map((item) => (
                    <li key={item.id} className={styles.navText}>
                      <Checkbox
                        style={checkStyle}
                        checked={item.value}
                        onClick={() => handleFilterChange('category', item.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className={styles.marginLeft} />
                      {item.title}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Accordion
              className={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="color-content"
                id="color-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  COLORS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filters.color.map((item) => (
                    <li key={item.id} className={styles.navText}>
                      <Checkbox
                        style={checkStyle}
                        checked={item.value}
                        onClick={() => handleFilterChange('color', item.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className={styles.marginLeft} />
                      {item.title}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Accordion
              className={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="demographic-content"
                id="demographic-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  DEMOGRAPHICS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filters.demographic.map((item) => (
                    <li key={item.id} className={styles.navText}>
                      <Checkbox
                        style={checkStyle}
                        checked={item.value}
                        onClick={() => handleFilterChange('demographic', item.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className={styles.marginLeft} />
                      {item.title}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Accordion
              className={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="material-content"
                id="material-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  MATERIALS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filters.material.map((item) => (
                    <li key={item.id} className={styles.navText}>
                      <Checkbox
                        style={checkStyle}
                        checked={item.value}
                        onClick={() => handleFilterChange('material', item.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className={styles.marginLeft} />
                      {item.title}
                    </li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Accordion
              className={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMore className={styles.expandMore} />}
                aria-controls="material-content"
                id="material-header"
                className={styles.accordionSummary}
              >
                <Typography className={styles.accordionTypography}>
                  PRICE
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form
                  className={styles.minMaxForm}
                >
                  MIN PRICE
                  <input type="number" className={styles.minPrice} name="minPrice" min="0" value={filters.price[0].value} onChange={(event) => handleFilterChange('price', 0, event)} />
                  MAX PRICE
                  <input type="number" className={styles.maxPrice} name="maxPrice" max="1000" value={filters.price[1].value} onChange={(event) => handleFilterChange('price', 1, event)} />
                </form>
              </AccordionDetails>
            </Accordion>
            <Box
              className={styles.aboveFiltersBoxes}
              textAlign="center"
            />
            <Button
              onClick={() => onFilter(0)}
              className={styles.filterButton}
              variant="contained"
              size="small"
            >
              APPLY FILTERS
            </Button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default FilterMenu;
