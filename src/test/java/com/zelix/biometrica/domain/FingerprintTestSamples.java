package com.zelix.biometrica.domain;

import java.util.UUID;

public class FingerprintTestSamples {

    public static Fingerprint getFingerprintSample1() {
        return new Fingerprint().id("id1").uuid(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"));
    }

    public static Fingerprint getFingerprintSample2() {
        return new Fingerprint().id("id2").uuid(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"));
    }

    public static Fingerprint getFingerprintRandomSampleGenerator() {
        return new Fingerprint().id(UUID.randomUUID().toString()).uuid(UUID.randomUUID());
    }
}
