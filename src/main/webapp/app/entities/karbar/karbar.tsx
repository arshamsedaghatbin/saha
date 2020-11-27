import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKarbarProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Karbar = (props: IKarbarProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { karbarList, match, loading } = props;
  return (
    <div>
      <h2 id="karbar-heading">
        <Translate contentKey="sahaApp.karbar.home.title">Karbars</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sahaApp.karbar.home.createLabel">Create new Karbar</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {karbarList && karbarList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.onvanShoghli">Onvan Shoghli</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.codePerseneli">Code Perseneli</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.bezaneshate">Bezaneshate</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.sazmani">Sazmani</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.tarikhBazneshastegi">Tarikh Bazneshastegi</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.yegan">Yegan</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.yeganCode">Yegan Code</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.daraje">Daraje</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.nirooCode">Niroo Code</Translate>
                </th>
                <th>
                  <Translate contentKey="sahaApp.karbar.semat">Semat</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {karbarList.map((karbar, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${karbar.id}`} color="link" size="sm">
                      {karbar.id}
                    </Button>
                  </td>
                  <td>{karbar.name}</td>
                  <td>{karbar.onvanShoghli}</td>
                  <td>{karbar.codePerseneli}</td>
                  <td>{karbar.bezaneshate ? 'true' : 'false'}</td>
                  <td>{karbar.sazmani ? 'true' : 'false'}</td>
                  <td>
                    {karbar.tarikhBazneshastegi ? (
                      <TextFormat type="date" value={karbar.tarikhBazneshastegi} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{karbar.yegan ? <Link to={`yegan/${karbar.yegan.id}`}>{karbar.yegan.id}</Link> : ''}</td>
                  <td>{karbar.yeganCode ? <Link to={`yegan-code/${karbar.yeganCode.id}`}>{karbar.yeganCode.id}</Link> : ''}</td>
                  <td>{karbar.daraje ? <Link to={`daraje/${karbar.daraje.id}`}>{karbar.daraje.id}</Link> : ''}</td>
                  <td>{karbar.nirooCode ? <Link to={`niroo-code/${karbar.nirooCode.id}`}>{karbar.nirooCode.id}</Link> : ''}</td>
                  <td>{karbar.semat ? <Link to={`semat/${karbar.semat.id}`}>{karbar.semat.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${karbar.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${karbar.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${karbar.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sahaApp.karbar.home.notFound">No Karbars found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ karbar }: IRootState) => ({
  karbarList: karbar.entities,
  loading: karbar.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Karbar);
