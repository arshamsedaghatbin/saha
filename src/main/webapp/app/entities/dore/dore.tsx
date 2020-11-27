import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dore.reducer';
import { IDore } from 'app/shared/model/dore.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDoreProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Dore = (props: IDoreProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { doreList, match, loading } = props;
  return (
    <div>
      <h2 id="dore-heading">
        <Translate contentKey="sahaApp.dore.home.title">Dores</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.dore.home.createLabel">Create new Dore</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {doreList && doreList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.dore.begin">Begin</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.dore.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.dore.karbar">Karbar</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {doreList.map((dore, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dore.id}`} color="link" size="sm">
                      {dore.id}
                    </Button>
                  </td>
                  <td>{dore.begin ? <TextFormat type="date" value={dore.begin} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{dore.end ? <TextFormat type="date" value={dore.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{dore.karbar ? <Link to={`karbar/${dore.karbar.id}`}>{dore.karbar.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dore.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dore.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dore.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.dore.home.notFound">No Dores found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ dore }: IRootState) => ({
  doreList: dore.entities,
  loading: dore.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Dore);
