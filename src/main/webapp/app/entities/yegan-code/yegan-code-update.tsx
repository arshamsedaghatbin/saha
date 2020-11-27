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
import { INirooCode } from 'app/shared/model/niroo-code.model';
import { getEntities as getNirooCodes } from 'app/entities/niroo-code/niroo-code.reducer';
import { getEntity, updateEntity, createEntity, reset } from './yegan-code.reducer';
import { IYeganCode } from 'app/shared/model/yegan-code.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IYeganCodeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const YeganCodeUpdate = (props: IYeganCodeUpdateProps) => {
  const [yeganId, setYeganId] = useState('0');
  const [nirooCodeId, setNirooCodeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { yeganCodeEntity, yegans, nirooCodes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/yegan-code');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getYegans();
    props.getNirooCodes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...yeganCodeEntity,
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
          <h2 id="sahaApp.yeganCode.home.createOrEditLabel">
            <Translate contentKey="sahaApp.yeganCode.home.createOrEditLabel">Create or edit a YeganCode</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : yeganCodeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="yegan-code-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="yegan-code-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="yegan-code-name">
                  <Translate contentKey="sahaApp.yeganCode.name">Name</Translate>
                </Label>
                <AvField id="yegan-code-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="yegan-code-code">
                  <Translate contentKey="sahaApp.yeganCode.code">Code</Translate>
                </Label>
                <AvField id="yegan-code-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label for="yegan-code-yegan">
                  <Translate contentKey="sahaApp.yeganCode.yegan">Yegan</Translate>
                </Label>
                <AvInput id="yegan-code-yegan" type="select" className="form-control" name="yegan.id">
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
                <Label for="yegan-code-nirooCode">
                  <Translate contentKey="sahaApp.yeganCode.nirooCode">Niroo Code</Translate>
                </Label>
                <AvInput id="yegan-code-nirooCode" type="select" className="form-control" name="nirooCode.id">
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
              <Button tag={Link} id="cancel-save" to="/yegan-code" replace color="info">
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
  yeganCodeEntity: storeState.yeganCode.entity,
  loading: storeState.yeganCode.loading,
  updating: storeState.yeganCode.updating,
  updateSuccess: storeState.yeganCode.updateSuccess,
});

const mapDispatchToProps = {
  getYegans,
  getNirooCodes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(YeganCodeUpdate);
