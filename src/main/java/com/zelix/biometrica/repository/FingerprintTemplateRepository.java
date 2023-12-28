package com.zelix.biometrica.repository;

import com.zelix.biometrica.domain.FingerprintTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the FingerprintTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FingerprintTemplateRepository extends MongoRepository<FingerprintTemplate, String> {}
