import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFingerprintTemplate } from 'app/shared/model/fingerprint-template.model';
import { getEntities as getFingerprintTemplates } from 'app/entities/fingerprint-template/fingerprint-template.reducer';
import { IFingerprint } from 'app/shared/model/fingerprint.model';
import { FingerName } from 'app/shared/model/enumerations/finger-name.model';
import { HandName } from 'app/shared/model/enumerations/hand-name.model';
import { getEntity, updateEntity, createEntity, reset } from './fingerprint.reducer';

export const FingerprintUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fingerprintTemplates = useAppSelector(state => state.fingerprintTemplate.entities);
  const fingerprintEntity = useAppSelector(state => state.fingerprint.entity);
  const loading = useAppSelector(state => state.fingerprint.loading);
  const updating = useAppSelector(state => state.fingerprint.updating);
  const updateSuccess = useAppSelector(state => state.fingerprint.updateSuccess);
  const fingerNameValues = Object.keys(FingerName);
  const handNameValues = Object.keys(HandName);

  const handleClose = () => {
    navigate('/fingerprint');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFingerprintTemplates({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    const entity = {
      ...fingerprintEntity,
      ...values,
      template: fingerprintTemplates.find(it => it.id.toString() === values.template.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          fingerName: 'PINKY_FINGER',
          handName: 'RIGHT_HAND',
          ...fingerprintEntity,
          template: fingerprintEntity?.template?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="biometricaApp.fingerprint.home.createOrEditLabel" data-cy="FingerprintCreateUpdateHeading">
            <Translate contentKey="biometricaApp.fingerprint.home.createOrEditLabel">Create or edit a Fingerprint</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="fingerprint-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('biometricaApp.fingerprint.uuid')}
                id="fingerprint-uuid"
                name="uuid"
                data-cy="uuid"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('biometricaApp.fingerprint.fingerName')}
                id="fingerprint-fingerName"
                name="fingerName"
                data-cy="fingerName"
                type="select"
              >
                {fingerNameValues.map(fingerName => (
                  <option value={fingerName} key={fingerName}>
                    {translate('biometricaApp.FingerName.' + fingerName)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('biometricaApp.fingerprint.handName')}
                id="fingerprint-handName"
                name="handName"
                data-cy="handName"
                type="select"
              >
                {handNameValues.map(handName => (
                  <option value={handName} key={handName}>
                    {translate('biometricaApp.HandName.' + handName)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="fingerprint-template"
                name="template"
                data-cy="template"
                label={translate('biometricaApp.fingerprint.template')}
                type="select"
              >
                <option value="" key="0" />
                {fingerprintTemplates
                  ? fingerprintTemplates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fingerprint" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FingerprintUpdate;
