package ir.saha.app.repository;

import ir.saha.app.domain.Yegan;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Yegan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YeganRepository extends JpaRepository<Yegan, Long> {
}
