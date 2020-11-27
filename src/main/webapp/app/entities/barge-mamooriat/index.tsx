import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BargeMamooriat from './barge-mamooriat';
import BargeMamooriatDetail from './barge-mamooriat-detail';
import BargeMamooriatUpdate from './barge-mamooriat-update';
import BargeMamooriatDeleteDialog from './barge-mamooriat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BargeMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BargeMamooriatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BargeMamooriatDetail} />
      <ErrorBoundaryRoute path={match.url} component={BargeMamooriat} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BargeMamooriatDeleteDialog} />
  </>
);

export default Routes;
