package com.zelix.biometrica.web.rest;

import com.zelix.biometrica.domain.Fingerprint;
import com.zelix.biometrica.repository.FingerprintRepository;
import com.zelix.biometrica.service.FingerprintService;
import com.zelix.biometrica.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zelix.biometrica.domain.Fingerprint}.
 */
@RestController
@RequestMapping("/api/fingerprints")
public class FingerprintResource {

    private final Logger log = LoggerFactory.getLogger(FingerprintResource.class);

    private static final String ENTITY_NAME = "fingerprint";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FingerprintService fingerprintService;

    private final FingerprintRepository fingerprintRepository;

    public FingerprintResource(FingerprintService fingerprintService, FingerprintRepository fingerprintRepository) {
        this.fingerprintService = fingerprintService;
        this.fingerprintRepository = fingerprintRepository;
    }

    /**
     * {@code POST  /fingerprints} : Create a new fingerprint.
     *
     * @param fingerprint the fingerprint to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fingerprint, or with status {@code 400 (Bad Request)} if the fingerprint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Fingerprint> createFingerprint(@Valid @RequestBody Fingerprint fingerprint) throws URISyntaxException {
        log.debug("REST request to save Fingerprint : {}", fingerprint);
        if (fingerprint.getId() != null) {
            throw new BadRequestAlertException("A new fingerprint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fingerprint result = fingerprintService.save(fingerprint);
        return ResponseEntity
            .created(new URI("/api/fingerprints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /fingerprints/:id} : Updates an existing fingerprint.
     *
     * @param id the id of the fingerprint to save.
     * @param fingerprint the fingerprint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fingerprint,
     * or with status {@code 400 (Bad Request)} if the fingerprint is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fingerprint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Fingerprint> updateFingerprint(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Fingerprint fingerprint
    ) throws URISyntaxException {
        log.debug("REST request to update Fingerprint : {}, {}", id, fingerprint);
        if (fingerprint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fingerprint.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fingerprintRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Fingerprint result = fingerprintService.update(fingerprint);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fingerprint.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /fingerprints/:id} : Partial updates given fields of an existing fingerprint, field will ignore if it is null
     *
     * @param id the id of the fingerprint to save.
     * @param fingerprint the fingerprint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fingerprint,
     * or with status {@code 400 (Bad Request)} if the fingerprint is not valid,
     * or with status {@code 404 (Not Found)} if the fingerprint is not found,
     * or with status {@code 500 (Internal Server Error)} if the fingerprint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fingerprint> partialUpdateFingerprint(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Fingerprint fingerprint
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fingerprint partially : {}, {}", id, fingerprint);
        if (fingerprint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fingerprint.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fingerprintRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fingerprint> result = fingerprintService.partialUpdate(fingerprint);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fingerprint.getId())
        );
    }

    /**
     * {@code GET  /fingerprints} : get all the fingerprints.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fingerprints in body.
     */
    @GetMapping("")
    public List<Fingerprint> getAllFingerprints() {
        log.debug("REST request to get all Fingerprints");
        return fingerprintService.findAll();
    }

    /**
     * {@code GET  /fingerprints/:id} : get the "id" fingerprint.
     *
     * @param id the id of the fingerprint to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fingerprint, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Fingerprint> getFingerprint(@PathVariable("id") String id) {
        log.debug("REST request to get Fingerprint : {}", id);
        Optional<Fingerprint> fingerprint = fingerprintService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fingerprint);
    }

    /**
     * {@code DELETE  /fingerprints/:id} : delete the "id" fingerprint.
     *
     * @param id the id of the fingerprint to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFingerprint(@PathVariable("id") String id) {
        log.debug("REST request to delete Fingerprint : {}", id);
        fingerprintService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
