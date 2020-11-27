package ir.saha.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Karbar.
 */
@Entity
@Table(name = "karbar")
public class Karbar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "onvan_shoghli")
    private String onvanShoghli;

    @Column(name = "code_perseneli")
    private String codePerseneli;

    @Column(name = "bezaneshate")
    private Boolean bezaneshate;

    @Column(name = "sazmani")
    private Boolean sazmani;

    @Column(name = "tarikh_bazneshastegi")
    private Instant tarikhBazneshastegi;

    @OneToMany(mappedBy = "karbar")
    private Set<Morkhasi> morkhasis = new HashSet<>();

    @OneToMany(mappedBy = "karbar")
    private Set<Dore> dores = new HashSet<>();

    @OneToMany(mappedBy = "karbar")
    private Set<Negahbani> negahbanis = new HashSet<>();

    @OneToMany(mappedBy = "karbar")
    private Set<BargeMamooriat> bargeMamoorits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "karbars", allowSetters = true)
    private Yegan yegan;

    @ManyToOne
    @JsonIgnoreProperties(value = "karbars", allowSetters = true)
    private YeganCode yeganCode;

    @ManyToOne
    @JsonIgnoreProperties(value = "karbars", allowSetters = true)
    private Daraje daraje;

    @ManyToOne
    @JsonIgnoreProperties(value = "karbars", allowSetters = true)
    private NirooCode nirooCode;

    @ManyToOne
    @JsonIgnoreProperties(value = "karbars", allowSetters = true)
    private Semat semat;

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

    public Karbar name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOnvanShoghli() {
        return onvanShoghli;
    }

    public Karbar onvanShoghli(String onvanShoghli) {
        this.onvanShoghli = onvanShoghli;
        return this;
    }

    public void setOnvanShoghli(String onvanShoghli) {
        this.onvanShoghli = onvanShoghli;
    }

    public String getCodePerseneli() {
        return codePerseneli;
    }

    public Karbar codePerseneli(String codePerseneli) {
        this.codePerseneli = codePerseneli;
        return this;
    }

    public void setCodePerseneli(String codePerseneli) {
        this.codePerseneli = codePerseneli;
    }

    public Boolean isBezaneshate() {
        return bezaneshate;
    }

    public Karbar bezaneshate(Boolean bezaneshate) {
        this.bezaneshate = bezaneshate;
        return this;
    }

    public void setBezaneshate(Boolean bezaneshate) {
        this.bezaneshate = bezaneshate;
    }

    public Boolean isSazmani() {
        return sazmani;
    }

    public Karbar sazmani(Boolean sazmani) {
        this.sazmani = sazmani;
        return this;
    }

    public void setSazmani(Boolean sazmani) {
        this.sazmani = sazmani;
    }

    public Instant getTarikhBazneshastegi() {
        return tarikhBazneshastegi;
    }

    public Karbar tarikhBazneshastegi(Instant tarikhBazneshastegi) {
        this.tarikhBazneshastegi = tarikhBazneshastegi;
        return this;
    }

    public void setTarikhBazneshastegi(Instant tarikhBazneshastegi) {
        this.tarikhBazneshastegi = tarikhBazneshastegi;
    }

    public Set<Morkhasi> getMorkhasis() {
        return morkhasis;
    }

    public Karbar morkhasis(Set<Morkhasi> morkhasis) {
        this.morkhasis = morkhasis;
        return this;
    }

    public Karbar addMorkhasi(Morkhasi morkhasi) {
        this.morkhasis.add(morkhasi);
        morkhasi.setKarbar(this);
        return this;
    }

    public Karbar removeMorkhasi(Morkhasi morkhasi) {
        this.morkhasis.remove(morkhasi);
        morkhasi.setKarbar(null);
        return this;
    }

    public void setMorkhasis(Set<Morkhasi> morkhasis) {
        this.morkhasis = morkhasis;
    }

    public Set<Dore> getDores() {
        return dores;
    }

    public Karbar dores(Set<Dore> dores) {
        this.dores = dores;
        return this;
    }

    public Karbar addDore(Dore dore) {
        this.dores.add(dore);
        dore.setKarbar(this);
        return this;
    }

    public Karbar removeDore(Dore dore) {
        this.dores.remove(dore);
        dore.setKarbar(null);
        return this;
    }

    public void setDores(Set<Dore> dores) {
        this.dores = dores;
    }

    public Set<Negahbani> getNegahbanis() {
        return negahbanis;
    }

    public Karbar negahbanis(Set<Negahbani> negahbanis) {
        this.negahbanis = negahbanis;
        return this;
    }

    public Karbar addNegahbani(Negahbani negahbani) {
        this.negahbanis.add(negahbani);
        negahbani.setKarbar(this);
        return this;
    }

    public Karbar removeNegahbani(Negahbani negahbani) {
        this.negahbanis.remove(negahbani);
        negahbani.setKarbar(null);
        return this;
    }

    public void setNegahbanis(Set<Negahbani> negahbanis) {
        this.negahbanis = negahbanis;
    }

    public Set<BargeMamooriat> getBargeMamoorits() {
        return bargeMamoorits;
    }

    public Karbar bargeMamoorits(Set<BargeMamooriat> bargeMamooriats) {
        this.bargeMamoorits = bargeMamooriats;
        return this;
    }

    public Karbar addBargeMamoorit(BargeMamooriat bargeMamooriat) {
        this.bargeMamoorits.add(bargeMamooriat);
        bargeMamooriat.setKarbar(this);
        return this;
    }

    public Karbar removeBargeMamoorit(BargeMamooriat bargeMamooriat) {
        this.bargeMamoorits.remove(bargeMamooriat);
        bargeMamooriat.setKarbar(null);
        return this;
    }

    public void setBargeMamoorits(Set<BargeMamooriat> bargeMamooriats) {
        this.bargeMamoorits = bargeMamooriats;
    }

    public Yegan getYegan() {
        return yegan;
    }

    public Karbar yegan(Yegan yegan) {
        this.yegan = yegan;
        return this;
    }

    public void setYegan(Yegan yegan) {
        this.yegan = yegan;
    }

    public YeganCode getYeganCode() {
        return yeganCode;
    }

    public Karbar yeganCode(YeganCode yeganCode) {
        this.yeganCode = yeganCode;
        return this;
    }

    public void setYeganCode(YeganCode yeganCode) {
        this.yeganCode = yeganCode;
    }

    public Daraje getDaraje() {
        return daraje;
    }

    public Karbar daraje(Daraje daraje) {
        this.daraje = daraje;
        return this;
    }

    public void setDaraje(Daraje daraje) {
        this.daraje = daraje;
    }

    public NirooCode getNirooCode() {
        return nirooCode;
    }

    public Karbar nirooCode(NirooCode nirooCode) {
        this.nirooCode = nirooCode;
        return this;
    }

    public void setNirooCode(NirooCode nirooCode) {
        this.nirooCode = nirooCode;
    }

    public Semat getSemat() {
        return semat;
    }

    public Karbar semat(Semat semat) {
        this.semat = semat;
        return this;
    }

    public void setSemat(Semat semat) {
        this.semat = semat;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Karbar)) {
            return false;
        }
        return id != null && id.equals(((Karbar) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Karbar{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", onvanShoghli='" + getOnvanShoghli() + "'" +
            ", codePerseneli='" + getCodePerseneli() + "'" +
            ", bezaneshate='" + isBezaneshate() + "'" +
            ", sazmani='" + isSazmani() + "'" +
            ", tarikhBazneshastegi='" + getTarikhBazneshastegi() + "'" +
            "}";
    }
}
