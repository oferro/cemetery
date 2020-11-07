package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.Hespedim;
import com.oferr.cemetery.repository.HespedimRepository;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link HespedimResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HespedimResourceIT {

    private static final String DEFAULT_H_NAME = "AAAAAAAAAA";
    private static final String UPDATED_H_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_H_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_H_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_H_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_H_CONTENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_H_NOT_ACTIVE = false;
    private static final Boolean UPDATED_H_NOT_ACTIVE = true;

    @Autowired
    private HespedimRepository hespedimRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHespedimMockMvc;

    private Hespedim hespedim;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hespedim createEntity(EntityManager em) {
        Hespedim hespedim = new Hespedim()
            .hName(DEFAULT_H_NAME)
            .hEmail(DEFAULT_H_EMAIL)
            .hContent(DEFAULT_H_CONTENT)
            .hNotActive(DEFAULT_H_NOT_ACTIVE);
        return hespedim;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hespedim createUpdatedEntity(EntityManager em) {
        Hespedim hespedim = new Hespedim()
            .hName(UPDATED_H_NAME)
            .hEmail(UPDATED_H_EMAIL)
            .hContent(UPDATED_H_CONTENT)
            .hNotActive(UPDATED_H_NOT_ACTIVE);
        return hespedim;
    }

    @BeforeEach
    public void initTest() {
        hespedim = createEntity(em);
    }

    @Test
    @Transactional
    public void createHespedim() throws Exception {
        int databaseSizeBeforeCreate = hespedimRepository.findAll().size();
        // Create the Hespedim
        restHespedimMockMvc.perform(post("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hespedim)))
            .andExpect(status().isCreated());

        // Validate the Hespedim in the database
        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeCreate + 1);
        Hespedim testHespedim = hespedimList.get(hespedimList.size() - 1);
        assertThat(testHespedim.gethName()).isEqualTo(DEFAULT_H_NAME);
        assertThat(testHespedim.gethEmail()).isEqualTo(DEFAULT_H_EMAIL);
        assertThat(testHespedim.gethContent()).isEqualTo(DEFAULT_H_CONTENT);
        assertThat(testHespedim.ishNotActive()).isEqualTo(DEFAULT_H_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void createHespedimWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hespedimRepository.findAll().size();

        // Create the Hespedim with an existing ID
        hespedim.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHespedimMockMvc.perform(post("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hespedim)))
            .andExpect(status().isBadRequest());

        // Validate the Hespedim in the database
        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkhNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = hespedimRepository.findAll().size();
        // set the field null
        hespedim.sethName(null);

        // Create the Hespedim, which fails.


        restHespedimMockMvc.perform(post("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hespedim)))
            .andExpect(status().isBadRequest());

        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkhEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = hespedimRepository.findAll().size();
        // set the field null
        hespedim.sethEmail(null);

        // Create the Hespedim, which fails.


        restHespedimMockMvc.perform(post("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hespedim)))
            .andExpect(status().isBadRequest());

        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHespedims() throws Exception {
        // Initialize the database
        hespedimRepository.saveAndFlush(hespedim);

        // Get all the hespedimList
        restHespedimMockMvc.perform(get("/api/hespedims?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hespedim.getId().intValue())))
            .andExpect(jsonPath("$.[*].hName").value(hasItem(DEFAULT_H_NAME)))
            .andExpect(jsonPath("$.[*].hEmail").value(hasItem(DEFAULT_H_EMAIL)))
            .andExpect(jsonPath("$.[*].hContent").value(hasItem(DEFAULT_H_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].hNotActive").value(hasItem(DEFAULT_H_NOT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getHespedim() throws Exception {
        // Initialize the database
        hespedimRepository.saveAndFlush(hespedim);

        // Get the hespedim
        restHespedimMockMvc.perform(get("/api/hespedims/{id}", hespedim.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hespedim.getId().intValue()))
            .andExpect(jsonPath("$.hName").value(DEFAULT_H_NAME))
            .andExpect(jsonPath("$.hEmail").value(DEFAULT_H_EMAIL))
            .andExpect(jsonPath("$.hContent").value(DEFAULT_H_CONTENT.toString()))
            .andExpect(jsonPath("$.hNotActive").value(DEFAULT_H_NOT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingHespedim() throws Exception {
        // Get the hespedim
        restHespedimMockMvc.perform(get("/api/hespedims/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHespedim() throws Exception {
        // Initialize the database
        hespedimRepository.saveAndFlush(hespedim);

        int databaseSizeBeforeUpdate = hespedimRepository.findAll().size();

        // Update the hespedim
        Hespedim updatedHespedim = hespedimRepository.findById(hespedim.getId()).get();
        // Disconnect from session so that the updates on updatedHespedim are not directly saved in db
        em.detach(updatedHespedim);
        updatedHespedim
            .hName(UPDATED_H_NAME)
            .hEmail(UPDATED_H_EMAIL)
            .hContent(UPDATED_H_CONTENT)
            .hNotActive(UPDATED_H_NOT_ACTIVE);

        restHespedimMockMvc.perform(put("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHespedim)))
            .andExpect(status().isOk());

        // Validate the Hespedim in the database
        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeUpdate);
        Hespedim testHespedim = hespedimList.get(hespedimList.size() - 1);
        assertThat(testHespedim.gethName()).isEqualTo(UPDATED_H_NAME);
        assertThat(testHespedim.gethEmail()).isEqualTo(UPDATED_H_EMAIL);
        assertThat(testHespedim.gethContent()).isEqualTo(UPDATED_H_CONTENT);
        assertThat(testHespedim.ishNotActive()).isEqualTo(UPDATED_H_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingHespedim() throws Exception {
        int databaseSizeBeforeUpdate = hespedimRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHespedimMockMvc.perform(put("/api/hespedims")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hespedim)))
            .andExpect(status().isBadRequest());

        // Validate the Hespedim in the database
        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHespedim() throws Exception {
        // Initialize the database
        hespedimRepository.saveAndFlush(hespedim);

        int databaseSizeBeforeDelete = hespedimRepository.findAll().size();

        // Delete the hespedim
        restHespedimMockMvc.perform(delete("/api/hespedims/{id}", hespedim.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Hespedim> hespedimList = hespedimRepository.findAll();
        assertThat(hespedimList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
