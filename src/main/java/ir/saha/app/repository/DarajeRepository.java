package ir.saha.app.repository;

import ir.saha.app.domain.Daraje;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Daraje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DarajeRepository extends JpaRepository<Daraje, Long> {
}
