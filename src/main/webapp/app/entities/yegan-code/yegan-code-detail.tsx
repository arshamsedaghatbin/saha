import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './yegan-code.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IYeganCodeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganCodeDetail = (props: IYeganCodeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { yeganCodeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.yeganCode.detail.title">YeganCode</Translate> [<b>{yeganCodeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.yeganCode.name">Name</Translate>
            </span>
          </dt>
          <dd>{yeganCodeEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="sahaApp.yeganCode.code">Code</Translate>
            </span>
          </dt>
          <dd>{yeganCodeEntity.code}</dd>
          <dt>
            <Translate contentKey="sahaApp.yeganCode.yegan">Yegan</Translate>
          </dt>
          <dd>{yeganCodeEntity.yegan ? yeganCodeEntity.yegan.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.yeganCode.nirooCode">Niroo Code</Translate>
          </dt>
          <dd>{yeganCodeEntity.nirooCode ? yeganCodeEntity.nirooCode.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/yegan-code" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/yegan-code/${yeganCodeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ yeganCode }: IRootState) => ({
  yeganCodeEntity: yeganCode.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganCodeDetail);
