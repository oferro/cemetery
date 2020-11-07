package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.domain.Candle;
import com.oferr.cemetery.repository.CandleRepository;
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
 * REST controller for managing {@link com.oferr.cemetery.domain.Candle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CandleResource {

    private final Logger log = LoggerFactory.getLogger(CandleResource.class);

    private static final String ENTITY_NAME = "candle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CandleRepository candleRepository;

    public CandleResource(CandleRepository candleRepository) {
        this.candleRepository = candleRepository;
    }

    /**
     * {@code POST  /candles} : Create a new candle.
     *
     * @param candle the candle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new candle, or with status {@code 400 (Bad Request)} if the candle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/candles")
    public ResponseEntity<Candle> createCandle(@Valid @RequestBody Candle candle) throws URISyntaxException {
        log.debug("REST request to save Candle : {}", candle);
        if (candle.getId() != null) {
            throw new BadRequestAlertException("A new candle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Candle result = candleRepository.save(candle);
        return ResponseEntity.created(new URI("/api/candles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /candles} : Updates an existing candle.
     *
     * @param candle the candle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated candle,
     * or with status {@code 400 (Bad Request)} if the candle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the candle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/candles")
    public ResponseEntity<Candle> updateCandle(@Valid @RequestBody Candle candle) throws URISyntaxException {
        log.debug("REST request to update Candle : {}", candle);
        if (candle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Candle result = candleRepository.save(candle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, candle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /candles} : get all the candles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of candles in body.
     */
    @GetMapping("/candles")
    public ResponseEntity<List<Candle>> getAllCandles(Pageable pageable) {
        log.debug("REST request to get a page of Candles");
        Page<Candle> page = candleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /candles/:id} : get the "id" candle.
     *
     * @param id the id of the candle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the candle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/candles/{id}")
    public ResponseEntity<Candle> getCandle(@PathVariable Long id) {
        log.debug("REST request to get Candle : {}", id);
        Optional<Candle> candle = candleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(candle);
    }

    /**
     * {@code DELETE  /candles/:id} : delete the "id" candle.
     *
     * @param id the id of the candle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/candles/{id}")
    public ResponseEntity<Void> deleteCandle(@PathVariable Long id) {
        log.debug("REST request to delete Candle : {}", id);
        candleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
