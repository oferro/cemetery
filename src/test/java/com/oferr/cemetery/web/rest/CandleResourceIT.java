package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.Candle;
import com.oferr.cemetery.repository.CandleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CandleResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CandleResourceIT {

    private static final String DEFAULT_C_NAME = "AAAAAAAAAA";
    private static final String UPDATED_C_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_C_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_C_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_C_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_C_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_C_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_C_CONTENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_C_NOT_ACTIVE = false;
    private static final Boolean UPDATED_C_NOT_ACTIVE = true;

    @Autowired
    private CandleRepository candleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCandleMockMvc;

    private Candle candle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candle createEntity(EntityManager em) {
        Candle candle = new Candle()
            .cName(DEFAULT_C_NAME)
            .cEmail(DEFAULT_C_EMAIL)
            .cPhone(DEFAULT_C_PHONE)
            .cContent(DEFAULT_C_CONTENT)
            .cNotActive(DEFAULT_C_NOT_ACTIVE);
        return candle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candle createUpdatedEntity(EntityManager em) {
        Candle candle = new Candle()
            .cName(UPDATED_C_NAME)
            .cEmail(UPDATED_C_EMAIL)
            .cPhone(UPDATED_C_PHONE)
            .cContent(UPDATED_C_CONTENT)
            .cNotActive(UPDATED_C_NOT_ACTIVE);
        return candle;
    }

    @BeforeEach
    public void initTest() {
        candle = createEntity(em);
    }

    @Test
    @Transactional
    public void createCandle() throws Exception {
        int databaseSizeBeforeCreate = candleRepository.findAll().size();
        // Create the Candle
        restCandleMockMvc.perform(post("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isCreated());

        // Validate the Candle in the database
        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeCreate + 1);
        Candle testCandle = candleList.get(candleList.size() - 1);
        assertThat(testCandle.getcName()).isEqualTo(DEFAULT_C_NAME);
        assertThat(testCandle.getcEmail()).isEqualTo(DEFAULT_C_EMAIL);
        assertThat(testCandle.getcPhone()).isEqualTo(DEFAULT_C_PHONE);
        assertThat(testCandle.getcContent()).isEqualTo(DEFAULT_C_CONTENT);
        assertThat(testCandle.iscNotActive()).isEqualTo(DEFAULT_C_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void createCandleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = candleRepository.findAll().size();

        // Create the Candle with an existing ID
        candle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCandleMockMvc.perform(post("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isBadRequest());

        // Validate the Candle in the database
        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkcNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = candleRepository.findAll().size();
        // set the field null
        candle.setcName(null);

        // Create the Candle, which fails.


        restCandleMockMvc.perform(post("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isBadRequest());

        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkcEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = candleRepository.findAll().size();
        // set the field null
        candle.setcEmail(null);

        // Create the Candle, which fails.


        restCandleMockMvc.perform(post("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isBadRequest());

        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkcPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = candleRepository.findAll().size();
        // set the field null
        candle.setcPhone(null);

        // Create the Candle, which fails.


        restCandleMockMvc.perform(post("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isBadRequest());

        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCandles() throws Exception {
        // Initialize the database
        candleRepository.saveAndFlush(candle);

        // Get all the candleList
        restCandleMockMvc.perform(get("/api/candles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candle.getId().intValue())))
            .andExpect(jsonPath("$.[*].cName").value(hasItem(DEFAULT_C_NAME)))
            .andExpect(jsonPath("$.[*].cEmail").value(hasItem(DEFAULT_C_EMAIL)))
            .andExpect(jsonPath("$.[*].cPhone").value(hasItem(DEFAULT_C_PHONE)))
            .andExpect(jsonPath("$.[*].cContent").value(hasItem(DEFAULT_C_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].cNotActive").value(hasItem(DEFAULT_C_NOT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCandle() throws Exception {
        // Initialize the database
        candleRepository.saveAndFlush(candle);

        // Get the candle
        restCandleMockMvc.perform(get("/api/candles/{id}", candle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(candle.getId().intValue()))
            .andExpect(jsonPath("$.cName").value(DEFAULT_C_NAME))
            .andExpect(jsonPath("$.cEmail").value(DEFAULT_C_EMAIL))
            .andExpect(jsonPath("$.cPhone").value(DEFAULT_C_PHONE))
            .andExpect(jsonPath("$.cContent").value(DEFAULT_C_CONTENT.toString()))
            .andExpect(jsonPath("$.cNotActive").value(DEFAULT_C_NOT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCandle() throws Exception {
        // Get the candle
        restCandleMockMvc.perform(get("/api/candles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCandle() throws Exception {
        // Initialize the database
        candleRepository.saveAndFlush(candle);

        int databaseSizeBeforeUpdate = candleRepository.findAll().size();

        // Update the candle
        Candle updatedCandle = candleRepository.findById(candle.getId()).get();
        // Disconnect from session so that the updates on updatedCandle are not directly saved in db
        em.detach(updatedCandle);
        updatedCandle
            .cName(UPDATED_C_NAME)
            .cEmail(UPDATED_C_EMAIL)
            .cPhone(UPDATED_C_PHONE)
            .cContent(UPDATED_C_CONTENT)
            .cNotActive(UPDATED_C_NOT_ACTIVE);

        restCandleMockMvc.perform(put("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCandle)))
            .andExpect(status().isOk());

        // Validate the Candle in the database
        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeUpdate);
        Candle testCandle = candleList.get(candleList.size() - 1);
        assertThat(testCandle.getcName()).isEqualTo(UPDATED_C_NAME);
        assertThat(testCandle.getcEmail()).isEqualTo(UPDATED_C_EMAIL);
        assertThat(testCandle.getcPhone()).isEqualTo(UPDATED_C_PHONE);
        assertThat(testCandle.getcContent()).isEqualTo(UPDATED_C_CONTENT);
        assertThat(testCandle.iscNotActive()).isEqualTo(UPDATED_C_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingCandle() throws Exception {
        int databaseSizeBeforeUpdate = candleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCandleMockMvc.perform(put("/api/candles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candle)))
            .andExpect(status().isBadRequest());

        // Validate the Candle in the database
        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCandle() throws Exception {
        // Initialize the database
        candleRepository.saveAndFlush(candle);

        int databaseSizeBeforeDelete = candleRepository.findAll().size();

        // Delete the candle
        restCandleMockMvc.perform(delete("/api/candles/{id}", candle.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Candle> candleList = candleRepository.findAll();
        assertThat(candleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
