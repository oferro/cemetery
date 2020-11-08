package com.oferr.cemetery.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.oferr.cemetery.CemeteryApp;
import com.oferr.cemetery.domain.Media;
import com.oferr.cemetery.repository.MediaRepository;
/**
 * Integration tests for the {@link MediaResource} REST controller.
 */
@SpringBootTest(classes = CemeteryApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MediaResourceIT {

    private static final com.oferr.cemetery.domain.enumeration.MediaType DEFAULT_M_TYPE = com.oferr.cemetery.domain.enumeration.MediaType.PIC;
    private static final com.oferr.cemetery.domain.enumeration.MediaType UPDATED_M_TYPE = com.oferr.cemetery.domain.enumeration.MediaType.VIDEO;

    private static final String DEFAULT_M_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_M_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_M_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_M_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_M_LINK = "AAAAAAAAAA";
    private static final String UPDATED_M_LINK = "BBBBBBBBBB";

    private static final Boolean DEFAULT_M_NOT_ACTIVE = false;
    private static final Boolean UPDATED_M_NOT_ACTIVE = true;

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMediaMockMvc;

    private Media media;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Media createEntity(EntityManager em) {
        Media media = new Media()
            .mType(DEFAULT_M_TYPE)
            .mDescription(DEFAULT_M_DESCRIPTION)
            .mDate(DEFAULT_M_DATE)
            .mLink(DEFAULT_M_LINK)
            .mNotActive(DEFAULT_M_NOT_ACTIVE);
        return media;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Media createUpdatedEntity(EntityManager em) {
        Media media = new Media()
            .mType(UPDATED_M_TYPE)
            .mDescription(UPDATED_M_DESCRIPTION)
            .mDate(UPDATED_M_DATE)
            .mLink(UPDATED_M_LINK)
            .mNotActive(UPDATED_M_NOT_ACTIVE);
        return media;
    }

    @BeforeEach
    public void initTest() {
        media = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedia() throws Exception {
        int databaseSizeBeforeCreate = mediaRepository.findAll().size();
        // Create the Media
        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isCreated());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeCreate + 1);
        Media testMedia = mediaList.get(mediaList.size() - 1);
        assertThat(testMedia.getmType()).isEqualTo(DEFAULT_M_TYPE);
        assertThat(testMedia.getmDescription()).isEqualTo(DEFAULT_M_DESCRIPTION);
        assertThat(testMedia.getmDate()).isEqualTo(DEFAULT_M_DATE);
        assertThat(testMedia.getmLink()).isEqualTo(DEFAULT_M_LINK);
        assertThat(testMedia.ismNotActive()).isEqualTo(DEFAULT_M_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void createMediaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediaRepository.findAll().size();

        // Create the Media with an existing ID
        media.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkmTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mediaRepository.findAll().size();
        // set the field null
        media.setmType(null);

        // Create the Media, which fails.


        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkmLinkIsRequired() throws Exception {
        int databaseSizeBeforeTest = mediaRepository.findAll().size();
        // set the field null
        media.setmLink(null);

        // Create the Media, which fails.


        restMediaMockMvc.perform(post("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        // Get all the mediaList
        restMediaMockMvc.perform(get("/api/media?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(media.getId().intValue())))
            .andExpect(jsonPath("$.[*].mType").value(hasItem(DEFAULT_M_TYPE.toString())))
            .andExpect(jsonPath("$.[*].mDescription").value(hasItem(DEFAULT_M_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].mDate").value(hasItem(DEFAULT_M_DATE.toString())))
            .andExpect(jsonPath("$.[*].mLink").value(hasItem(DEFAULT_M_LINK)))
            .andExpect(jsonPath("$.[*].mNotActive").value(hasItem(DEFAULT_M_NOT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        // Get the media
        restMediaMockMvc.perform(get("/api/media/{id}", media.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(media.getId().intValue()))
            .andExpect(jsonPath("$.mType").value(DEFAULT_M_TYPE.toString()))
            .andExpect(jsonPath("$.mDescription").value(DEFAULT_M_DESCRIPTION))
            .andExpect(jsonPath("$.mDate").value(DEFAULT_M_DATE.toString()))
            .andExpect(jsonPath("$.mLink").value(DEFAULT_M_LINK))
            .andExpect(jsonPath("$.mNotActive").value(DEFAULT_M_NOT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMedia() throws Exception {
        // Get the media
        restMediaMockMvc.perform(get("/api/media/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        int databaseSizeBeforeUpdate = mediaRepository.findAll().size();

        // Update the media
        Media updatedMedia = mediaRepository.findById(media.getId()).get();
        // Disconnect from session so that the updates on updatedMedia are not directly saved in db
        em.detach(updatedMedia);
        updatedMedia
            .mType(UPDATED_M_TYPE)
            .mDescription(UPDATED_M_DESCRIPTION)
            .mDate(UPDATED_M_DATE)
            .mLink(UPDATED_M_LINK)
            .mNotActive(UPDATED_M_NOT_ACTIVE);

        restMediaMockMvc.perform(put("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedia)))
            .andExpect(status().isOk());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeUpdate);
        Media testMedia = mediaList.get(mediaList.size() - 1);
        assertThat(testMedia.getmType()).isEqualTo(UPDATED_M_TYPE);
        assertThat(testMedia.getmDescription()).isEqualTo(UPDATED_M_DESCRIPTION);
        assertThat(testMedia.getmDate()).isEqualTo(UPDATED_M_DATE);
        assertThat(testMedia.getmLink()).isEqualTo(UPDATED_M_LINK);
        assertThat(testMedia.ismNotActive()).isEqualTo(UPDATED_M_NOT_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingMedia() throws Exception {
        int databaseSizeBeforeUpdate = mediaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMediaMockMvc.perform(put("/api/media")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(media)))
            .andExpect(status().isBadRequest());

        // Validate the Media in the database
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedia() throws Exception {
        // Initialize the database
        mediaRepository.saveAndFlush(media);

        int databaseSizeBeforeDelete = mediaRepository.findAll().size();

        // Delete the media
        restMediaMockMvc.perform(delete("/api/media/{id}", media.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Media> mediaList = mediaRepository.findAll();
        assertThat(mediaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
