import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Semat from './semat';
import SematDetail from './semat-detail';
import SematUpdate from './semat-update';
import SematDeleteDialog from './semat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SematUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SematUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SematDetail} />
      <ErrorBoundaryRoute path={match.url} component={Semat} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SematDeleteDialog} />
  </>
);

export default Routes;
