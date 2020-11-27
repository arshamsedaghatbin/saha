import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IKarbar } from 'app/shared/model/karbar.model';
import { getEntities as getKarbars } from 'app/entities/karbar/karbar.reducer';
import { getEntity, updateEntity, createEntity, reset } from './negahbani.reducer';
import { INegahbani } from 'app/shared/model/negahbani.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INegahbaniUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NegahbaniUpdate = (props: INegahbaniUpdateProps) => {
  const [karbarId, setKarbarId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { negahbaniEntity, karbars, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/negahbani');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getKarbars();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.begin = convertDateTimeToServer(values.begin);
    values.end = convertDateTimeToServer(values.end);

    if (errors.length === 0) {
      const entity = {
        ...negahbaniEntity,
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
          <h2 id="sahaApp.negahbani.home.createOrEditLabel">
            <Translate contentKey="sahaApp.negahbani.home.createOrEditLabel">Create or edit a Negahbani</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : negahbaniEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="negahbani-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="negahbani-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="beginLabel" for="negahbani-begin">
                  <Translate contentKey="sahaApp.negahbani.begin">Begin</Translate>
                </Label>
                <AvInput
                  id="negahbani-begin"
                  type="datetime-local"
                  className="form-control"
                  name="begin"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.negahbaniEntity.begin)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="negahbani-end">
                  <Translate contentKey="sahaApp.negahbani.end">End</Translate>
                </Label>
                <AvInput
                  id="negahbani-end"
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.negahbaniEntity.end)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="negahbani-karbar">
                  <Translate contentKey="sahaApp.negahbani.karbar">Karbar</Translate>
                </Label>
                <AvInput id="negahbani-karbar" type="select" className="form-control" name="karbar.id">
                  <option value="" key="0" />
                  {karbars
                    ? karbars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/negahbani" replace color="info">
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
  karbars: storeState.karbar.entities,
  negahbaniEntity: storeState.negahbani.entity,
  loading: storeState.negahbani.loading,
  updating: storeState.negahbani.updating,
  updateSuccess: storeState.negahbani.updateSuccess,
});

const mapDispatchToProps = {
  getKarbars,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NegahbaniUpdate);
