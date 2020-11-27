import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Negahbani from './negahbani';
import NegahbaniDetail from './negahbani-detail';
import NegahbaniUpdate from './negahbani-update';
import NegahbaniDeleteDialog from './negahbani-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NegahbaniUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NegahbaniUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NegahbaniDetail} />
      <ErrorBoundaryRoute path={match.url} component={Negahbani} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NegahbaniDeleteDialog} />
  </>
);

export default Routes;
