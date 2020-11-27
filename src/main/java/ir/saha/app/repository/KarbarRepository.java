package ir.saha.app.repository;

import ir.saha.app.domain.Karbar;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Karbar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KarbarRepository extends JpaRepository<Karbar, Long> {
}
