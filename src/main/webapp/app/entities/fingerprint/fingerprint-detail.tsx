import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fingerprint.reducer';

export const FingerprintDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fingerprintEntity = useAppSelector(state => state.fingerprint.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fingerprintDetailsHeading">
          <Translate contentKey="biometricaApp.fingerprint.detail.title">Fingerprint</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fingerprintEntity.id}</dd>
          <dt>
            <span id="uuid">
              <Translate contentKey="biometricaApp.fingerprint.uuid">Uuid</Translate>
            </span>
          </dt>
          <dd>{fingerprintEntity.uuid}</dd>
          <dt>
            <span id="fingerName">
              <Translate contentKey="biometricaApp.fingerprint.fingerName">Finger Name</Translate>
            </span>
          </dt>
          <dd>{fingerprintEntity.fingerName}</dd>
          <dt>
            <span id="handName">
              <Translate contentKey="biometricaApp.fingerprint.handName">Hand Name</Translate>
            </span>
          </dt>
          <dd>{fingerprintEntity.handName}</dd>
          <dt>
            <Translate contentKey="biometricaApp.fingerprint.template">Template</Translate>
          </dt>
          <dd>{fingerprintEntity.template ? fingerprintEntity.template.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/fingerprint" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fingerprint/${fingerprintEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FingerprintDetail;
