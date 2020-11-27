import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKarbarDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KarbarDetail = (props: IKarbarDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { karbarEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sahaApp.karbar.detail.title">Karbar</Translate> [<b>{karbarEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="sahaApp.karbar.name">Name</Translate>
            </span>
          </dt>
          <dd>{karbarEntity.name}</dd>
          <dt>
            <span id="onvanShoghli">
              <Translate contentKey="sahaApp.karbar.onvanShoghli">Onvan Shoghli</Translate>
            </span>
          </dt>
          <dd>{karbarEntity.onvanShoghli}</dd>
          <dt>
            <span id="codePerseneli">
              <Translate contentKey="sahaApp.karbar.codePerseneli">Code Perseneli</Translate>
            </span>
          </dt>
          <dd>{karbarEntity.codePerseneli}</dd>
          <dt>
            <span id="bezaneshate">
              <Translate contentKey="sahaApp.karbar.bezaneshate">Bezaneshate</Translate>
            </span>
          </dt>
          <dd>{karbarEntity.bezaneshate ? 'true' : 'false'}</dd>
          <dt>
            <span id="sazmani">
              <Translate contentKey="sahaApp.karbar.sazmani">Sazmani</Translate>
            </span>
          </dt>
          <dd>{karbarEntity.sazmani ? 'true' : 'false'}</dd>
          <dt>
            <span id="tarikhBazneshastegi">
              <Translate contentKey="sahaApp.karbar.tarikhBazneshastegi">Tarikh Bazneshastegi</Translate>
            </span>
          </dt>
          <dd>
            {karbarEntity.tarikhBazneshastegi ? (
              <TextFormat value={karbarEntity.tarikhBazneshastegi} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="sahaApp.karbar.yegan">Yegan</Translate>
          </dt>
          <dd>{karbarEntity.yegan ? karbarEntity.yegan.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.karbar.yeganCode">Yegan Code</Translate>
          </dt>
          <dd>{karbarEntity.yeganCode ? karbarEntity.yeganCode.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.karbar.daraje">Daraje</Translate>
          </dt>
          <dd>{karbarEntity.daraje ? karbarEntity.daraje.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.karbar.nirooCode">Niroo Code</Translate>
          </dt>
          <dd>{karbarEntity.nirooCode ? karbarEntity.nirooCode.id : ''}</dd>
          <dt>
            <Translate contentKey="sahaApp.karbar.semat">Semat</Translate>
          </dt>
          <dd>{karbarEntity.semat ? karbarEntity.semat.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/karbar" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/karbar/${karbarEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ karbar }: IRootState) => ({
  karbarEntity: karbar.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KarbarDetail);
