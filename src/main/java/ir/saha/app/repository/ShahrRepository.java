package ir.saha.app.repository;

import ir.saha.app.domain.Shahr;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Shahr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShahrRepository extends JpaRepository<Shahr, Long> {
}
