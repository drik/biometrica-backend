import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/fingerprint">
        <Translate contentKey="global.menu.entities.fingerprint" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/fingerprint-template">
        <Translate contentKey="global.menu.entities.fingerprintTemplate" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
