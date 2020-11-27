import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBargeMamooriatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatDetail = (props: IBargeMamooriatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bargeMamooriatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.bargeMamooriat.detail.title">BargeMamooriat</Translate> [<b>{bargeMamooriatEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tarikhSodoor">
              <Translate contentKey="sahaApp.bargeMamooriat.tarikhSodoor">Tarikh Sodoor</Translate>
            </span>
          </dt>
          <dd>
            {bargeMamooriatEntity.tarikhSodoor ? (
              <TextFormat value={bargeMamooriatEntity.tarikhSodoor} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sahaApp.bargeMamooriat.karbar">Karbar</Translate>
          </dt>
          <dd>{bargeMamooriatEntity.karbar ? bargeMamooriatEntity.karbar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/barge-mamooriat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/barge-mamooriat/${bargeMamooriatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bargeMamooriat }: IRootState) => ({
  bargeMamooriatEntity: bargeMamooriat.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatDetail);
