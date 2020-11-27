package ir.saha.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A BargeMamooriat.
 */
@Entity
@Table(name = "barge_mamooriat")
public class BargeMamooriat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tarikh_sodoor")
    private Instant tarikhSodoor;

    @ManyToOne
    @JsonIgnoreProperties(value = "bargeMamoorits", allowSetters = true)
    private Karbar karbar;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTarikhSodoor() {
        return tarikhSodoor;
    }

    public BargeMamooriat tarikhSodoor(Instant tarikhSodoor) {
        this.tarikhSodoor = tarikhSodoor;
        return this;
    }

    public void setTarikhSodoor(Instant tarikhSodoor) {
        this.tarikhSodoor = tarikhSodoor;
    }

    public Karbar getKarbar() {
        return karbar;
    }

    public BargeMamooriat karbar(Karbar karbar) {
        this.karbar = karbar;
        return this;
    }

    public void setKarbar(Karbar karbar) {
        this.karbar = karbar;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BargeMamooriat)) {
            return false;
        }
        return id != null && id.equals(((BargeMamooriat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BargeMamooriat{" +
            "id=" + getId() +
            ", tarikhSodoor='" + getTarikhSodoor() + "'" +
            "}";
    }
}
