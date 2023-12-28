package com.zelix.biometrica.domain;

import java.util.UUID;

public class FingerprintTemplateTestSamples {

    public static FingerprintTemplate getFingerprintTemplateSample1() {
        return new FingerprintTemplate()
            .id("id1")
            .templateVersion("templateVersion1")
            .originalImageMime("originalImageMime1")
            .originalImageExtension("originalImageExtension1");
    }

    public static FingerprintTemplate getFingerprintTemplateSample2() {
        return new FingerprintTemplate()
            .id("id2")
            .templateVersion("templateVersion2")
            .originalImageMime("originalImageMime2")
            .originalImageExtension("originalImageExtension2");
    }

    public static FingerprintTemplate getFingerprintTemplateRandomSampleGenerator() {
        return new FingerprintTemplate()
            .id(UUID.randomUUID().toString())
            .templateVersion(UUID.randomUUID().toString())
            .originalImageMime(UUID.randomUUID().toString())
            .originalImageExtension(UUID.randomUUID().toString());
    }
}
