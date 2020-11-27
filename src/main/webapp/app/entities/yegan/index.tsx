import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Yegan from './yegan';
import YeganDetail from './yegan-detail';
import YeganUpdate from './yegan-update';
import YeganDeleteDialog from './yegan-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={YeganUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={YeganUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={YeganDetail} />
      <ErrorBoundaryRoute path={match.url} component={Yegan} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={YeganDeleteDialog} />
  </>
);

export default Routes;
