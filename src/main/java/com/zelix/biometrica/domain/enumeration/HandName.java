package com.zelix.biometrica.domain.enumeration;

/**
 * The HandName enumeration.
 */
public enum HandName {
    RIGHT_HAND("Right"),
    LEFT_HAND("Left");

    private final String value;

    HandName(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
