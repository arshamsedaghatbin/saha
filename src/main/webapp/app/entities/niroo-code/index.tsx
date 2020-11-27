import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NirooCode from './niroo-code';
import NirooCodeDetail from './niroo-code-detail';
import NirooCodeUpdate from './niroo-code-update';
import NirooCodeDeleteDialog from './niroo-code-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NirooCodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NirooCodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NirooCodeDetail} />
      <ErrorBoundaryRoute path={match.url} component={NirooCode} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NirooCodeDeleteDialog} />
  </>
);

export default Routes;
