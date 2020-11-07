package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.DUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DUserRepository extends JpaRepository<DUser, Long> {
}
