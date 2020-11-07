package com.oferr.cemetery.repository;

import com.oferr.cemetery.domain.Desist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Desist entity.
 */
@Repository
public interface DesistRepository extends JpaRepository<Desist, Long> {

    @Query(value = "select distinct desist from Desist desist left join fetch desist.dUsers",
        countQuery = "select count(distinct desist) from Desist desist")
    Page<Desist> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct desist from Desist desist left join fetch desist.dUsers")
    List<Desist> findAllWithEagerRelationships();

    @Query("select desist from Desist desist left join fetch desist.dUsers where desist.id =:id")
    Optional<Desist> findOneWithEagerRelationships(@Param("id") Long id);
}
