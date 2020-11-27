import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './yegan-code.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IYeganCodeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const YeganCode = (props: IYeganCodeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { yeganCodeList, match, loading } = props;
  return (
    <div>
      <h2 id="yegan-code-heading">
        <Translate contentKey="sahaApp.yeganCode.home.title">Yegan Codes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.yeganCode.home.createLabel">Create new Yegan Code</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {yeganCodeList && yeganCodeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yeganCode.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yeganCode.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yeganCode.yegan">Yegan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.yeganCode.nirooCode">Niroo Code</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {yeganCodeList.map((yeganCode, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${yeganCode.id}`} color="link" size="sm">
                      {yeganCode.id}
                    </Button>
                  </td>
                  <td>{yeganCode.name}</td>
                  <td>{yeganCode.code}</td>
                  <td>{yeganCode.yegan ? <Link to={`yegan/${yeganCode.yegan.id}`}>{yeganCode.yegan.id}</Link> : ''}</td>
                  <td>{yeganCode.nirooCode ? <Link to={`niroo-code/${yeganCode.nirooCode.id}`}>{yeganCode.nirooCode.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${yeganCode.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${yeganCode.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${yeganCode.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.yeganCode.home.notFound">No Yegan Codes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ yeganCode }: IRootState) => ({
  yeganCodeList: yeganCode.entities,
  loading: yeganCode.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganCode);
