package com.oferr.cemetery.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.oferr.cemetery.domain.enumeration.MediaType;

/**
 * A Media.
 */
@Entity
@Table(name = "media")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Media implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * 1=Pic, 2=Video, 3=Sound
     */
    @NotNull
    @ApiModelProperty(value = "1=Pic, 2=Video, 3=Sound", required = true)
    @Enumerated(EnumType.STRING)
    @Column(name = "m_type", nullable = false)
    private MediaType mType;

    @Column(name = "m_description")
    private String mDescription;

    @Column(name = "m_date")
    private LocalDate mDate;

    @NotNull
    @Column(name = "m_link", nullable = false)
    private String mLink;

    @Column(name = "m_not_active")
    private Boolean mNotActive;

    @ManyToOne
    @JsonIgnoreProperties(value = "dMedias", allowSetters = true)
    private Desist desist;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MediaType getmType() {
        return mType;
    }

    public Media mType(MediaType mType) {
        this.mType = mType;
        return this;
    }

    public void setmType(MediaType mType) {
        this.mType = mType;
    }

    public String getmDescription() {
        return mDescription;
    }

    public Media mDescription(String mDescription) {
        this.mDescription = mDescription;
        return this;
    }

    public void setmDescription(String mDescription) {
        this.mDescription = mDescription;
    }

    public LocalDate getmDate() {
        return mDate;
    }

    public Media mDate(LocalDate mDate) {
        this.mDate = mDate;
        return this;
    }

    public void setmDate(LocalDate mDate) {
        this.mDate = mDate;
    }

    public String getmLink() {
        return mLink;
    }

    public Media mLink(String mLink) {
        this.mLink = mLink;
        return this;
    }

    public void setmLink(String mLink) {
        this.mLink = mLink;
    }

    public Boolean ismNotActive() {
        return mNotActive;
    }

    public Media mNotActive(Boolean mNotActive) {
        this.mNotActive = mNotActive;
        return this;
    }

    public void setmNotActive(Boolean mNotActive) {
        this.mNotActive = mNotActive;
    }

    public Desist getDesist() {
        return desist;
    }

    public Media desist(Desist desist) {
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
        if (!(o instanceof Media)) {
            return false;
        }
        return id != null && id.equals(((Media) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Media{" +
            "id=" + getId() +
            ", mType='" + getmType() + "'" +
            ", mDescription='" + getmDescription() + "'" +
            ", mDate='" + getmDate() + "'" +
            ", mLink='" + getmLink() + "'" +
            ", mNotActive='" + ismNotActive() + "'" +
            "}";
    }
}
