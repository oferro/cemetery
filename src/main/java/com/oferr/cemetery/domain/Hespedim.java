package com.oferr.cemetery.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Hespedim.
 */
@Entity
@Table(name = "hespedim")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Hespedim implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "h_name", nullable = false)
    private String hName;

    @NotNull
    @Column(name = "h_email", nullable = false)
    private String hEmail;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "h_content")
    private String hContent;

    @Column(name = "h_not_active")
    private Boolean hNotActive;

    @ManyToOne
    @JsonIgnoreProperties(value = "dHespedims", allowSetters = true)
    private Desist desist;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String gethName() {
        return hName;
    }

    public Hespedim hName(String hName) {
        this.hName = hName;
        return this;
    }

    public void sethName(String hName) {
        this.hName = hName;
    }

    public String gethEmail() {
        return hEmail;
    }

    public Hespedim hEmail(String hEmail) {
        this.hEmail = hEmail;
        return this;
    }

    public void sethEmail(String hEmail) {
        this.hEmail = hEmail;
    }

    public String gethContent() {
        return hContent;
    }

    public Hespedim hContent(String hContent) {
        this.hContent = hContent;
        return this;
    }

    public void sethContent(String hContent) {
        this.hContent = hContent;
    }

    public Boolean ishNotActive() {
        return hNotActive;
    }

    public Hespedim hNotActive(Boolean hNotActive) {
        this.hNotActive = hNotActive;
        return this;
    }

    public void sethNotActive(Boolean hNotActive) {
        this.hNotActive = hNotActive;
    }

    public Desist getDesist() {
        return desist;
    }

    public Hespedim desist(Desist desist) {
        this.desist = desist;
        return this;
    }

    public void setDesist(Desist desist) {
        this.desist = desist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hespedim)) {
            return false;
        }
        return id != null && id.equals(((Hespedim) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Hespedim{" +
            "id=" + getId() +
            ", hName='" + gethName() + "'" +
            ", hEmail='" + gethEmail() + "'" +
            ", hContent='" + gethContent() + "'" +
            ", hNotActive='" + ishNotActive() + "'" +
            "}";
    }
}
