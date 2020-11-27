package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Semat;
import ir.saha.app.repository.SematRepository;

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
 * Integration tests for the {@link SematResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SematResourceIT {

    private static final String DEFAULT_ONVAN_SHOGHLI = "AAAAAAAAAA";
    private static final String UPDATED_ONVAN_SHOGHLI = "BBBBBBBBBB";

    @Autowired
    private SematRepository sematRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSematMockMvc;

    private Semat semat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semat createEntity(EntityManager em) {
        Semat semat = new Semat()
            .onvanShoghli(DEFAULT_ONVAN_SHOGHLI);
        return semat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semat createUpdatedEntity(EntityManager em) {
        Semat semat = new Semat()
            .onvanShoghli(UPDATED_ONVAN_SHOGHLI);
        return semat;
    }

    @BeforeEach
    public void initTest() {
        semat = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemat() throws Exception {
        int databaseSizeBeforeCreate = sematRepository.findAll().size();
        // Create the Semat
        restSematMockMvc.perform(post("/api/semats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semat)))
            .andExpect(status().isCreated());

        // Validate the Semat in the database
        List<Semat> sematList = sematRepository.findAll();
        assertThat(sematList).hasSize(databaseSizeBeforeCreate + 1);
        Semat testSemat = sematList.get(sematList.size() - 1);
        assertThat(testSemat.getOnvanShoghli()).isEqualTo(DEFAULT_ONVAN_SHOGHLI);
    }

    @Test
    @Transactional
    public void createSematWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sematRepository.findAll().size();

        // Create the Semat with an existing ID
        semat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSematMockMvc.perform(post("/api/semats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semat)))
            .andExpect(status().isBadRequest());

        // Validate the Semat in the database
        List<Semat> sematList = sematRepository.findAll();
        assertThat(sematList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSemats() throws Exception {
        // Initialize the database
        sematRepository.saveAndFlush(semat);

        // Get all the sematList
        restSematMockMvc.perform(get("/api/semats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semat.getId().intValue())))
            .andExpect(jsonPath("$.[*].onvanShoghli").value(hasItem(DEFAULT_ONVAN_SHOGHLI)));
    }
    
    @Test
    @Transactional
    public void getSemat() throws Exception {
        // Initialize the database
        sematRepository.saveAndFlush(semat);

        // Get the semat
        restSematMockMvc.perform(get("/api/semats/{id}", semat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(semat.getId().intValue()))
            .andExpect(jsonPath("$.onvanShoghli").value(DEFAULT_ONVAN_SHOGHLI));
    }
    @Test
    @Transactional
    public void getNonExistingSemat() throws Exception {
        // Get the semat
        restSematMockMvc.perform(get("/api/semats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemat() throws Exception {
        // Initialize the database
        sematRepository.saveAndFlush(semat);

        int databaseSizeBeforeUpdate = sematRepository.findAll().size();

        // Update the semat
        Semat updatedSemat = sematRepository.findById(semat.getId()).get();
        // Disconnect from session so that the updates on updatedSemat are not directly saved in db
        em.detach(updatedSemat);
        updatedSemat
            .onvanShoghli(UPDATED_ONVAN_SHOGHLI);

        restSematMockMvc.perform(put("/api/semats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemat)))
            .andExpect(status().isOk());

        // Validate the Semat in the database
        List<Semat> sematList = sematRepository.findAll();
        assertThat(sematList).hasSize(databaseSizeBeforeUpdate);
        Semat testSemat = sematList.get(sematList.size() - 1);
        assertThat(testSemat.getOnvanShoghli()).isEqualTo(UPDATED_ONVAN_SHOGHLI);
    }

    @Test
    @Transactional
    public void updateNonExistingSemat() throws Exception {
        int databaseSizeBeforeUpdate = sematRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSematMockMvc.perform(put("/api/semats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semat)))
            .andExpect(status().isBadRequest());

        // Validate the Semat in the database
        List<Semat> sematList = sematRepository.findAll();
        assertThat(sematList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSemat() throws Exception {
        // Initialize the database
        sematRepository.saveAndFlush(semat);

        int databaseSizeBeforeDelete = sematRepository.findAll().size();

        // Delete the semat
        restSematMockMvc.perform(delete("/api/semats/{id}", semat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Semat> sematList = sematRepository.findAll();
        assertThat(sematList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
