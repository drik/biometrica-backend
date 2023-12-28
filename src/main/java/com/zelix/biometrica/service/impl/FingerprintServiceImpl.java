package com.zelix.biometrica.service.impl;

import com.zelix.biometrica.domain.Fingerprint;
import com.zelix.biometrica.repository.FingerprintRepository;
import com.zelix.biometrica.service.FingerprintService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.zelix.biometrica.domain.Fingerprint}.
 */
@Service
public class FingerprintServiceImpl implements FingerprintService {

    private final Logger log = LoggerFactory.getLogger(FingerprintServiceImpl.class);

    private final FingerprintRepository fingerprintRepository;

    public FingerprintServiceImpl(FingerprintRepository fingerprintRepository) {
        this.fingerprintRepository = fingerprintRepository;
    }

    @Override
    public Fingerprint save(Fingerprint fingerprint) {
        log.debug("Request to save Fingerprint : {}", fingerprint);
        return fingerprintRepository.save(fingerprint);
    }

    @Override
    public Fingerprint update(Fingerprint fingerprint) {
        log.debug("Request to update Fingerprint : {}", fingerprint);
        return fingerprintRepository.save(fingerprint);
    }

    @Override
    public Optional<Fingerprint> partialUpdate(Fingerprint fingerprint) {
        log.debug("Request to partially update Fingerprint : {}", fingerprint);

        return fingerprintRepository
            .findById(fingerprint.getId())
            .map(existingFingerprint -> {
                if (fingerprint.getUuid() != null) {
                    existingFingerprint.setUuid(fingerprint.getUuid());
                }
                if (fingerprint.getFingerName() != null) {
                    existingFingerprint.setFingerName(fingerprint.getFingerName());
                }
                if (fingerprint.getHandName() != null) {
                    existingFingerprint.setHandName(fingerprint.getHandName());
                }

                return existingFingerprint;
            })
            .map(fingerprintRepository::save);
    }

    @Override
    public List<Fingerprint> findAll() {
        log.debug("Request to get all Fingerprints");
        return fingerprintRepository.findAll();
    }

    @Override
    public Optional<Fingerprint> findOne(String id) {
        log.debug("Request to get Fingerprint : {}", id);
        return fingerprintRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Fingerprint : {}", id);
        fingerprintRepository.deleteById(id);
    }
}
