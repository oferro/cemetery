package com.oferr.cemetery.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A GestBook.
 */
@Entity
@Table(name = "gest_book")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GestBook implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "b_name", nullable = false)
    private String bName;

    @NotNull
    @Column(name = "b_email", nullable = false)
    private String bEmail;

    @NotNull
    @Column(name = "b_phone", nullable = false)
    private String bPhone;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "b_content")
    private String bContent;

    @Column(name = "b_not_active")
    private Boolean bNotActive;

    @ManyToOne
    @JsonIgnoreProperties(value = "dGestBooks", allowSetters = true)
    private Desist desist;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getbName() {
        return bName;
    }

    public GestBook bName(String bName) {
        this.bName = bName;
        return this;
    }

    public void setbName(String bName) {
        this.bName = bName;
    }

    public String getbEmail() {
        return bEmail;
    }

    public GestBook bEmail(String bEmail) {
        this.bEmail = bEmail;
        return this;
    }

    public void setbEmail(String bEmail) {
        this.bEmail = bEmail;
    }

    public String getbPhone() {
        return bPhone;
    }

    public GestBook bPhone(String bPhone) {
        this.bPhone = bPhone;
        return this;
    }

    public void setbPhone(String bPhone) {
        this.bPhone = bPhone;
    }

    public String getbContent() {
        return bContent;
    }

    public GestBook bContent(String bContent) {
        this.bContent = bContent;
        return this;
    }

    public void setbContent(String bContent) {
        this.bContent = bContent;
    }

    public Boolean isbNotActive() {
        return bNotActive;
    }

    public GestBook bNotActive(Boolean bNotActive) {
        this.bNotActive = bNotActive;
        return this;
    }

    public void setbNotActive(Boolean bNotActive) {
        this.bNotActive = bNotActive;
    }

    public Desist getDesist() {
        return desist;
    }

    public GestBook desist(Desist desist) {
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
        if (!(o instanceof GestBook)) {
            return false;
        }
        return id != null && id.equals(((GestBook) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GestBook{" +
            "id=" + getId() +
            ", bName='" + getbName() + "'" +
            ", bEmail='" + getbEmail() + "'" +
            ", bPhone='" + getbPhone() + "'" +
            ", bContent='" + getbContent() + "'" +
            ", bNotActive='" + isbNotActive() + "'" +
            "}";
    }
}
