package ir.saha.app.repository;

import ir.saha.app.domain.NirooCode;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NirooCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NirooCodeRepository extends JpaRepository<NirooCode, Long> {
}
