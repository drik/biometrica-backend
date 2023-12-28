import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFingerprintTemplate } from 'app/shared/model/fingerprint-template.model';
import { getEntity, updateEntity, createEntity, reset } from './fingerprint-template.reducer';

export const FingerprintTemplateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fingerprintTemplateEntity = useAppSelector(state => state.fingerprintTemplate.entity);
  const loading = useAppSelector(state => state.fingerprintTemplate.loading);
  const updating = useAppSelector(state => state.fingerprintTemplate.updating);
  const updateSuccess = useAppSelector(state => state.fingerprintTemplate.updateSuccess);

  const handleClose = () => {
    navigate('/fingerprint-template');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    const entity = {
      ...fingerprintTemplateEntity,
      ...values,
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
          ...fingerprintTemplateEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="biometricaApp.fingerprintTemplate.home.createOrEditLabel" data-cy="FingerprintTemplateCreateUpdateHeading">
            <Translate contentKey="biometricaApp.fingerprintTemplate.home.createOrEditLabel">
              Create or edit a FingerprintTemplate
            </Translate>
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
                  id="fingerprint-template-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('biometricaApp.fingerprintTemplate.templateVersion')}
                id="fingerprint-template-templateVersion"
                name="templateVersion"
                data-cy="templateVersion"
                type="text"
              />
              <ValidatedBlobField
                label={translate('biometricaApp.fingerprintTemplate.templateData')}
                id="fingerprint-template-templateData"
                name="templateData"
                data-cy="templateData"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedBlobField
                label={translate('biometricaApp.fingerprintTemplate.originalImage')}
                id="fingerprint-template-originalImage"
                name="originalImage"
                data-cy="originalImage"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('biometricaApp.fingerprintTemplate.originalImageMime')}
                id="fingerprint-template-originalImageMime"
                name="originalImageMime"
                data-cy="originalImageMime"
                type="text"
              />
              <ValidatedField
                label={translate('biometricaApp.fingerprintTemplate.originalImageExtension')}
                id="fingerprint-template-originalImageExtension"
                name="originalImageExtension"
                data-cy="originalImageExtension"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fingerprint-template" replace color="info">
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

export default FingerprintTemplateUpdate;
