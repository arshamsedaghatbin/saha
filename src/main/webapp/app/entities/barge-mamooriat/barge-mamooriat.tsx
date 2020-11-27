import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBargeMamooriatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BargeMamooriat = (props: IBargeMamooriatProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bargeMamooriatList, match, loading } = props;
  return (
    <div>
      <h2 id="barge-mamooriat-heading">
        <Translate contentKey="sahaApp.bargeMamooriat.home.title">Barge Mamooriats</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.bargeMamooriat.home.createLabel">Create new Barge Mamooriat</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bargeMamooriatList && bargeMamooriatList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.tarikhSodoor">Tarikh Sodoor</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.bargeMamooriat.karbar">Karbar</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bargeMamooriatList.map((bargeMamooriat, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}`} color="link" size="sm">
                      {bargeMamooriat.id}
                    </Button>
                  </td>
                  <td>
                    {bargeMamooriat.tarikhSodoor ? (
                      <TextFormat type="date" value={bargeMamooriat.tarikhSodoor} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{bargeMamooriat.karbar ? <Link to={`karbar/${bargeMamooriat.karbar.id}`}>{bargeMamooriat.karbar.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bargeMamooriat.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sahaApp.bargeMamooriat.home.notFound">No Barge Mamooriats found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatList: bargeMamooriat.entities,
  loading: bargeMamooriat.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriat);
