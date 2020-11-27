import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Morkhasi from './morkhasi';
import MorkhasiDetail from './morkhasi-detail';
import MorkhasiUpdate from './morkhasi-update';
import MorkhasiDeleteDialog from './morkhasi-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MorkhasiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MorkhasiUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MorkhasiDetail} />
      <ErrorBoundaryRoute path={match.url} component={Morkhasi} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MorkhasiDeleteDialog} />
  </>
);

export default Routes;
