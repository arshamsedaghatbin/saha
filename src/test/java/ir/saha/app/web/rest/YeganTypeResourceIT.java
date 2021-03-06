package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.YeganType;
import ir.saha.app.repository.YeganTypeRepository;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link YeganTypeResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class YeganTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private YeganTypeRepository yeganTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restYeganTypeMockMvc;

    private YeganType yeganType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static YeganType createEntity(EntityManager em) {
        YeganType yeganType = new YeganType()
            .name(DEFAULT_NAME);
        return yeganType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static YeganType createUpdatedEntity(EntityManager em) {
        YeganType yeganType = new YeganType()
            .name(UPDATED_NAME);
        return yeganType;
    }

    @BeforeEach
    public void initTest() {
        yeganType = createEntity(em);
    }

    @Test
    @Transactional
    public void createYeganType() throws Exception {
        int databaseSizeBeforeCreate = yeganTypeRepository.findAll().size();
        // Create the YeganType
        restYeganTypeMockMvc.perform(post("/api/yegan-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yeganType)))
            .andExpect(status().isCreated());

        // Validate the YeganType in the database
        List<YeganType> yeganTypeList = yeganTypeRepository.findAll();
        assertThat(yeganTypeList).hasSize(databaseSizeBeforeCreate + 1);
        YeganType testYeganType = yeganTypeList.get(yeganTypeList.size() - 1);
        assertThat(testYeganType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createYeganTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yeganTypeRepository.findAll().size();

        // Create the YeganType with an existing ID
        yeganType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYeganTypeMockMvc.perform(post("/api/yegan-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yeganType)))
            .andExpect(status().isBadRequest());

        // Validate the YeganType in the database
        List<YeganType> yeganTypeList = yeganTypeRepository.findAll();
        assertThat(yeganTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllYeganTypes() throws Exception {
        // Initialize the database
        yeganTypeRepository.saveAndFlush(yeganType);

        // Get all the yeganTypeList
        restYeganTypeMockMvc.perform(get("/api/yegan-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeganType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getYeganType() throws Exception {
        // Initialize the database
        yeganTypeRepository.saveAndFlush(yeganType);

        // Get the yeganType
        restYeganTypeMockMvc.perform(get("/api/yegan-types/{id}", yeganType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(yeganType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingYeganType() throws Exception {
        // Get the yeganType
        restYeganTypeMockMvc.perform(get("/api/yegan-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYeganType() throws Exception {
        // Initialize the database
        yeganTypeRepository.saveAndFlush(yeganType);

        int databaseSizeBeforeUpdate = yeganTypeRepository.findAll().size();

        // Update the yeganType
        YeganType updatedYeganType = yeganTypeRepository.findById(yeganType.getId()).get();
        // Disconnect from session so that the updates on updatedYeganType are not directly saved in db
        em.detach(updatedYeganType);
        updatedYeganType
            .name(UPDATED_NAME);

        restYeganTypeMockMvc.perform(put("/api/yegan-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedYeganType)))
            .andExpect(status().isOk());

        // Validate the YeganType in the database
        List<YeganType> yeganTypeList = yeganTypeRepository.findAll();
        assertThat(yeganTypeList).hasSize(databaseSizeBeforeUpdate);
        YeganType testYeganType = yeganTypeList.get(yeganTypeList.size() - 1);
        assertThat(testYeganType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingYeganType() throws Exception {
        int databaseSizeBeforeUpdate = yeganTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYeganTypeMockMvc.perform(put("/api/yegan-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yeganType)))
            .andExpect(status().isBadRequest());

        // Validate the YeganType in the database
        List<YeganType> yeganTypeList = yeganTypeRepository.findAll();
        assertThat(yeganTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteYeganType() throws Exception {
        // Initialize the database
        yeganTypeRepository.saveAndFlush(yeganType);

        int databaseSizeBeforeDelete = yeganTypeRepository.findAll().size();

        // Delete the yeganType
        restYeganTypeMockMvc.perform(delete("/api/yegan-types/{id}", yeganType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<YeganType> yeganTypeList = yeganTypeRepository.findAll();
        assertThat(yeganTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
