package ir.saha.app.repository;

import ir.saha.app.domain.Morkhasi;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Morkhasi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MorkhasiRepository extends JpaRepository<Morkhasi, Long> {
}
