import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Mantaghe from './mantaghe';
import MantagheDetail from './mantaghe-detail';
import MantagheUpdate from './mantaghe-update';
import MantagheDeleteDialog from './mantaghe-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MantagheUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MantagheUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MantagheDetail} />
      <ErrorBoundaryRoute path={match.url} component={Mantaghe} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MantagheDeleteDialog} />
  </>
);

export default Routes;
