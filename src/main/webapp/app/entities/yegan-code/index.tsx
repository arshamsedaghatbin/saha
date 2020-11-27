import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import YeganCode from './yegan-code';
import YeganCodeDetail from './yegan-code-detail';
import YeganCodeUpdate from './yegan-code-update';
import YeganCodeDeleteDialog from './yegan-code-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={YeganCodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={YeganCodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={YeganCodeDetail} />
      <ErrorBoundaryRoute path={match.url} component={YeganCode} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={YeganCodeDeleteDialog} />
  </>
);

export default Routes;
