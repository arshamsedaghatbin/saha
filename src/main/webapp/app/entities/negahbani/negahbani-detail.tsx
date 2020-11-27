import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './negahbani.reducer';
import { INegahbani } from 'app/shared/model/negahbani.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INegahbaniDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NegahbaniDetail = (props: INegahbaniDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { negahbaniEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.negahbani.detail.title">Negahbani</Translate> [<b>{negahbaniEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="begin">
              <Translate contentKey="sahaApp.negahbani.begin">Begin</Translate>
            </span>
          </dt>
          <dd>{negahbaniEntity.begin ? <TextFormat value={negahbaniEntity.begin} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="sahaApp.negahbani.end">End</Translate>
            </span>
          </dt>
          <dd>{negahbaniEntity.end ? <TextFormat value={negahbaniEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="sahaApp.negahbani.karbar">Karbar</Translate>
          </dt>
          <dd>{negahbaniEntity.karbar ? negahbaniEntity.karbar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/negahbani" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/negahbani/${negahbaniEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ negahbani }: IRootState) => ({
  negahbaniEntity: negahbani.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NegahbaniDetail);
