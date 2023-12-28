package com.zelix.biometrica.domain;

import static com.zelix.biometrica.domain.FingerprintTemplateTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.zelix.biometrica.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FingerprintTemplateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FingerprintTemplate.class);
        FingerprintTemplate fingerprintTemplate1 = getFingerprintTemplateSample1();
        FingerprintTemplate fingerprintTemplate2 = new FingerprintTemplate();
        assertThat(fingerprintTemplate1).isNotEqualTo(fingerprintTemplate2);

        fingerprintTemplate2.setId(fingerprintTemplate1.getId());
        assertThat(fingerprintTemplate1).isEqualTo(fingerprintTemplate2);

        fingerprintTemplate2 = getFingerprintTemplateSample2();
        assertThat(fingerprintTemplate1).isNotEqualTo(fingerprintTemplate2);
    }
}
