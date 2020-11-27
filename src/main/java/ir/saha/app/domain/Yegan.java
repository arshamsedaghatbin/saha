package ir.saha.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Yegan.
 */
@Entity
@Table(name = "yegan")
public class Yegan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "yegan")
    private Set<Yegan> zirYegans = new HashSet<>();

    @OneToMany(mappedBy = "yegan")
    private Set<Karbar> karbars = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "yegans", allowSetters = true)
    private NirooCode nirooCode;

    @ManyToOne
    @JsonIgnoreProperties(value = "zirYegans", allowSetters = true)
    private Yegan yegan;

    @ManyToOne
    @JsonIgnoreProperties(value = "yegans", allowSetters = true)
    private Shahr shahr;

    @ManyToOne
    @JsonIgnoreProperties(value = "mantaghes", allowSetters = true)
    private Mantaghe mantaghe;

    @ManyToOne
    @JsonIgnoreProperties(value = "ostans", allowSetters = true)
    private Ostan ostan;

    @ManyToOne
    @JsonIgnoreProperties(value = "yegans", allowSetters = true)
    private YeganType yeganType;

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

    public Yegan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public Yegan code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Yegan> getZirYegans() {
        return zirYegans;
    }

    public Yegan zirYegans(Set<Yegan> yegans) {
        this.zirYegans = yegans;
        return this;
    }

    public Yegan addZirYegan(Yegan yegan) {
        this.zirYegans.add(yegan);
        yegan.setYegan(this);
        return this;
    }

    public Yegan removeZirYegan(Yegan yegan) {
        this.zirYegans.remove(yegan);
        yegan.setYegan(null);
        return this;
    }

    public void setZirYegans(Set<Yegan> yegans) {
        this.zirYegans = yegans;
    }

    public Set<Karbar> getKarbars() {
        return karbars;
    }

    public Yegan karbars(Set<Karbar> karbars) {
        this.karbars = karbars;
        return this;
    }

    public Yegan addKarbar(Karbar karbar) {
        this.karbars.add(karbar);
        karbar.setYegan(this);
        return this;
    }

    public Yegan removeKarbar(Karbar karbar) {
        this.karbars.remove(karbar);
        karbar.setYegan(null);
        return this;
    }

    public void setKarbars(Set<Karbar> karbars) {
        this.karbars = karbars;
    }

    public NirooCode getNirooCode() {
        return nirooCode;
    }

    public Yegan nirooCode(NirooCode nirooCode) {
        this.nirooCode = nirooCode;
        return this;
    }

    public void setNirooCode(NirooCode nirooCode) {
        this.nirooCode = nirooCode;
    }

    public Yegan getYegan() {
        return yegan;
    }

    public Yegan yegan(Yegan yegan) {
        this.yegan = yegan;
        return this;
    }

    public void setYegan(Yegan yegan) {
        this.yegan = yegan;
    }

    public Shahr getShahr() {
        return shahr;
    }

    public Yegan shahr(Shahr shahr) {
        this.shahr = shahr;
        return this;
    }

    public void setShahr(Shahr shahr) {
        this.shahr = shahr;
    }

    public Mantaghe getMantaghe() {
        return mantaghe;
    }

    public Yegan mantaghe(Mantaghe mantaghe) {
        this.mantaghe = mantaghe;
        return this;
    }

    public void setMantaghe(Mantaghe mantaghe) {
        this.mantaghe = mantaghe;
    }

    public Ostan getOstan() {
        return ostan;
    }

    public Yegan ostan(Ostan ostan) {
        this.ostan = ostan;
        return this;
    }

    public void setOstan(Ostan ostan) {
        this.ostan = ostan;
    }

    public YeganType getYeganType() {
        return yeganType;
    }

    public Yegan yeganType(YeganType yeganType) {
        this.yeganType = yeganType;
        return this;
    }

    public void setYeganType(YeganType yeganType) {
        this.yeganType = yeganType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Yegan)) {
            return false;
        }
        return id != null && id.equals(((Yegan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Yegan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
