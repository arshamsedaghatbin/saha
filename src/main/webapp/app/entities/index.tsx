import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import YeganCode from './yegan-code';
import Karbar from './karbar';
import Semat from './semat';
import Morkhasi from './morkhasi';
import Dore from './dore';
import Negahbani from './negahbani';
import BargeMamooriat from './barge-mamooriat';
import Daraje from './daraje';
import YeganType from './yegan-type';
import NirooCode from './niroo-code';
import Yegan from './yegan';
import Mantaghe from './mantaghe';
import Ostan from './ostan';
import Shahr from './shahr';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}yegan-code`} component={YeganCode} />
      <ErrorBoundaryRoute path={`${match.url}karbar`} component={Karbar} />
      <ErrorBoundaryRoute path={`${match.url}semat`} component={Semat} />
      <ErrorBoundaryRoute path={`${match.url}morkhasi`} component={Morkhasi} />
      <ErrorBoundaryRoute path={`${match.url}dore`} component={Dore} />
      <ErrorBoundaryRoute path={`${match.url}negahbani`} component={Negahbani} />
      <ErrorBoundaryRoute path={`${match.url}barge-mamooriat`} component={BargeMamooriat} />
      <ErrorBoundaryRoute path={`${match.url}daraje`} component={Daraje} />
      <ErrorBoundaryRoute path={`${match.url}yegan-type`} component={YeganType} />
      <ErrorBoundaryRoute path={`${match.url}niroo-code`} component={NirooCode} />
      <ErrorBoundaryRoute path={`${match.url}yegan`} component={Yegan} />
      <ErrorBoundaryRoute path={`${match.url}mantaghe`} component={Mantaghe} />
      <ErrorBoundaryRoute path={`${match.url}ostan`} component={Ostan} />
      <ErrorBoundaryRoute path={`${match.url}shahr`} component={Shahr} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
