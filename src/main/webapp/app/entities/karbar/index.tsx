import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Karbar from './karbar';
import KarbarDetail from './karbar-detail';
import KarbarUpdate from './karbar-update';
import KarbarDeleteDialog from './karbar-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KarbarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KarbarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KarbarDetail} />
      <ErrorBoundaryRoute path={match.url} component={Karbar} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={KarbarDeleteDialog} />
  </>
);

export default Routes;
