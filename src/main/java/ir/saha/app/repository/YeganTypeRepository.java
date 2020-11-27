package ir.saha.app.repository;

import ir.saha.app.domain.YeganType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the YeganType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YeganTypeRepository extends JpaRepository<YeganType, Long> {
}
