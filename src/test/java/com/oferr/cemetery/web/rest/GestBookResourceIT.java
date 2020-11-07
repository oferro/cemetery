package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.GestBook;
import com.oferr.cemetery.repository.GestBookRepository;

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
 * Integration tests for the {@link GestBookResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GestBookResourceIT {

    private static final String DEFAULT_B_NAME = "AAAAAAAAAA";
    private static final String UPDATED_B_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_B_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_B_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_B_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_B_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_B_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_B_CONTENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_B_NOT_ACTIVE = false;
    private static final Boolean UPDATED_B_NOT_ACTIVE = true;

    @Autowired
    private GestBookRepository gestBookRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGestBookMockMvc;

    private GestBook gestBook;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GestBook createEntity(EntityManager em) {
        GestBook gestBook = new GestBook()
            .bName(DEFAULT_B_NAME)
            .bEmail(DEFAULT_B_EMAIL)
            .bPhone(DEFAULT_B_PHONE)
            .bContent(DEFAULT_B_CONTENT)
            .bNotActive(DEFAULT_B_NOT_ACTIVE);
        return gestBook;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GestBook createUpdatedEntity(EntityManager em) {
        GestBook gestBook = new GestBook()
            .bName(UPDATED_B_NAME)
            .bEmail(UPDATED_B_EMAIL)
            .bPhone(UPDATED_B_PHONE)
            .bContent(UPDATED_B_CONTENT)
            .bNotActive(UPDATED_B_NOT_ACTIVE);
        return gestBook;
    }

    @BeforeEach
    public void initTest() {
        gestBook = createEntity(em);
    }

    @Test
    @Transactional
    public void createGestBook() throws Exception {
        int databaseSizeBeforeCreate = gestBookRepository.findAll().size();
        // Create the GestBook
        restGestBookMockMvc.perform(post("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isCreated());

        // Validate the GestBook in the database
        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeCreate + 1);
        GestBook testGestBook = gestBookList.get(gestBookList.size() - 1);
        assertThat(testGestBook.getbName()).isEqualTo(DEFAULT_B_NAME);
        assertThat(testGestBook.getbEmail()).isEqualTo(DEFAULT_B_EMAIL);
        assertThat(testGestBook.getbPhone()).isEqualTo(DEFAULT_B_PHONE);
        assertThat(testGestBook.getbContent()).isEqualTo(DEFAULT_B_CONTENT);
        assertThat(testGestBook.isbNotActive()).isEqualTo(DEFAULT_B_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void createGestBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gestBookRepository.findAll().size();

        // Create the GestBook with an existing ID
        gestBook.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGestBookMockMvc.perform(post("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isBadRequest());

        // Validate the GestBook in the database
        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkbNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestBookRepository.findAll().size();
        // set the field null
        gestBook.setbName(null);

        // Create the GestBook, which fails.


        restGestBookMockMvc.perform(post("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isBadRequest());

        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkbEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestBookRepository.findAll().size();
        // set the field null
        gestBook.setbEmail(null);

        // Create the GestBook, which fails.


        restGestBookMockMvc.perform(post("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isBadRequest());

        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkbPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestBookRepository.findAll().size();
        // set the field null
        gestBook.setbPhone(null);

        // Create the GestBook, which fails.


        restGestBookMockMvc.perform(post("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isBadRequest());

        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGestBooks() throws Exception {
        // Initialize the database
        gestBookRepository.saveAndFlush(gestBook);

        // Get all the gestBookList
        restGestBookMockMvc.perform(get("/api/gest-books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gestBook.getId().intValue())))
            .andExpect(jsonPath("$.[*].bName").value(hasItem(DEFAULT_B_NAME)))
            .andExpect(jsonPath("$.[*].bEmail").value(hasItem(DEFAULT_B_EMAIL)))
            .andExpect(jsonPath("$.[*].bPhone").value(hasItem(DEFAULT_B_PHONE)))
            .andExpect(jsonPath("$.[*].bContent").value(hasItem(DEFAULT_B_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].bNotActive").value(hasItem(DEFAULT_B_NOT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getGestBook() throws Exception {
        // Initialize the database
        gestBookRepository.saveAndFlush(gestBook);

        // Get the gestBook
        restGestBookMockMvc.perform(get("/api/gest-books/{id}", gestBook.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gestBook.getId().intValue()))
            .andExpect(jsonPath("$.bName").value(DEFAULT_B_NAME))
            .andExpect(jsonPath("$.bEmail").value(DEFAULT_B_EMAIL))
            .andExpect(jsonPath("$.bPhone").value(DEFAULT_B_PHONE))
            .andExpect(jsonPath("$.bContent").value(DEFAULT_B_CONTENT.toString()))
            .andExpect(jsonPath("$.bNotActive").value(DEFAULT_B_NOT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingGestBook() throws Exception {
        // Get the gestBook
        restGestBookMockMvc.perform(get("/api/gest-books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGestBook() throws Exception {
        // Initialize the database
        gestBookRepository.saveAndFlush(gestBook);

        int databaseSizeBeforeUpdate = gestBookRepository.findAll().size();

        // Update the gestBook
        GestBook updatedGestBook = gestBookRepository.findById(gestBook.getId()).get();
        // Disconnect from session so that the updates on updatedGestBook are not directly saved in db
        em.detach(updatedGestBook);
        updatedGestBook
            .bName(UPDATED_B_NAME)
            .bEmail(UPDATED_B_EMAIL)
            .bPhone(UPDATED_B_PHONE)
            .bContent(UPDATED_B_CONTENT)
            .bNotActive(UPDATED_B_NOT_ACTIVE);

        restGestBookMockMvc.perform(put("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGestBook)))
            .andExpect(status().isOk());

        // Validate the GestBook in the database
        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeUpdate);
        GestBook testGestBook = gestBookList.get(gestBookList.size() - 1);
        assertThat(testGestBook.getbName()).isEqualTo(UPDATED_B_NAME);
        assertThat(testGestBook.getbEmail()).isEqualTo(UPDATED_B_EMAIL);
        assertThat(testGestBook.getbPhone()).isEqualTo(UPDATED_B_PHONE);
        assertThat(testGestBook.getbContent()).isEqualTo(UPDATED_B_CONTENT);
        assertThat(testGestBook.isbNotActive()).isEqualTo(UPDATED_B_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingGestBook() throws Exception {
        int databaseSizeBeforeUpdate = gestBookRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGestBookMockMvc.perform(put("/api/gest-books").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestBook)))
            .andExpect(status().isBadRequest());

        // Validate the GestBook in the database
        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGestBook() throws Exception {
        // Initialize the database
        gestBookRepository.saveAndFlush(gestBook);

        int databaseSizeBeforeDelete = gestBookRepository.findAll().size();

        // Delete the gestBook
        restGestBookMockMvc.perform(delete("/api/gest-books/{id}", gestBook.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GestBook> gestBookList = gestBookRepository.findAll();
        assertThat(gestBookList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
