package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.domain.Hespedim;
import com.oferr.cemetery.repository.HespedimRepository;
import com.oferr.cemetery.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.oferr.cemetery.domain.Hespedim}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HespedimResource {

    private final Logger log = LoggerFactory.getLogger(HespedimResource.class);

    private static final String ENTITY_NAME = "hespedim";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HespedimRepository hespedimRepository;

    public HespedimResource(HespedimRepository hespedimRepository) {
        this.hespedimRepository = hespedimRepository;
    }

    /**
     * {@code POST  /hespedims} : Create a new hespedim.
     *
     * @param hespedim the hespedim to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hespedim, or with status {@code 400 (Bad Request)} if the hespedim has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/hespedims")
    public ResponseEntity<Hespedim> createHespedim(@Valid @RequestBody Hespedim hespedim) throws URISyntaxException {
        log.debug("REST request to save Hespedim : {}", hespedim);
        if (hespedim.getId() != null) {
            throw new BadRequestAlertException("A new hespedim cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hespedim result = hespedimRepository.save(hespedim);
        return ResponseEntity.created(new URI("/api/hespedims/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /hespedims} : Updates an existing hespedim.
     *
     * @param hespedim the hespedim to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hespedim,
     * or with status {@code 400 (Bad Request)} if the hespedim is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hespedim couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/hespedims")
    public ResponseEntity<Hespedim> updateHespedim(@Valid @RequestBody Hespedim hespedim) throws URISyntaxException {
        log.debug("REST request to update Hespedim : {}", hespedim);
        if (hespedim.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Hespedim result = hespedimRepository.save(hespedim);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hespedim.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /hespedims} : get all the hespedims.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hespedims in body.
     */
    @GetMapping("/hespedims")
    public ResponseEntity<List<Hespedim>> getAllHespedims(Pageable pageable) {
        log.debug("REST request to get a page of Hespedims");
        Page<Hespedim> page = hespedimRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /hespedims/:id} : get the "id" hespedim.
     *
     * @param id the id of the hespedim to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hespedim, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/hespedims/{id}")
    public ResponseEntity<Hespedim> getHespedim(@PathVariable Long id) {
        log.debug("REST request to get Hespedim : {}", id);
        Optional<Hespedim> hespedim = hespedimRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hespedim);
    }

    /**
     * {@code DELETE  /hespedims/:id} : delete the "id" hespedim.
     *
     * @param id the id of the hespedim to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/hespedims/{id}")
    public ResponseEntity<Void> deleteHespedim(@PathVariable Long id) {
        log.debug("REST request to delete Hespedim : {}", id);
        hespedimRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
