package com.oferr.cemetery.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Candle.
 */
@Entity
@Table(name = "candle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Candle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "c_name", nullable = false)
    private String cName;

    @NotNull
    @Column(name = "c_email", nullable = false)
    private String cEmail;

    @NotNull
    @Column(name = "c_phone", nullable = false)
    private String cPhone;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "c_content")
    private String cContent;

    @Column(name = "c_not_active")
    private Boolean cNotActive;

    @ManyToOne
    @JsonIgnoreProperties(value = "dCandels", allowSetters = true)
    private Desist desist;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getcName() {
        return cName;
    }

    public Candle cName(String cName) {
        this.cName = cName;
        return this;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public String getcEmail() {
        return cEmail;
    }

    public Candle cEmail(String cEmail) {
        this.cEmail = cEmail;
        return this;
    }

    public void setcEmail(String cEmail) {
        this.cEmail = cEmail;
    }

    public String getcPhone() {
        return cPhone;
    }

    public Candle cPhone(String cPhone) {
        this.cPhone = cPhone;
        return this;
    }

    public void setcPhone(String cPhone) {
        this.cPhone = cPhone;
    }

    public String getcContent() {
        return cContent;
    }

    public Candle cContent(String cContent) {
        this.cContent = cContent;
        return this;
    }

    public void setcContent(String cContent) {
        this.cContent = cContent;
    }

    public Boolean iscNotActive() {
        return cNotActive;
    }

    public Candle cNotActive(Boolean cNotActive) {
        this.cNotActive = cNotActive;
        return this;
    }

    public void setcNotActive(Boolean cNotActive) {
        this.cNotActive = cNotActive;
    }

    public Desist getDesist() {
        return desist;
    }

    public Candle desist(Desist desist) {
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
        if (!(o instanceof Candle)) {
            return false;
        }
        return id != null && id.equals(((Candle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Candle{" +
            "id=" + getId() +
            ", cName='" + getcName() + "'" +
            ", cEmail='" + getcEmail() + "'" +
            ", cPhone='" + getcPhone() + "'" +
            ", cContent='" + getcContent() + "'" +
            ", cNotActive='" + iscNotActive() + "'" +
            "}";
    }
}
