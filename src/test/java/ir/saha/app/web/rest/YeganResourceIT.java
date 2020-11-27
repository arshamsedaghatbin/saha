package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Yegan;
import ir.saha.app.repository.YeganRepository;

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
 * Integration tests for the {@link YeganResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class YeganResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private YeganRepository yeganRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restYeganMockMvc;

    private Yegan yegan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Yegan createEntity(EntityManager em) {
        Yegan yegan = new Yegan()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return yegan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Yegan createUpdatedEntity(EntityManager em) {
        Yegan yegan = new Yegan()
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);
        return yegan;
    }

    @BeforeEach
    public void initTest() {
        yegan = createEntity(em);
    }

    @Test
    @Transactional
    public void createYegan() throws Exception {
        int databaseSizeBeforeCreate = yeganRepository.findAll().size();
        // Create the Yegan
        restYeganMockMvc.perform(post("/api/yegans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yegan)))
            .andExpect(status().isCreated());

        // Validate the Yegan in the database
        List<Yegan> yeganList = yeganRepository.findAll();
        assertThat(yeganList).hasSize(databaseSizeBeforeCreate + 1);
        Yegan testYegan = yeganList.get(yeganList.size() - 1);
        assertThat(testYegan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testYegan.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createYeganWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yeganRepository.findAll().size();

        // Create the Yegan with an existing ID
        yegan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYeganMockMvc.perform(post("/api/yegans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yegan)))
            .andExpect(status().isBadRequest());

        // Validate the Yegan in the database
        List<Yegan> yeganList = yeganRepository.findAll();
        assertThat(yeganList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllYegans() throws Exception {
        // Initialize the database
        yeganRepository.saveAndFlush(yegan);

        // Get all the yeganList
        restYeganMockMvc.perform(get("/api/yegans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yegan.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getYegan() throws Exception {
        // Initialize the database
        yeganRepository.saveAndFlush(yegan);

        // Get the yegan
        restYeganMockMvc.perform(get("/api/yegans/{id}", yegan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(yegan.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }
    @Test
    @Transactional
    public void getNonExistingYegan() throws Exception {
        // Get the yegan
        restYeganMockMvc.perform(get("/api/yegans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYegan() throws Exception {
        // Initialize the database
        yeganRepository.saveAndFlush(yegan);

        int databaseSizeBeforeUpdate = yeganRepository.findAll().size();

        // Update the yegan
        Yegan updatedYegan = yeganRepository.findById(yegan.getId()).get();
        // Disconnect from session so that the updates on updatedYegan are not directly saved in db
        em.detach(updatedYegan);
        updatedYegan
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);

        restYeganMockMvc.perform(put("/api/yegans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedYegan)))
            .andExpect(status().isOk());

        // Validate the Yegan in the database
        List<Yegan> yeganList = yeganRepository.findAll();
        assertThat(yeganList).hasSize(databaseSizeBeforeUpdate);
        Yegan testYegan = yeganList.get(yeganList.size() - 1);
        assertThat(testYegan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testYegan.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingYegan() throws Exception {
        int databaseSizeBeforeUpdate = yeganRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYeganMockMvc.perform(put("/api/yegans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(yegan)))
            .andExpect(status().isBadRequest());

        // Validate the Yegan in the database
        List<Yegan> yeganList = yeganRepository.findAll();
        assertThat(yeganList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteYegan() throws Exception {
        // Initialize the database
        yeganRepository.saveAndFlush(yegan);

        int databaseSizeBeforeDelete = yeganRepository.findAll().size();

        // Delete the yegan
        restYeganMockMvc.perform(delete("/api/yegans/{id}", yegan.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Yegan> yeganList = yeganRepository.findAll();
        assertThat(yeganList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
