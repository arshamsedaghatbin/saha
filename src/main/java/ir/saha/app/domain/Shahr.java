package ir.saha.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Shahr.
 */
@Entity
@Table(name = "shahr")
public class Shahr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "zarib_abo_hava")
    private Integer zaribAboHava;

    @Column(name = "zarib_tashiat")
    private Integer zaribTashiat;

    @Column(name = "masafat_ta_markaz")
    private Integer masafatTaMarkaz;

    @OneToMany(mappedBy = "shahr")
    private Set<Yegan> yegans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Shahr name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getZaribAboHava() {
        return zaribAboHava;
    }

    public Shahr zaribAboHava(Integer zaribAboHava) {
        this.zaribAboHava = zaribAboHava;
        return this;
    }

    public void setZaribAboHava(Integer zaribAboHava) {
        this.zaribAboHava = zaribAboHava;
    }

    public Integer getZaribTashiat() {
        return zaribTashiat;
    }

    public Shahr zaribTashiat(Integer zaribTashiat) {
        this.zaribTashiat = zaribTashiat;
        return this;
    }

    public void setZaribTashiat(Integer zaribTashiat) {
        this.zaribTashiat = zaribTashiat;
    }

    public Integer getMasafatTaMarkaz() {
        return masafatTaMarkaz;
    }

    public Shahr masafatTaMarkaz(Integer masafatTaMarkaz) {
        this.masafatTaMarkaz = masafatTaMarkaz;
        return this;
    }

    public void setMasafatTaMarkaz(Integer masafatTaMarkaz) {
        this.masafatTaMarkaz = masafatTaMarkaz;
    }

    public Set<Yegan> getYegans() {
        return yegans;
    }

    public Shahr yegans(Set<Yegan> yegans) {
        this.yegans = yegans;
        return this;
    }

    public Shahr addYegan(Yegan yegan) {
        this.yegans.add(yegan);
        yegan.setShahr(this);
        return this;
    }

    public Shahr removeYegan(Yegan yegan) {
        this.yegans.remove(yegan);
        yegan.setShahr(null);
        return this;
    }

    public void setYegans(Set<Yegan> yegans) {
        this.yegans = yegans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Shahr)) {
            return false;
        }
        return id != null && id.equals(((Shahr) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Shahr{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", zaribAboHava=" + getZaribAboHava() +
            ", zaribTashiat=" + getZaribTashiat() +
            ", masafatTaMarkaz=" + getMasafatTaMarkaz() +
            "}";
    }
}
