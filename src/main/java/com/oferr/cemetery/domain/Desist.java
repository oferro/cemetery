package com.oferr.cemetery.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Desist.
 */
@Entity
@Table(name = "desist")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Desist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "d_sor_name", nullable = false)
    private String dSorName;

    @NotNull
    @Column(name = "d_fore_name", nullable = false)
    private String dForeName;

    @Lob
    @Column(name = "d_pic")
    private byte[] dPic;

    @Column(name = "d_pic_content_type")
    private String dPicContentType;

    @Column(name = "d_berth_place")
    private String dBerthPlace;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "d_career")
    private String dCareer;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "d_education")
    private String dEducation;

    @Column(name = "d_date_born")
    private LocalDate dDateBorn;

    @Column(name = "d_date_dead")
    private LocalDate dDateDead;

    @Column(name = "d_not_active")
    private Boolean dNotActive;

//    @OneToMany(mappedBy = "desist")
//    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
//    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "desist")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<GestBook> dGestBooks = new HashSet<>();

    @OneToMany(mappedBy = "desist")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Candle> dCandels = new HashSet<>();

    @OneToMany(mappedBy = "desist")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Hespedim> dHespedims = new HashSet<>();

    @OneToMany(mappedBy = "desist")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Media> dMedias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getdSorName() {
        return dSorName;
    }

    public Desist dSorName(String dSorName) {
        this.dSorName = dSorName;
        return this;
    }

    public void setdSorName(String dSorName) {
        this.dSorName = dSorName;
    }

    public String getdForeName() {
        return dForeName;
    }

    public Desist dForeName(String dForeName) {
        this.dForeName = dForeName;
        return this;
    }

    public void setdForeName(String dForeName) {
        this.dForeName = dForeName;
    }

    public byte[] getdPic() {
        return dPic;
    }

    public Desist dPic(byte[] dPic) {
        this.dPic = dPic;
        return this;
    }

    public void setdPic(byte[] dPic) {
        this.dPic = dPic;
    }

    public String getdPicContentType() {
        return dPicContentType;
    }

    public Desist dPicContentType(String dPicContentType) {
        this.dPicContentType = dPicContentType;
        return this;
    }

    public void setdPicContentType(String dPicContentType) {
        this.dPicContentType = dPicContentType;
    }

    public String getdBerthPlace() {
        return dBerthPlace;
    }

    public Desist dBerthPlace(String dBerthPlace) {
        this.dBerthPlace = dBerthPlace;
        return this;
    }

    public void setdBerthPlace(String dBerthPlace) {
        this.dBerthPlace = dBerthPlace;
    }

    public String getdCareer() {
        return dCareer;
    }

    public Desist dCareer(String dCareer) {
        this.dCareer = dCareer;
        return this;
    }

    public void setdCareer(String dCareer) {
        this.dCareer = dCareer;
    }

    public String getdEducation() {
        return dEducation;
    }

    public Desist dEducation(String dEducation) {
        this.dEducation = dEducation;
        return this;
    }

    public void setdEducation(String dEducation) {
        this.dEducation = dEducation;
    }

    public LocalDate getdDateBorn() {
        return dDateBorn;
    }

    public Desist dDateBorn(LocalDate dDateBorn) {
        this.dDateBorn = dDateBorn;
        return this;
    }

    public void setdDateBorn(LocalDate dDateBorn) {
        this.dDateBorn = dDateBorn;
    }

    public LocalDate getdDateDead() {
        return dDateDead;
    }

    public Desist dDateDead(LocalDate dDateDead) {
        this.dDateDead = dDateDead;
        return this;
    }

    public void setdDateDead(LocalDate dDateDead) {
        this.dDateDead = dDateDead;
    }

    public Boolean isdNotActive() {
        return dNotActive;
    }

    public Desist dNotActive(Boolean dNotActive) {
        this.dNotActive = dNotActive;
        return this;
    }

    public void setdNotActive(Boolean dNotActive) {
        this.dNotActive = dNotActive;
    }

//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public Desist users(Set<User> users) {
//        this.users = users;
//        return this;
//    }
//
//    public Desist addUser(User user) {
//        this.users.add(user);
//        user.setDesist(this);
//        return this;
//    }
//
//    public Desist removeUser(User user) {
//        this.users.remove(user);
//        user.setDesist(null);
//        return this;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }

    public Set<GestBook> getDGestBooks() {
        return dGestBooks;
    }

    public Desist dGestBooks(Set<GestBook> gestBooks) {
        this.dGestBooks = gestBooks;
        return this;
    }

    public Desist addDGestBook(GestBook gestBook) {
        this.dGestBooks.add(gestBook);
        gestBook.setDesist(this);
        return this;
    }

    public Desist removeDGestBook(GestBook gestBook) {
        this.dGestBooks.remove(gestBook);
        gestBook.setDesist(null);
        return this;
    }

    public void setDGestBooks(Set<GestBook> gestBooks) {
        this.dGestBooks = gestBooks;
    }

    public Set<Candle> getDCandels() {
        return dCandels;
    }

    public Desist dCandels(Set<Candle> candles) {
        this.dCandels = candles;
        return this;
    }

    public Desist addDCandel(Candle candle) {
        this.dCandels.add(candle);
        candle.setDesist(this);
        return this;
    }

    public Desist removeDCandel(Candle candle) {
        this.dCandels.remove(candle);
        candle.setDesist(null);
        return this;
    }

    public void setDCandels(Set<Candle> candles) {
        this.dCandels = candles;
    }

    public Set<Hespedim> getDHespedims() {
        return dHespedims;
    }

    public Desist dHespedims(Set<Hespedim> hespedims) {
        this.dHespedims = hespedims;
        return this;
    }

    public Desist addDHespedim(Hespedim hespedim) {
        this.dHespedims.add(hespedim);
        hespedim.setDesist(this);
        return this;
    }

    public Desist removeDHespedim(Hespedim hespedim) {
        this.dHespedims.remove(hespedim);
        hespedim.setDesist(null);
        return this;
    }

    public void setDHespedims(Set<Hespedim> hespedims) {
        this.dHespedims = hespedims;
    }

    public Set<Media> getDMedias() {
        return dMedias;
    }

    public Desist dMedias(Set<Media> media) {
        this.dMedias = media;
        return this;
    }

    public Desist addDMedia(Media media) {
        this.dMedias.add(media);
        media.setDesist(this);
        return this;
    }

    public Desist removeDMedia(Media media) {
        this.dMedias.remove(media);
        media.setDesist(null);
        return this;
    }

    public void setDMedias(Set<Media> media) {
        this.dMedias = media;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Desist)) {
            return false;
        }
        return id != null && id.equals(((Desist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Desist{" +
            "id=" + getId() +
            ", dSorName='" + getdSorName() + "'" +
            ", dForeName='" + getdForeName() + "'" +
            ", dPic='" + getdPic() + "'" +
            ", dPicContentType='" + getdPicContentType() + "'" +
            ", dBerthPlace='" + getdBerthPlace() + "'" +
            ", dCareer='" + getdCareer() + "'" +
            ", dEducation='" + getdEducation() + "'" +
            ", dDateBorn='" + getdDateBorn() + "'" +
            ", dDateDead='" + getdDateDead() + "'" +
            ", dNotActive='" + isdNotActive() + "'" +
            "}";
    }
}
