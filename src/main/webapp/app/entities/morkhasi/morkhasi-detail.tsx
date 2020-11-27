import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './morkhasi.reducer';
import { IMorkhasi } from 'app/shared/model/morkhasi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMorkhasiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MorkhasiDetail = (props: IMorkhasiDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { morkhasiEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.morkhasi.detail.title">Morkhasi</Translate> [<b>{morkhasiEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="begin">
              <Translate contentKey="sahaApp.morkhasi.begin">Begin</Translate>
            </span>
          </dt>
          <dd>{morkhasiEntity.begin ? <TextFormat value={morkhasiEntity.begin} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">
              <Translate contentKey="sahaApp.morkhasi.end">End</Translate>
            </span>
          </dt>
          <dd>{morkhasiEntity.end ? <TextFormat value={morkhasiEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="sahaApp.morkhasi.karbar">Karbar</Translate>
          </dt>
          <dd>{morkhasiEntity.karbar ? morkhasiEntity.karbar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/morkhasi" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/morkhasi/${morkhasiEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ morkhasi }: IRootState) => ({
  morkhasiEntity: morkhasi.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MorkhasiDetail);
