package ir.saha.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Mantaghe.
 */
@Entity
@Table(name = "mantaghe")
public class Mantaghe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "mantaghe")
    private Set<Yegan> mantaghes = new HashSet<>();

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

    public Mantaghe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Yegan> getMantaghes() {
        return mantaghes;
    }

    public Mantaghe mantaghes(Set<Yegan> yegans) {
        this.mantaghes = yegans;
        return this;
    }

    public Mantaghe addMantaghe(Yegan yegan) {
        this.mantaghes.add(yegan);
        yegan.setMantaghe(this);
        return this;
    }

    public Mantaghe removeMantaghe(Yegan yegan) {
        this.mantaghes.remove(yegan);
        yegan.setMantaghe(null);
        return this;
    }

    public void setMantaghes(Set<Yegan> yegans) {
        this.mantaghes = yegans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mantaghe)) {
            return false;
        }
        return id != null && id.equals(((Mantaghe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mantaghe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
