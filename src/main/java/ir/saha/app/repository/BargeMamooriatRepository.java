package ir.saha.app.repository;

import ir.saha.app.domain.BargeMamooriat;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BargeMamooriat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BargeMamooriatRepository extends JpaRepository<BargeMamooriat, Long> {
}
