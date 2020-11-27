import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/yegan-code">
      <Translate contentKey="global.menu.entities.yeganCode" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/karbar">
      <Translate contentKey="global.menu.entities.karbar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/semat">
      <Translate contentKey="global.menu.entities.semat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/morkhasi">
      <Translate contentKey="global.menu.entities.morkhasi" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/dore">
      <Translate contentKey="global.menu.entities.dore" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/negahbani">
      <Translate contentKey="global.menu.entities.negahbani" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/barge-mamooriat">
      <Translate contentKey="global.menu.entities.bargeMamooriat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/daraje">
      <Translate contentKey="global.menu.entities.daraje" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan-type">
      <Translate contentKey="global.menu.entities.yeganType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/niroo-code">
      <Translate contentKey="global.menu.entities.nirooCode" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/yegan">
      <Translate contentKey="global.menu.entities.yegan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mantaghe">
      <Translate contentKey="global.menu.entities.mantaghe" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ostan">
      <Translate contentKey="global.menu.entities.ostan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/shahr">
      <Translate contentKey="global.menu.entities.shahr" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
