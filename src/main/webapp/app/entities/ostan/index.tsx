import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ostan from './ostan';
import OstanDetail from './ostan-detail';
import OstanUpdate from './ostan-update';
import OstanDeleteDialog from './ostan-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OstanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OstanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OstanDetail} />
      <ErrorBoundaryRoute path={match.url} component={Ostan} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OstanDeleteDialog} />
  </>
);

export default Routes;
