import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import YeganType from './yegan-type';
import YeganTypeDetail from './yegan-type-detail';
import YeganTypeUpdate from './yegan-type-update';
import YeganTypeDeleteDialog from './yegan-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={YeganTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={YeganTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={YeganTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={YeganType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={YeganTypeDeleteDialog} />
  </>
);

export default Routes;
