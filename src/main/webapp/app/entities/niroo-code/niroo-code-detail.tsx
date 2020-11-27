import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './niroo-code.reducer';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INirooCodeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NirooCodeDetail = (props: INirooCodeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { nirooCodeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.nirooCode.detail.title">NirooCode</Translate> [<b>{nirooCodeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.nirooCode.name">Name</Translate>
            </span>
          </dt>
          <dd>{nirooCodeEntity.name}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="sahaApp.nirooCode.code">Code</Translate>
            </span>
          </dt>
          <dd>{nirooCodeEntity.code}</dd>
        </dl>
        <Button tag={Link} to="/niroo-code" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/niroo-code/${nirooCodeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ nirooCode }: IRootState) => ({
  nirooCodeEntity: nirooCode.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NirooCodeDetail);
