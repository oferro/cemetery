package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.domain.Desist;
import com.oferr.cemetery.repository.DesistRepository;
import com.oferr.cemetery.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.oferr.cemetery.domain.Desist}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DesistResource {

    private final Logger log = LoggerFactory.getLogger(DesistResource.class);

    private static final String ENTITY_NAME = "desist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DesistRepository desistRepository;

    public DesistResource(DesistRepository desistRepository) {
        this.desistRepository = desistRepository;
    }

    /**
     * {@code POST  /desists} : Create a new desist.
     *
     * @param desist the desist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new desist, or with status {@code 400 (Bad Request)} if the desist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/desists")
    public ResponseEntity<Desist> createDesist(@Valid @RequestBody Desist desist) throws URISyntaxException {
        log.debug("REST request to save Desist : {}", desist);
        if (desist.getId() != null) {
            throw new BadRequestAlertException("A new desist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Desist result = desistRepository.save(desist);
        return ResponseEntity.created(new URI("/api/desists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /desists} : Updates an existing desist.
     *
     * @param desist the desist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated desist,
     * or with status {@code 400 (Bad Request)} if the desist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the desist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/desists")
    public ResponseEntity<Desist> updateDesist(@Valid @RequestBody Desist desist) throws URISyntaxException {
        log.debug("REST request to update Desist : {}", desist);
        if (desist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Desist result = desistRepository.save(desist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, desist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /desists} : get all the desists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of desists in body.
     */
    @GetMapping("/desists")
    public List<Desist> getAllDesists() {
        log.debug("REST request to get all Desists");
        return desistRepository.findAll();
    }

    /**
     * {@code GET  /desists/:id} : get the "id" desist.
     *
     * @param id the id of the desist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the desist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/desists/{id}")
    public ResponseEntity<Desist> getDesist(@PathVariable Long id) {
        log.debug("REST request to get Desist : {}", id);
        Optional<Desist> desist = desistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(desist);
    }

    /**
     * {@code DELETE  /desists/:id} : delete the "id" desist.
     *
     * @param id the id of the desist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/desists/{id}")
    public ResponseEntity<Void> deleteDesist(@PathVariable Long id) {
        log.debug("REST request to delete Desist : {}", id);
        desistRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
