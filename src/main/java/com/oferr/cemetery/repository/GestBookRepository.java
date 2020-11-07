package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.GestBook;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GestBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GestBookRepository extends JpaRepository<GestBook, Long> {
}
