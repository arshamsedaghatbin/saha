import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mantaghe.reducer';
import { IMantaghe } from 'app/shared/model/mantaghe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMantagheDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MantagheDetail = (props: IMantagheDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mantagheEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.mantaghe.detail.title">Mantaghe</Translate> [<b>{mantagheEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.mantaghe.name">Name</Translate>
            </span>
          </dt>
          <dd>{mantagheEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/mantaghe" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mantaghe/${mantagheEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ mantaghe }: IRootState) => ({
  mantagheEntity: mantaghe.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MantagheDetail);
