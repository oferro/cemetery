package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.Desist;
import com.oferr.cemetery.repository.DesistRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DesistResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DesistResourceIT {

    private static final String DEFAULT_D_SOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_D_SOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_D_FORE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_D_FORE_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_D_PIC = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_D_PIC = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_D_PIC_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_D_PIC_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_D_BERTH_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_D_BERTH_PLACE = "BBBBBBBBBB";

    private static final String DEFAULT_D_CAREER = "AAAAAAAAAA";
    private static final String UPDATED_D_CAREER = "BBBBBBBBBB";

    private static final String DEFAULT_D_EDUCATION = "AAAAAAAAAA";
    private static final String UPDATED_D_EDUCATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_D_DATE_BORN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_D_DATE_BORN = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_D_DATE_DEAD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_D_DATE_DEAD = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_D_NOT_ACTIVE = false;
    private static final Boolean UPDATED_D_NOT_ACTIVE = true;

    @Autowired
    private DesistRepository desistRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDesistMockMvc;

    private Desist desist;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Desist createEntity(EntityManager em) {
        Desist desist = new Desist()
            .dSorName(DEFAULT_D_SOR_NAME)
            .dForeName(DEFAULT_D_FORE_NAME)
            .dPic(DEFAULT_D_PIC)
            .dPicContentType(DEFAULT_D_PIC_CONTENT_TYPE)
            .dBerthPlace(DEFAULT_D_BERTH_PLACE)
            .dCareer(DEFAULT_D_CAREER)
            .dEducation(DEFAULT_D_EDUCATION)
            .dDateBorn(DEFAULT_D_DATE_BORN)
            .dDateDead(DEFAULT_D_DATE_DEAD)
            .dNotActive(DEFAULT_D_NOT_ACTIVE);
        return desist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Desist createUpdatedEntity(EntityManager em) {
        Desist desist = new Desist()
            .dSorName(UPDATED_D_SOR_NAME)
            .dForeName(UPDATED_D_FORE_NAME)
            .dPic(UPDATED_D_PIC)
            .dPicContentType(UPDATED_D_PIC_CONTENT_TYPE)
            .dBerthPlace(UPDATED_D_BERTH_PLACE)
            .dCareer(UPDATED_D_CAREER)
            .dEducation(UPDATED_D_EDUCATION)
            .dDateBorn(UPDATED_D_DATE_BORN)
            .dDateDead(UPDATED_D_DATE_DEAD)
            .dNotActive(UPDATED_D_NOT_ACTIVE);
        return desist;
    }

    @BeforeEach
    public void initTest() {
        desist = createEntity(em);
    }

    @Test
    @Transactional
    public void createDesist() throws Exception {
        int databaseSizeBeforeCreate = desistRepository.findAll().size();
        // Create the Desist
        restDesistMockMvc.perform(post("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(desist)))
            .andExpect(status().isCreated());

        // Validate the Desist in the database
        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeCreate + 1);
        Desist testDesist = desistList.get(desistList.size() - 1);
        assertThat(testDesist.getdSorName()).isEqualTo(DEFAULT_D_SOR_NAME);
        assertThat(testDesist.getdForeName()).isEqualTo(DEFAULT_D_FORE_NAME);
        assertThat(testDesist.getdPic()).isEqualTo(DEFAULT_D_PIC);
        assertThat(testDesist.getdPicContentType()).isEqualTo(DEFAULT_D_PIC_CONTENT_TYPE);
        assertThat(testDesist.getdBerthPlace()).isEqualTo(DEFAULT_D_BERTH_PLACE);
        assertThat(testDesist.getdCareer()).isEqualTo(DEFAULT_D_CAREER);
        assertThat(testDesist.getdEducation()).isEqualTo(DEFAULT_D_EDUCATION);
        assertThat(testDesist.getdDateBorn()).isEqualTo(DEFAULT_D_DATE_BORN);
        assertThat(testDesist.getdDateDead()).isEqualTo(DEFAULT_D_DATE_DEAD);
        assertThat(testDesist.isdNotActive()).isEqualTo(DEFAULT_D_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void createDesistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = desistRepository.findAll().size();

        // Create the Desist with an existing ID
        desist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDesistMockMvc.perform(post("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(desist)))
            .andExpect(status().isBadRequest());

        // Validate the Desist in the database
        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkdSorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = desistRepository.findAll().size();
        // set the field null
        desist.setdSorName(null);

        // Create the Desist, which fails.


        restDesistMockMvc.perform(post("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(desist)))
            .andExpect(status().isBadRequest());

        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkdForeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = desistRepository.findAll().size();
        // set the field null
        desist.setdForeName(null);

        // Create the Desist, which fails.


        restDesistMockMvc.perform(post("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(desist)))
            .andExpect(status().isBadRequest());

        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDesists() throws Exception {
        // Initialize the database
        desistRepository.saveAndFlush(desist);

        // Get all the desistList
        restDesistMockMvc.perform(get("/api/desists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(desist.getId().intValue())))
            .andExpect(jsonPath("$.[*].dSorName").value(hasItem(DEFAULT_D_SOR_NAME)))
            .andExpect(jsonPath("$.[*].dForeName").value(hasItem(DEFAULT_D_FORE_NAME)))
            .andExpect(jsonPath("$.[*].dPicContentType").value(hasItem(DEFAULT_D_PIC_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].dPic").value(hasItem(Base64Utils.encodeToString(DEFAULT_D_PIC))))
            .andExpect(jsonPath("$.[*].dBerthPlace").value(hasItem(DEFAULT_D_BERTH_PLACE)))
            .andExpect(jsonPath("$.[*].dCareer").value(hasItem(DEFAULT_D_CAREER.toString())))
            .andExpect(jsonPath("$.[*].dEducation").value(hasItem(DEFAULT_D_EDUCATION.toString())))
            .andExpect(jsonPath("$.[*].dDateBorn").value(hasItem(DEFAULT_D_DATE_BORN.toString())))
            .andExpect(jsonPath("$.[*].dDateDead").value(hasItem(DEFAULT_D_DATE_DEAD.toString())))
            .andExpect(jsonPath("$.[*].dNotActive").value(hasItem(DEFAULT_D_NOT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getDesist() throws Exception {
        // Initialize the database
        desistRepository.saveAndFlush(desist);

        // Get the desist
        restDesistMockMvc.perform(get("/api/desists/{id}", desist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(desist.getId().intValue()))
            .andExpect(jsonPath("$.dSorName").value(DEFAULT_D_SOR_NAME))
            .andExpect(jsonPath("$.dForeName").value(DEFAULT_D_FORE_NAME))
            .andExpect(jsonPath("$.dPicContentType").value(DEFAULT_D_PIC_CONTENT_TYPE))
            .andExpect(jsonPath("$.dPic").value(Base64Utils.encodeToString(DEFAULT_D_PIC)))
            .andExpect(jsonPath("$.dBerthPlace").value(DEFAULT_D_BERTH_PLACE))
            .andExpect(jsonPath("$.dCareer").value(DEFAULT_D_CAREER.toString()))
            .andExpect(jsonPath("$.dEducation").value(DEFAULT_D_EDUCATION.toString()))
            .andExpect(jsonPath("$.dDateBorn").value(DEFAULT_D_DATE_BORN.toString()))
            .andExpect(jsonPath("$.dDateDead").value(DEFAULT_D_DATE_DEAD.toString()))
            .andExpect(jsonPath("$.dNotActive").value(DEFAULT_D_NOT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingDesist() throws Exception {
        // Get the desist
        restDesistMockMvc.perform(get("/api/desists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDesist() throws Exception {
        // Initialize the database
        desistRepository.saveAndFlush(desist);

        int databaseSizeBeforeUpdate = desistRepository.findAll().size();

        // Update the desist
        Desist updatedDesist = desistRepository.findById(desist.getId()).get();
        // Disconnect from session so that the updates on updatedDesist are not directly saved in db
        em.detach(updatedDesist);
        updatedDesist
            .dSorName(UPDATED_D_SOR_NAME)
            .dForeName(UPDATED_D_FORE_NAME)
            .dPic(UPDATED_D_PIC)
            .dPicContentType(UPDATED_D_PIC_CONTENT_TYPE)
            .dBerthPlace(UPDATED_D_BERTH_PLACE)
            .dCareer(UPDATED_D_CAREER)
            .dEducation(UPDATED_D_EDUCATION)
            .dDateBorn(UPDATED_D_DATE_BORN)
            .dDateDead(UPDATED_D_DATE_DEAD)
            .dNotActive(UPDATED_D_NOT_ACTIVE);

        restDesistMockMvc.perform(put("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDesist)))
            .andExpect(status().isOk());

        // Validate the Desist in the database
        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeUpdate);
        Desist testDesist = desistList.get(desistList.size() - 1);
        assertThat(testDesist.getdSorName()).isEqualTo(UPDATED_D_SOR_NAME);
        assertThat(testDesist.getdForeName()).isEqualTo(UPDATED_D_FORE_NAME);
        assertThat(testDesist.getdPic()).isEqualTo(UPDATED_D_PIC);
        assertThat(testDesist.getdPicContentType()).isEqualTo(UPDATED_D_PIC_CONTENT_TYPE);
        assertThat(testDesist.getdBerthPlace()).isEqualTo(UPDATED_D_BERTH_PLACE);
        assertThat(testDesist.getdCareer()).isEqualTo(UPDATED_D_CAREER);
        assertThat(testDesist.getdEducation()).isEqualTo(UPDATED_D_EDUCATION);
        assertThat(testDesist.getdDateBorn()).isEqualTo(UPDATED_D_DATE_BORN);
        assertThat(testDesist.getdDateDead()).isEqualTo(UPDATED_D_DATE_DEAD);
        assertThat(testDesist.isdNotActive()).isEqualTo(UPDATED_D_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingDesist() throws Exception {
        int databaseSizeBeforeUpdate = desistRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDesistMockMvc.perform(put("/api/desists")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(desist)))
            .andExpect(status().isBadRequest());

        // Validate the Desist in the database
        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDesist() throws Exception {
        // Initialize the database
        desistRepository.saveAndFlush(desist);

        int databaseSizeBeforeDelete = desistRepository.findAll().size();

        // Delete the desist
        restDesistMockMvc.perform(delete("/api/desists/{id}", desist.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Desist> desistList = desistRepository.findAll();
        assertThat(desistList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
