package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.Desist;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Desist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DesistRepository extends JpaRepository<Desist, Long> {
}
