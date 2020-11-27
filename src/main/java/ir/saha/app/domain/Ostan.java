package ir.saha.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ostan.
 */
@Entity
@Table(name = "ostan")
public class Ostan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "ostan")
    private Set<Yegan> ostans = new HashSet<>();

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

    public Ostan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Yegan> getOstans() {
        return ostans;
    }

    public Ostan ostans(Set<Yegan> yegans) {
        this.ostans = yegans;
        return this;
    }

    public Ostan addOstan(Yegan yegan) {
        this.ostans.add(yegan);
        yegan.setOstan(this);
        return this;
    }

    public Ostan removeOstan(Yegan yegan) {
        this.ostans.remove(yegan);
        yegan.setOstan(null);
        return this;
    }

    public void setOstans(Set<Yegan> yegans) {
        this.ostans = yegans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ostan)) {
            return false;
        }
        return id != null && id.equals(((Ostan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ostan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
