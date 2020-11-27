import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './morkhasi.reducer';
import { IMorkhasi } from 'app/shared/model/morkhasi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMorkhasiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Morkhasi = (props: IMorkhasiProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { morkhasiList, match, loading } = props;
  return (
    <div>
      <h2 id="morkhasi-heading">
        <Translate contentKey="sahaApp.morkhasi.home.title">Morkhasis</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.morkhasi.home.createLabel">Create new Morkhasi</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {morkhasiList && morkhasiList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.morkhasi.begin">Begin</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.morkhasi.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.morkhasi.karbar">Karbar</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {morkhasiList.map((morkhasi, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${morkhasi.id}`} color="link" size="sm">
                      {morkhasi.id}
                    </Button>
                  </td>
                  <td>{morkhasi.begin ? <TextFormat type="date" value={morkhasi.begin} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{morkhasi.end ? <TextFormat type="date" value={morkhasi.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{morkhasi.karbar ? <Link to={`karbar/${morkhasi.karbar.id}`}>{morkhasi.karbar.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${morkhasi.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${morkhasi.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${morkhasi.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.morkhasi.home.notFound">No Morkhasis found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ morkhasi }: IRootState) => ({
  morkhasiList: morkhasi.entities,
  loading: morkhasi.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Morkhasi);
