import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IYeganDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganDetail = (props: IYeganDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { yeganEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.yegan.detail.title">Yegan</Translate> [<b>{yeganEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.yegan.name">Name</Translate>
            </span>
          </dt>
          <dd>{yeganEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="sahaApp.yegan.code">Code</Translate>
            </span>
          </dt>
          <dd>{yeganEntity.code}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.nirooCode">Niroo Code</Translate>
          </dt>
          <dd>{yeganEntity.nirooCode ? yeganEntity.nirooCode.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.yegan">Yegan</Translate>
          </dt>
          <dd>{yeganEntity.yegan ? yeganEntity.yegan.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.shahr">Shahr</Translate>
          </dt>
          <dd>{yeganEntity.shahr ? yeganEntity.shahr.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.mantaghe">Mantaghe</Translate>
          </dt>
          <dd>{yeganEntity.mantaghe ? yeganEntity.mantaghe.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.ostan">Ostan</Translate>
          </dt>
          <dd>{yeganEntity.ostan ? yeganEntity.ostan.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yegan.yeganType">Yegan Type</Translate>
          </dt>
          <dd>{yeganEntity.yeganType ? yeganEntity.yeganType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/yegan" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/yegan/${yeganEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ yegan }: IRootState) => ({
  yeganEntity: yegan.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganDetail);
