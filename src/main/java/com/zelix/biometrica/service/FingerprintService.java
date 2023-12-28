package com.zelix.biometrica.service;

import com.zelix.biometrica.domain.Fingerprint;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.zelix.biometrica.domain.Fingerprint}.
 */
public interface FingerprintService {
    /**
     * Save a fingerprint.
     *
     * @param fingerprint the entity to save.
     * @return the persisted entity.
     */
    Fingerprint save(Fingerprint fingerprint);

    /**
     * Updates a fingerprint.
     *
     * @param fingerprint the entity to update.
     * @return the persisted entity.
     */
    Fingerprint update(Fingerprint fingerprint);

    /**
     * Partially updates a fingerprint.
     *
     * @param fingerprint the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Fingerprint> partialUpdate(Fingerprint fingerprint);

    /**
     * Get all the fingerprints.
     *
     * @return the list of entities.
     */
    List<Fingerprint> findAll();

    /**
     * Get the "id" fingerprint.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Fingerprint> findOne(String id);

    /**
     * Delete the "id" fingerprint.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
