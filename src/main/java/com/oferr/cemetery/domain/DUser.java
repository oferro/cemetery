package com.oferr.cemetery.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DUser.
 */
@Entity
@Table(name = "d_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "u_fore_name", nullable = false)
    private String uForeName;

    @NotNull
    @Column(name = "u_sor_name", nullable = false)
    private String uSorName;

    @Column(name = "u_phone")
    private String uPhone;

    @NotNull
    @Column(name = "u_email", nullable = false)
    private String uEmail;

    @ManyToMany(mappedBy = "dUsers")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Desist> dDesists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getuForeName() {
        return uForeName;
    }

    public DUser uForeName(String uForeName) {
        this.uForeName = uForeName;
        return this;
    }

    public void setuForeName(String uForeName) {
        this.uForeName = uForeName;
    }

    public String getuSorName() {
        return uSorName;
    }

    public DUser uSorName(String uSorName) {
        this.uSorName = uSorName;
        return this;
    }

    public void setuSorName(String uSorName) {
        this.uSorName = uSorName;
    }

    public String getuPhone() {
        return uPhone;
    }

    public DUser uPhone(String uPhone) {
        this.uPhone = uPhone;
        return this;
    }

    public void setuPhone(String uPhone) {
        this.uPhone = uPhone;
    }

    public String getuEmail() {
        return uEmail;
    }

    public DUser uEmail(String uEmail) {
        this.uEmail = uEmail;
        return this;
    }

    public void setuEmail(String uEmail) {
        this.uEmail = uEmail;
    }

    public Set<Desist> getDDesists() {
        return dDesists;
    }

    public DUser dDesists(Set<Desist> desists) {
        this.dDesists = desists;
        return this;
    }

    public DUser addDDesist(Desist desist) {
        this.dDesists.add(desist);
        desist.getDUsers().add(this);
        return this;
    }

    public DUser removeDDesist(Desist desist) {
        this.dDesists.remove(desist);
        desist.getDUsers().remove(this);
        return this;
    }

    public void setDDesists(Set<Desist> desists) {
        this.dDesists = desists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DUser)) {
            return false;
        }
        return id != null && id.equals(((DUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DUser{" +
            "id=" + getId() +
            ", uForeName='" + getuForeName() + "'" +
            ", uSorName='" + getuSorName() + "'" +
            ", uPhone='" + getuPhone() + "'" +
            ", uEmail='" + getuEmail() + "'" +
            "}";
    }
}
