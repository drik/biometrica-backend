package com.zelix.biometrica.domain;

import com.zelix.biometrica.domain.enumeration.FingerName;
import com.zelix.biometrica.domain.enumeration.HandName;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Fingerprint.
 */
@Document(collection = "fingerprint")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Fingerprint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("uuid")
    private UUID uuid;

    @NotNull
    @Field("finger_name")
    private FingerName fingerName;

    @NotNull
    @Field("hand_name")
    private HandName handName;

    @DBRef
    @Field("template")
    private FingerprintTemplate template;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Fingerprint id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public Fingerprint uuid(UUID uuid) {
        this.setUuid(uuid);
        return this;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public FingerName getFingerName() {
        return this.fingerName;
    }

    public Fingerprint fingerName(FingerName fingerName) {
        this.setFingerName(fingerName);
        return this;
    }

    public void setFingerName(FingerName fingerName) {
        this.fingerName = fingerName;
    }

    public HandName getHandName() {
        return this.handName;
    }

    public Fingerprint handName(HandName handName) {
        this.setHandName(handName);
        return this;
    }

    public void setHandName(HandName handName) {
        this.handName = handName;
    }

    public FingerprintTemplate getTemplate() {
        return this.template;
    }

    public void setTemplate(FingerprintTemplate fingerprintTemplate) {
        this.template = fingerprintTemplate;
    }

    public Fingerprint template(FingerprintTemplate fingerprintTemplate) {
        this.setTemplate(fingerprintTemplate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fingerprint)) {
            return false;
        }
        return getId() != null && getId().equals(((Fingerprint) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fingerprint{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", fingerName='" + getFingerName() + "'" +
            ", handName='" + getHandName() + "'" +
            "}";
    }
}
