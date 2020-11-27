import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getYegans } from 'app/entities/yegan/yegan.reducer';
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { getEntities as getNirooCodes } from 'app/entities/niroo-code/niroo-code.reducer';
import { IShahr } from 'app/shared/model/shahr.model';
import { getEntities as getShahrs } from 'app/entities/shahr/shahr.reducer';
import { IMantaghe } from 'app/shared/model/mantaghe.model';
import { getEntities as getMantaghes } from 'app/entities/mantaghe/mantaghe.reducer';
import { IOstan } from 'app/shared/model/ostan.model';
import { getEntities as getOstans } from 'app/entities/ostan/ostan.reducer';
import { IYeganType } from 'app/shared/model/yegan-type.model';
import { getEntities as getYeganTypes } from 'app/entities/yegan-type/yegan-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './yegan.reducer';
import { IYegan } from 'app/shared/model/yegan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IYeganUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganUpdate = (props: IYeganUpdateProps) => {
  const [zirYeganId, setZirYeganId] = useState('0');
  const [yeganId, setYeganId] = useState('0');
  const [nirooCodeId, setNirooCodeId] = useState('0');
  const [shahrId, setShahrId] = useState('0');
  const [mantagheId, setMantagheId] = useState('0');
  const [ostanId, setOstanId] = useState('0');
  const [yeganTypeId, setYeganTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { yeganEntity, yegans, nirooCodes, shahrs, mantaghes, ostans, yeganTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/yegan');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getYegans();
    props.getNirooCodes();
    props.getShahrs();
    props.getMantaghes();
    props.getOstans();
    props.getYeganTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...yeganEntity,
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
          <h2 id="sahaApp.yegan.home.createOrEditLabel">
            <Translate contentKey="sahaApp.yegan.home.createOrEditLabel">Create or edit a Yegan</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : yeganEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="yegan-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="yegan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="yegan-name">
                  <Translate contentKey="sahaApp.yegan.name">Name</Translate>
                </Label>
                <AvField id="yegan-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="yegan-code">
                  <Translate contentKey="sahaApp.yegan.code">Code</Translate>
                </Label>
                <AvField id="yegan-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label for="yegan-nirooCode">
                  <Translate contentKey="sahaApp.yegan.nirooCode">Niroo Code</Translate>
                </Label>
                <AvInput id="yegan-nirooCode" type="select" className="form-control" name="nirooCode.id">
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
                <Label for="yegan-yegan">
                  <Translate contentKey="sahaApp.yegan.yegan">Yegan</Translate>
                </Label>
                <AvInput id="yegan-yegan" type="select" className="form-control" name="yegan.id">
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
                <Label for="yegan-shahr">
                  <Translate contentKey="sahaApp.yegan.shahr">Shahr</Translate>
                </Label>
                <AvInput id="yegan-shahr" type="select" className="form-control" name="shahr.id">
                  <option value="" key="0" />
                  {shahrs
                    ? shahrs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-mantaghe">
                  <Translate contentKey="sahaApp.yegan.mantaghe">Mantaghe</Translate>
                </Label>
                <AvInput id="yegan-mantaghe" type="select" className="form-control" name="mantaghe.id">
                  <option value="" key="0" />
                  {mantaghes
                    ? mantaghes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-ostan">
                  <Translate contentKey="sahaApp.yegan.ostan">Ostan</Translate>
                </Label>
                <AvInput id="yegan-ostan" type="select" className="form-control" name="ostan.id">
                  <option value="" key="0" />
                  {ostans
                    ? ostans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="yegan-yeganType">
                  <Translate contentKey="sahaApp.yegan.yeganType">Yegan Type</Translate>
                </Label>
                <AvInput id="yegan-yeganType" type="select" className="form-control" name="yeganType.id">
                  <option value="" key="0" />
                  {yeganTypes
                    ? yeganTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/yegan" replace color="info">
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
  nirooCodes: storeState.nirooCode.entities,
  shahrs: storeState.shahr.entities,
  mantaghes: storeState.mantaghe.entities,
  ostans: storeState.ostan.entities,
  yeganTypes: storeState.yeganType.entities,
  yeganEntity: storeState.yegan.entity,
  loading: storeState.yegan.loading,
  updating: storeState.yegan.updating,
  updateSuccess: storeState.yegan.updateSuccess,
});

const mapDispatchToProps = {
  getYegans,
  getNirooCodes,
  getShahrs,
  getMantaghes,
  getOstans,
  getYeganTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganUpdate);
