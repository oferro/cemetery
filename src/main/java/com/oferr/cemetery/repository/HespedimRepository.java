package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.Hespedim;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Hespedim entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HespedimRepository extends JpaRepository<Hespedim, Long> {
}
