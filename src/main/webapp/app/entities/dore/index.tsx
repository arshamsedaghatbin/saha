import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dore from './dore';
import DoreDetail from './dore-detail';
import DoreUpdate from './dore-update';
import DoreDeleteDialog from './dore-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DoreUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DoreDetail} />
      <ErrorBoundaryRoute path={match.url} component={Dore} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DoreDeleteDialog} />
  </>
);

export default Routes;
