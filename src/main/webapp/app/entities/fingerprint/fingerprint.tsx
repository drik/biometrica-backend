import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './fingerprint.reducer';

export const Fingerprint = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const fingerprintList = useAppSelector(state => state.fingerprint.entities);
  const loading = useAppSelector(state => state.fingerprint.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="fingerprint-heading" data-cy="FingerprintHeading">
        <Translate contentKey="biometricaApp.fingerprint.home.title">Fingerprints</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="biometricaApp.fingerprint.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/fingerprint/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="biometricaApp.fingerprint.home.createLabel">Create new Fingerprint</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {fingerprintList && fingerprintList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="biometricaApp.fingerprint.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('uuid')}>
                  <Translate contentKey="biometricaApp.fingerprint.uuid">Uuid</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('uuid')} />
                </th>
                <th className="hand" onClick={sort('fingerName')}>
                  <Translate contentKey="biometricaApp.fingerprint.fingerName">Finger Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fingerName')} />
                </th>
                <th className="hand" onClick={sort('handName')}>
                  <Translate contentKey="biometricaApp.fingerprint.handName">Hand Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('handName')} />
                </th>
                <th>
                  <Translate contentKey="biometricaApp.fingerprint.template">Template</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fingerprintList.map((fingerprint, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/fingerprint/${fingerprint.id}`} color="link" size="sm">
                      {fingerprint.id}
                    </Button>
                  </td>
                  <td>{fingerprint.uuid}</td>
                  <td>
                    <Translate contentKey={`biometricaApp.FingerName.${fingerprint.fingerName}`} />
                  </td>
                  <td>
                    <Translate contentKey={`biometricaApp.HandName.${fingerprint.handName}`} />
                  </td>
                  <td>
                    {fingerprint.template ? (
                      <Link to={`/fingerprint-template/${fingerprint.template.id}`}>{fingerprint.template.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/fingerprint/${fingerprint.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/fingerprint/${fingerprint.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/fingerprint/${fingerprint.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="biometricaApp.fingerprint.home.notFound">No Fingerprints found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Fingerprint;
