import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './shahr.reducer';
import { IShahr } from 'app/shared/model/shahr.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShahrDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShahrDetail = (props: IShahrDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { shahrEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.shahr.detail.title">Shahr</Translate> [<b>{shahrEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.shahr.name">Name</Translate>
            </span>
          </dt>
          <dd>{shahrEntity.name}</dd>
          <dt>
            <span id="zaribAboHava">
              <Translate contentKey="sahaApp.shahr.zaribAboHava">Zarib Abo Hava</Translate>
            </span>
          </dt>
          <dd>{shahrEntity.zaribAboHava}</dd>
          <dt>
            <span id="zaribTashiat">
              <Translate contentKey="sahaApp.shahr.zaribTashiat">Zarib Tashiat</Translate>
            </span>
          </dt>
          <dd>{shahrEntity.zaribTashiat}</dd>
          <dt>
            <span id="masafatTaMarkaz">
              <Translate contentKey="sahaApp.shahr.masafatTaMarkaz">Masafat Ta Markaz</Translate>
            </span>
          </dt>
          <dd>{shahrEntity.masafatTaMarkaz}</dd>
        </dl>
        <Button tag={Link} to="/shahr" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shahr/${shahrEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ shahr }: IRootState) => ({
  shahrEntity: shahr.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShahrDetail);
