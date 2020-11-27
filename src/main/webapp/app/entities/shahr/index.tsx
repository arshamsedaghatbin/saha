import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Shahr from './shahr';
import ShahrDetail from './shahr-detail';
import ShahrUpdate from './shahr-update';
import ShahrDeleteDialog from './shahr-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShahrUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShahrUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShahrDetail} />
      <ErrorBoundaryRoute path={match.url} component={Shahr} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ShahrDeleteDialog} />
  </>
);

export default Routes;
