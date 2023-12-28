import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fingerprint-template.reducer';

export const FingerprintTemplateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fingerprintTemplateEntity = useAppSelector(state => state.fingerprintTemplate.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fingerprintTemplateDetailsHeading">
          <Translate contentKey="biometricaApp.fingerprintTemplate.detail.title">FingerprintTemplate</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fingerprintTemplateEntity.id}</dd>
          <dt>
            <span id="templateVersion">
              <Translate contentKey="biometricaApp.fingerprintTemplate.templateVersion">Template Version</Translate>
            </span>
          </dt>
          <dd>{fingerprintTemplateEntity.templateVersion}</dd>
          <dt>
            <span id="templateData">
              <Translate contentKey="biometricaApp.fingerprintTemplate.templateData">Template Data</Translate>
            </span>
          </dt>
          <dd>
            {fingerprintTemplateEntity.templateData ? (
              <div>
                {fingerprintTemplateEntity.templateDataContentType ? (
                  <a onClick={openFile(fingerprintTemplateEntity.templateDataContentType, fingerprintTemplateEntity.templateData)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {fingerprintTemplateEntity.templateDataContentType}, {byteSize(fingerprintTemplateEntity.templateData)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="originalImage">
              <Translate contentKey="biometricaApp.fingerprintTemplate.originalImage">Original Image</Translate>
            </span>
          </dt>
          <dd>
            {fingerprintTemplateEntity.originalImage ? (
              <div>
                {fingerprintTemplateEntity.originalImageContentType ? (
                  <a onClick={openFile(fingerprintTemplateEntity.originalImageContentType, fingerprintTemplateEntity.originalImage)}>
                    <img
                      src={`data:${fingerprintTemplateEntity.originalImageContentType};base64,${fingerprintTemplateEntity.originalImage}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {fingerprintTemplateEntity.originalImageContentType}, {byteSize(fingerprintTemplateEntity.originalImage)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="originalImageMime">
              <Translate contentKey="biometricaApp.fingerprintTemplate.originalImageMime">Original Image Mime</Translate>
            </span>
          </dt>
          <dd>{fingerprintTemplateEntity.originalImageMime}</dd>
          <dt>
            <span id="originalImageExtension">
              <Translate contentKey="biometricaApp.fingerprintTemplate.originalImageExtension">Original Image Extension</Translate>
            </span>
          </dt>
          <dd>{fingerprintTemplateEntity.originalImageExtension}</dd>
        </dl>
        <Button tag={Link} to="/fingerprint-template" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fingerprint-template/${fingerprintTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FingerprintTemplateDetail;
