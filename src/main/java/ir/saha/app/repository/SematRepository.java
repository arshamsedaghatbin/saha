package ir.saha.app.repository;

import ir.saha.app.domain.Semat;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Semat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SematRepository extends JpaRepository<Semat, Long> {
}
