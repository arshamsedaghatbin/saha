import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './niroo-code.reducer';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INirooCodeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const NirooCode = (props: INirooCodeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { nirooCodeList, match, loading } = props;
  return (
    <div>
      <h2 id="niroo-code-heading">
        <Translate contentKey="sahaApp.nirooCode.home.title">Niroo Codes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.nirooCode.home.createLabel">Create new Niroo Code</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {nirooCodeList && nirooCodeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.nirooCode.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.nirooCode.code">Code</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nirooCodeList.map((nirooCode, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nirooCode.id}`} color="link" size="sm">
                      {nirooCode.id}
                    </Button>
                  </td>
                  <td>{nirooCode.name}</td>
                  <td>{nirooCode.code}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nirooCode.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nirooCode.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nirooCode.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.nirooCode.home.notFound">No Niroo Codes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ nirooCode }: IRootState) => ({
  nirooCodeList: nirooCode.entities,
  loading: nirooCode.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NirooCode);
