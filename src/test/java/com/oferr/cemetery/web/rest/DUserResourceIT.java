package com.oferr.cemetery.web.rest;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.DUser;
import com.oferr.cemetery.repository.DUserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DUserResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DUserResourceIT {

    private static final String DEFAULT_U_FORE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_U_FORE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_U_SOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_U_SOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_U_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_U_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_U_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_U_EMAIL = "BBBBBBBBBB";

    @Autowired
    private DUserRepository dUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDUserMockMvc;

    private DUser dUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DUser createEntity(EntityManager em) {
        DUser dUser = new DUser()
            .uForeName(DEFAULT_U_FORE_NAME)
            .uSorName(DEFAULT_U_SOR_NAME)
            .uPhone(DEFAULT_U_PHONE)
            .uEmail(DEFAULT_U_EMAIL);
        return dUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DUser createUpdatedEntity(EntityManager em) {
        DUser dUser = new DUser()
            .uForeName(UPDATED_U_FORE_NAME)
            .uSorName(UPDATED_U_SOR_NAME)
            .uPhone(UPDATED_U_PHONE)
            .uEmail(UPDATED_U_EMAIL);
        return dUser;
    }

    @BeforeEach
    public void initTest() {
        dUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createDUser() throws Exception {
        int databaseSizeBeforeCreate = dUserRepository.findAll().size();
        // Create the DUser
        restDUserMockMvc.perform(post("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isCreated());

        // Validate the DUser in the database
        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeCreate + 1);
        DUser testDUser = dUserList.get(dUserList.size() - 1);
        assertThat(testDUser.getuForeName()).isEqualTo(DEFAULT_U_FORE_NAME);
        assertThat(testDUser.getuSorName()).isEqualTo(DEFAULT_U_SOR_NAME);
        assertThat(testDUser.getuPhone()).isEqualTo(DEFAULT_U_PHONE);
        assertThat(testDUser.getuEmail()).isEqualTo(DEFAULT_U_EMAIL);
    }

    @Test
    @Transactional
    public void createDUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dUserRepository.findAll().size();

        // Create the DUser with an existing ID
        dUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDUserMockMvc.perform(post("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isBadRequest());

        // Validate the DUser in the database
        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkuForeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = dUserRepository.findAll().size();
        // set the field null
        dUser.setuForeName(null);

        // Create the DUser, which fails.


        restDUserMockMvc.perform(post("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isBadRequest());

        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkuSorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = dUserRepository.findAll().size();
        // set the field null
        dUser.setuSorName(null);

        // Create the DUser, which fails.


        restDUserMockMvc.perform(post("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isBadRequest());

        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkuEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = dUserRepository.findAll().size();
        // set the field null
        dUser.setuEmail(null);

        // Create the DUser, which fails.


        restDUserMockMvc.perform(post("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isBadRequest());

        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDUsers() throws Exception {
        // Initialize the database
        dUserRepository.saveAndFlush(dUser);

        // Get all the dUserList
        restDUserMockMvc.perform(get("/api/d-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].uForeName").value(hasItem(DEFAULT_U_FORE_NAME)))
            .andExpect(jsonPath("$.[*].uSorName").value(hasItem(DEFAULT_U_SOR_NAME)))
            .andExpect(jsonPath("$.[*].uPhone").value(hasItem(DEFAULT_U_PHONE)))
            .andExpect(jsonPath("$.[*].uEmail").value(hasItem(DEFAULT_U_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getDUser() throws Exception {
        // Initialize the database
        dUserRepository.saveAndFlush(dUser);

        // Get the dUser
        restDUserMockMvc.perform(get("/api/d-users/{id}", dUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dUser.getId().intValue()))
            .andExpect(jsonPath("$.uForeName").value(DEFAULT_U_FORE_NAME))
            .andExpect(jsonPath("$.uSorName").value(DEFAULT_U_SOR_NAME))
            .andExpect(jsonPath("$.uPhone").value(DEFAULT_U_PHONE))
            .andExpect(jsonPath("$.uEmail").value(DEFAULT_U_EMAIL));
    }
    @Test
    @Transactional
    public void getNonExistingDUser() throws Exception {
        // Get the dUser
        restDUserMockMvc.perform(get("/api/d-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDUser() throws Exception {
        // Initialize the database
        dUserRepository.saveAndFlush(dUser);

        int databaseSizeBeforeUpdate = dUserRepository.findAll().size();

        // Update the dUser
        DUser updatedDUser = dUserRepository.findById(dUser.getId()).get();
        // Disconnect from session so that the updates on updatedDUser are not directly saved in db
        em.detach(updatedDUser);
        updatedDUser
            .uForeName(UPDATED_U_FORE_NAME)
            .uSorName(UPDATED_U_SOR_NAME)
            .uPhone(UPDATED_U_PHONE)
            .uEmail(UPDATED_U_EMAIL);

        restDUserMockMvc.perform(put("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDUser)))
            .andExpect(status().isOk());

        // Validate the DUser in the database
        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeUpdate);
        DUser testDUser = dUserList.get(dUserList.size() - 1);
        assertThat(testDUser.getuForeName()).isEqualTo(UPDATED_U_FORE_NAME);
        assertThat(testDUser.getuSorName()).isEqualTo(UPDATED_U_SOR_NAME);
        assertThat(testDUser.getuPhone()).isEqualTo(UPDATED_U_PHONE);
        assertThat(testDUser.getuEmail()).isEqualTo(UPDATED_U_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingDUser() throws Exception {
        int databaseSizeBeforeUpdate = dUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDUserMockMvc.perform(put("/api/d-users").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dUser)))
            .andExpect(status().isBadRequest());

        // Validate the DUser in the database
        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDUser() throws Exception {
        // Initialize the database
        dUserRepository.saveAndFlush(dUser);

        int databaseSizeBeforeDelete = dUserRepository.findAll().size();

        // Delete the dUser
        restDUserMockMvc.perform(delete("/api/d-users/{id}", dUser.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DUser> dUserList = dUserRepository.findAll();
        assertThat(dUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
