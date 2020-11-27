import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dore.reducer';
import { IDore } from 'app/shared/model/dore.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDoreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DoreDetail = (props: IDoreDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { doreEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.dore.detail.title">Dore</Translate> [<b>{doreEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="begin">
              <Translate contentKey="sahaApp.dore.begin">Begin</Translate>
            </span>
          </dt>
          <dd>{doreEntity.begin ? <TextFormat value={doreEntity.begin} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="sahaApp.dore.end">End</Translate>
            </span>
          </dt>
          <dd>{doreEntity.end ? <TextFormat value={doreEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="sahaApp.dore.karbar">Karbar</Translate>
          </dt>
          <dd>{doreEntity.karbar ? doreEntity.karbar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/dore" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dore/${doreEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ dore }: IRootState) => ({
  doreEntity: dore.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DoreDetail);
