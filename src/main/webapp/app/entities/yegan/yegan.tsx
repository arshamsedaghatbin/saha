import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IYeganProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Yegan = (props: IYeganProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { yeganList, match, loading } = props;
  return (
    <div>
      <h2 id="yegan-heading">
        <Translate contentKey="sahaApp.yegan.home.title">Yegans</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.yegan.home.createLabel">Create new Yegan</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {yeganList && yeganList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.nirooCode">Niroo Code</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.yegan">Yegan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.shahr">Shahr</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.mantaghe">Mantaghe</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.ostan">Ostan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yegan.yeganType">Yegan Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {yeganList.map((yegan, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${yegan.id}`} color="link" size="sm">
                      {yegan.id}
                    </Button>
                  </td>
                  <td>{yegan.name}</td>
                  <td>{yegan.code}</td>
                  <td>{yegan.nirooCode ? <Link to={`niroo-code/${yegan.nirooCode.id}`}>{yegan.nirooCode.id}</Link> : ''}</td>
                  <td>{yegan.yegan ? <Link to={`yegan/${yegan.yegan.id}`}>{yegan.yegan.id}</Link> : ''}</td>
                  <td>{yegan.shahr ? <Link to={`shahr/${yegan.shahr.id}`}>{yegan.shahr.id}</Link> : ''}</td>
                  <td>{yegan.mantaghe ? <Link to={`mantaghe/${yegan.mantaghe.id}`}>{yegan.mantaghe.id}</Link> : ''}</td>
                  <td>{yegan.ostan ? <Link to={`ostan/${yegan.ostan.id}`}>{yegan.ostan.id}</Link> : ''}</td>
                  <td>{yegan.yeganType ? <Link to={`yegan-type/${yegan.yeganType.id}`}>{yegan.yeganType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${yegan.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${yegan.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${yegan.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.yegan.home.notFound">No Yegans found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ yegan }: IRootState) => ({
  yeganList: yegan.entities,
  loading: yegan.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Yegan);
