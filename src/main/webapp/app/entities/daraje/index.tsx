import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Daraje from './daraje';
import DarajeDetail from './daraje-detail';
import DarajeUpdate from './daraje-update';
import DarajeDeleteDialog from './daraje-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DarajeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DarajeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DarajeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Daraje} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DarajeDeleteDialog} />
  </>
);

export default Routes;
