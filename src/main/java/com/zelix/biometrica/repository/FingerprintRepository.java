package com.zelix.biometrica.repository;

import com.zelix.biometrica.domain.Fingerprint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Fingerprint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FingerprintRepository extends MongoRepository<Fingerprint, String> {}
