package com.zelix.biometrica.domain.enumeration;

/**
 * The FingerName enumeration.
 */
public enum FingerName {
    PINKY_FINGER("Pinky"),
    RING_FINGER("Ring"),
    MIDDLE_FINGER("Middle"),
    INDEX_FINGER("Index"),
    THUMB_FINGER("Thumb");

    private final String value;

    FingerName(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
