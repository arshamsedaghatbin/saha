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
import { getEntity, updateEntity, createEntity, reset } from './barge-mamooriat.reducer';
import { IBargeMamooriat } from 'app/shared/model/barge-mamooriat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBargeMamooriatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BargeMamooriatUpdate = (props: IBargeMamooriatUpdateProps) => {
  const [karbarId, setKarbarId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bargeMamooriatEntity, karbars, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/barge-mamooriat');
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
    values.tarikhSodoor = convertDateTimeToServer(values.tarikhSodoor);

    if (errors.length === 0) {
      const entity = {
        ...bargeMamooriatEntity,
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
          <h2 id="sahaApp.bargeMamooriat.home.createOrEditLabel">
            <Translate contentKey="sahaApp.bargeMamooriat.home.createOrEditLabel">Create or edit a BargeMamooriat</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bargeMamooriatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="barge-mamooriat-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="barge-mamooriat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tarikhSodoorLabel" for="barge-mamooriat-tarikhSodoor">
                  <Translate contentKey="sahaApp.bargeMamooriat.tarikhSodoor">Tarikh Sodoor</Translate>
                </Label>
                <AvInput
                  id="barge-mamooriat-tarikhSodoor"
                  type="datetime-local"
                  className="form-control"
                  name="tarikhSodoor"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bargeMamooriatEntity.tarikhSodoor)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="barge-mamooriat-karbar">
                  <Translate contentKey="sahaApp.bargeMamooriat.karbar">Karbar</Translate>
                </Label>
                <AvInput id="barge-mamooriat-karbar" type="select" className="form-control" name="karbar.id">
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
              <Button tag={Link} id="cancel-save" to="/barge-mamooriat" replace color="info">
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
  bargeMamooriatEntity: storeState.bargeMamooriat.entity,
  loading: storeState.bargeMamooriat.loading,
  updating: storeState.bargeMamooriat.updating,
  updateSuccess: storeState.bargeMamooriat.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BargeMamooriatUpdate);
