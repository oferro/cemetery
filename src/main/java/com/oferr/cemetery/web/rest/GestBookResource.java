package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.domain.GestBook;
import com.oferr.cemetery.repository.GestBookRepository;
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
 * REST controller for managing {@link com.oferr.cemetery.domain.GestBook}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GestBookResource {

    private final Logger log = LoggerFactory.getLogger(GestBookResource.class);

    private static final String ENTITY_NAME = "gestBook";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GestBookRepository gestBookRepository;

    public GestBookResource(GestBookRepository gestBookRepository) {
        this.gestBookRepository = gestBookRepository;
    }

    /**
     * {@code POST  /gest-books} : Create a new gestBook.
     *
     * @param gestBook the gestBook to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gestBook, or with status {@code 400 (Bad Request)} if the gestBook has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gest-books")
    public ResponseEntity<GestBook> createGestBook(@Valid @RequestBody GestBook gestBook) throws URISyntaxException {
        log.debug("REST request to save GestBook : {}", gestBook);
        if (gestBook.getId() != null) {
            throw new BadRequestAlertException("A new gestBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GestBook result = gestBookRepository.save(gestBook);
        return ResponseEntity.created(new URI("/api/gest-books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gest-books} : Updates an existing gestBook.
     *
     * @param gestBook the gestBook to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gestBook,
     * or with status {@code 400 (Bad Request)} if the gestBook is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gestBook couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gest-books")
    public ResponseEntity<GestBook> updateGestBook(@Valid @RequestBody GestBook gestBook) throws URISyntaxException {
        log.debug("REST request to update GestBook : {}", gestBook);
        if (gestBook.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GestBook result = gestBookRepository.save(gestBook);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gestBook.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gest-books} : get all the gestBooks.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gestBooks in body.
     */
    @GetMapping("/gest-books")
    public ResponseEntity<List<GestBook>> getAllGestBooks(Pageable pageable) {
        log.debug("REST request to get a page of GestBooks");
        Page<GestBook> page = gestBookRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /gest-books/:id} : get the "id" gestBook.
     *
     * @param id the id of the gestBook to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gestBook, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gest-books/{id}")
    public ResponseEntity<GestBook> getGestBook(@PathVariable Long id) {
        log.debug("REST request to get GestBook : {}", id);
        Optional<GestBook> gestBook = gestBookRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gestBook);
    }

    /**
     * {@code DELETE  /gest-books/:id} : delete the "id" gestBook.
     *
     * @param id the id of the gestBook to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gest-books/{id}")
    public ResponseEntity<Void> deleteGestBook(@PathVariable Long id) {
        log.debug("REST request to delete GestBook : {}", id);
        gestBookRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
