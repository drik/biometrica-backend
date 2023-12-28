package com.zelix.biometrica.service;

import com.zelix.biometrica.domain.FingerprintTemplate;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.zelix.biometrica.domain.FingerprintTemplate}.
 */
public interface FingerprintTemplateService {
    /**
     * Save a fingerprintTemplate.
     *
     * @param fingerprintTemplate the entity to save.
     * @return the persisted entity.
     */
    FingerprintTemplate save(FingerprintTemplate fingerprintTemplate);

    /**
     * Updates a fingerprintTemplate.
     *
     * @param fingerprintTemplate the entity to update.
     * @return the persisted entity.
     */
    FingerprintTemplate update(FingerprintTemplate fingerprintTemplate);

    /**
     * Partially updates a fingerprintTemplate.
     *
     * @param fingerprintTemplate the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FingerprintTemplate> partialUpdate(FingerprintTemplate fingerprintTemplate);

    /**
     * Get all the fingerprintTemplates.
     *
     * @return the list of entities.
     */
    List<FingerprintTemplate> findAll();

    /**
     * Get the "id" fingerprintTemplate.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FingerprintTemplate> findOne(String id);

    /**
     * Delete the "id" fingerprintTemplate.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
