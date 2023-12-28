package com.zelix.biometrica.domain;

import static com.zelix.biometrica.domain.FingerprintTemplateTestSamples.*;
import static com.zelix.biometrica.domain.FingerprintTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zelix.biometrica.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FingerprintTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fingerprint.class);
        Fingerprint fingerprint1 = getFingerprintSample1();
        Fingerprint fingerprint2 = new Fingerprint();
        assertThat(fingerprint1).isNotEqualTo(fingerprint2);

        fingerprint2.setId(fingerprint1.getId());
        assertThat(fingerprint1).isEqualTo(fingerprint2);

        fingerprint2 = getFingerprintSample2();
        assertThat(fingerprint1).isNotEqualTo(fingerprint2);
    }

    @Test
    void templateTest() throws Exception {
        Fingerprint fingerprint = getFingerprintRandomSampleGenerator();
        FingerprintTemplate fingerprintTemplateBack = getFingerprintTemplateRandomSampleGenerator();

        fingerprint.setTemplate(fingerprintTemplateBack);
        assertThat(fingerprint.getTemplate()).isEqualTo(fingerprintTemplateBack);

        fingerprint.template(null);
        assertThat(fingerprint.getTemplate()).isNull();
    }
}
