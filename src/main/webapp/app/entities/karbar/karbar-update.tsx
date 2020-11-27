import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IYegan } from 'app/shared/model/yegan.model';
import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { getEntities as getYeganCodes } from 'app/entities/yegan-code/yegan-code.reducer';
import { IDaraje } from 'app/shared/model/daraje.model';
import { getEntities as getDarajes } from 'app/entities/daraje/daraje.reducer';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { getEntities as getNirooCodes } from 'app/entities/niroo-code/niroo-code.reducer';
import { ISemat } from 'app/shared/model/semat.model';
import { getEntities as getSemats } from 'app/entities/semat/semat.reducer';
import { getEntity, updateEntity, createEntity, reset } from './karbar.reducer';
import { IKarbar } from 'app/shared/model/karbar.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKarbarUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KarbarUpdate = (props: IKarbarUpdateProps) => {
  const [yeganId, setYeganId] = useState('0');
  const [yeganCodeId, setYeganCodeId] = useState('0');
  const [darajeId, setDarajeId] = useState('0');
  const [nirooCodeId, setNirooCodeId] = useState('0');
  const [sematId, setSematId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { karbarEntity, yegans, yeganCodes, darajes, nirooCodes, semats, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/karbar');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getYegans();
    props.getYeganCodes();
    props.getDarajes();
    props.getNirooCodes();
    props.getSemats();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.tarikhBazneshastegi = convertDateTimeToServer(values.tarikhBazneshastegi);

    if (errors.length === 0) {
      const entity = {
        ...karbarEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sahaApp.karbar.home.createOrEditLabel">
            <Translate contentKey="sahaApp.karbar.home.createOrEditLabel">Create or edit a Karbar</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : karbarEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="karbar-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="karbar-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="karbar-name">
                  <Translate contentKey="sahaApp.karbar.name">Name</Translate>
                </Label>
                <AvField id="karbar-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="onvanShoghliLabel" for="karbar-onvanShoghli">
                  <Translate contentKey="sahaApp.karbar.onvanShoghli">Onvan Shoghli</Translate>
                </Label>
                <AvField id="karbar-onvanShoghli" type="text" name="onvanShoghli" />
              </AvGroup>
              <AvGroup>
                <Label id="codePerseneliLabel" for="karbar-codePerseneli">
                  <Translate contentKey="sahaApp.karbar.codePerseneli">Code Perseneli</Translate>
                </Label>
                <AvField id="karbar-codePerseneli" type="text" name="codePerseneli" />
              </AvGroup>
              <AvGroup check>
                <Label id="bezaneshateLabel">
                  <AvInput id="karbar-bezaneshate" type="checkbox" className="form-check-input" name="bezaneshate" />
                  <Translate contentKey="sahaApp.karbar.bezaneshate">Bezaneshate</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="sazmaniLabel">
                  <AvInput id="karbar-sazmani" type="checkbox" className="form-check-input" name="sazmani" />
                  <Translate contentKey="sahaApp.karbar.sazmani">Sazmani</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="tarikhBazneshastegiLabel" for="karbar-tarikhBazneshastegi">
                  <Translate contentKey="sahaApp.karbar.tarikhBazneshastegi">Tarikh Bazneshastegi</Translate>
                </Label>
                <AvInput
                  id="karbar-tarikhBazneshastegi"
                  type="datetime-local"
                  className="form-control"
                  name="tarikhBazneshastegi"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.karbarEntity.tarikhBazneshastegi)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="karbar-yegan">
                  <Translate contentKey="sahaApp.karbar.yegan">Yegan</Translate>
                </Label>
                <AvInput id="karbar-yegan" type="select" className="form-control" name="yegan.id">
                  <option value="" key="0" />
                  {yegans
                    ? yegans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="karbar-yeganCode">
                  <Translate contentKey="sahaApp.karbar.yeganCode">Yegan Code</Translate>
                </Label>
                <AvInput id="karbar-yeganCode" type="select" className="form-control" name="yeganCode.id">
                  <option value="" key="0" />
                  {yeganCodes
                    ? yeganCodes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="karbar-daraje">
                  <Translate contentKey="sahaApp.karbar.daraje">Daraje</Translate>
                </Label>
                <AvInput id="karbar-daraje" type="select" className="form-control" name="daraje.id">
                  <option value="" key="0" />
                  {darajes
                    ? darajes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="karbar-nirooCode">
                  <Translate contentKey="sahaApp.karbar.nirooCode">Niroo Code</Translate>
                </Label>
                <AvInput id="karbar-nirooCode" type="select" className="form-control" name="nirooCode.id">
                  <option value="" key="0" />
                  {nirooCodes
                    ? nirooCodes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="karbar-semat">
                  <Translate contentKey="sahaApp.karbar.semat">Semat</Translate>
                </Label>
                <AvInput id="karbar-semat" type="select" className="form-control" name="semat.id">
                  <option value="" key="0" />
                  {semats
                    ? semats.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/karbar" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  yegans: storeState.yegan.entities,
  yeganCodes: storeState.yeganCode.entities,
  darajes: storeState.daraje.entities,
  nirooCodes: storeState.nirooCode.entities,
  semats: storeState.semat.entities,
  karbarEntity: storeState.karbar.entity,
  loading: storeState.karbar.loading,
  updating: storeState.karbar.updating,
  updateSuccess: storeState.karbar.updateSuccess,
});

const mapDispatchToProps = {
  getYegans,
  getYeganCodes,
  getDarajes,
  getNirooCodes,
  getSemats,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KarbarUpdate);
