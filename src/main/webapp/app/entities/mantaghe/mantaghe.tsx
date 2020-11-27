import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './mantaghe.reducer';
import { IMantaghe } from 'app/shared/model/mantaghe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMantagheProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Mantaghe = (props: IMantagheProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { mantagheList, match, loading } = props;
  return (
    <div>
      <h2 id="mantaghe-heading">
        <Translate contentKey="sahaApp.mantaghe.home.title">Mantaghes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.mantaghe.home.createLabel">Create new Mantaghe</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {mantagheList && mantagheList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.mantaghe.name">Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mantagheList.map((mantaghe, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${mantaghe.id}`} color="link" size="sm">
                      {mantaghe.id}
                    </Button>
                  </td>
                  <td>{mantaghe.name}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${mantaghe.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mantaghe.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mantaghe.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.mantaghe.home.notFound">No Mantaghes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ mantaghe }: IRootState) => ({
  mantagheList: mantaghe.entities,
  loading: mantaghe.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Mantaghe);
