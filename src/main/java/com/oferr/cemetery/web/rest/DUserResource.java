package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.domain.DUser;
import com.oferr.cemetery.repository.DUserRepository;
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
 * REST controller for managing {@link com.oferr.cemetery.domain.DUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DUserResource {

    private final Logger log = LoggerFactory.getLogger(DUserResource.class);

    private static final String ENTITY_NAME = "dUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DUserRepository dUserRepository;

    public DUserResource(DUserRepository dUserRepository) {
        this.dUserRepository = dUserRepository;
    }

    /**
     * {@code POST  /d-users} : Create a new dUser.
     *
     * @param dUser the dUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dUser, or with status {@code 400 (Bad Request)} if the dUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/d-users")
    public ResponseEntity<DUser> createDUser(@Valid @RequestBody DUser dUser) throws URISyntaxException {
        log.debug("REST request to save DUser : {}", dUser);
        if (dUser.getId() != null) {
            throw new BadRequestAlertException("A new dUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DUser result = dUserRepository.save(dUser);
        return ResponseEntity.created(new URI("/api/d-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /d-users} : Updates an existing dUser.
     *
     * @param dUser the dUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dUser,
     * or with status {@code 400 (Bad Request)} if the dUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/d-users")
    public ResponseEntity<DUser> updateDUser(@Valid @RequestBody DUser dUser) throws URISyntaxException {
        log.debug("REST request to update DUser : {}", dUser);
        if (dUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DUser result = dUserRepository.save(dUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /d-users} : get all the dUsers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dUsers in body.
     */
    @GetMapping("/d-users")
    public ResponseEntity<List<DUser>> getAllDUsers(Pageable pageable) {
        log.debug("REST request to get a page of DUsers");
        Page<DUser> page = dUserRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /d-users/:id} : get the "id" dUser.
     *
     * @param id the id of the dUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/d-users/{id}")
    public ResponseEntity<DUser> getDUser(@PathVariable Long id) {
        log.debug("REST request to get DUser : {}", id);
        Optional<DUser> dUser = dUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dUser);
    }

    /**
     * {@code DELETE  /d-users/:id} : delete the "id" dUser.
     *
     * @param id the id of the dUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/d-users/{id}")
    public ResponseEntity<Void> deleteDUser(@PathVariable Long id) {
        log.debug("REST request to delete DUser : {}", id);
        dUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
