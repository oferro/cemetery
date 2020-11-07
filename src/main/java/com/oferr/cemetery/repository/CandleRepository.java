package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.Candle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Candle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CandleRepository extends JpaRepository<Candle, Long> {
}
