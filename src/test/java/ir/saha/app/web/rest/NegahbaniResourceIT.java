package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Negahbani;
import ir.saha.app.repository.NegahbaniRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NegahbaniResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NegahbaniResourceIT {

    private static final Instant DEFAULT_BEGIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BEGIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private NegahbaniRepository negahbaniRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNegahbaniMockMvc;

    private Negahbani negahbani;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Negahbani createEntity(EntityManager em) {
        Negahbani negahbani = new Negahbani()
            .begin(DEFAULT_BEGIN)
            .end(DEFAULT_END);
        return negahbani;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Negahbani createUpdatedEntity(EntityManager em) {
        Negahbani negahbani = new Negahbani()
            .begin(UPDATED_BEGIN)
            .end(UPDATED_END);
        return negahbani;
    }

    @BeforeEach
    public void initTest() {
        negahbani = createEntity(em);
    }

    @Test
    @Transactional
    public void createNegahbani() throws Exception {
        int databaseSizeBeforeCreate = negahbaniRepository.findAll().size();
        // Create the Negahbani
        restNegahbaniMockMvc.perform(post("/api/negahbanis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negahbani)))
            .andExpect(status().isCreated());

        // Validate the Negahbani in the database
        List<Negahbani> negahbaniList = negahbaniRepository.findAll();
        assertThat(negahbaniList).hasSize(databaseSizeBeforeCreate + 1);
        Negahbani testNegahbani = negahbaniList.get(negahbaniList.size() - 1);
        assertThat(testNegahbani.getBegin()).isEqualTo(DEFAULT_BEGIN);
        assertThat(testNegahbani.getEnd()).isEqualTo(DEFAULT_END);
    }

    @Test
    @Transactional
    public void createNegahbaniWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = negahbaniRepository.findAll().size();

        // Create the Negahbani with an existing ID
        negahbani.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNegahbaniMockMvc.perform(post("/api/negahbanis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negahbani)))
            .andExpect(status().isBadRequest());

        // Validate the Negahbani in the database
        List<Negahbani> negahbaniList = negahbaniRepository.findAll();
        assertThat(negahbaniList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNegahbanis() throws Exception {
        // Initialize the database
        negahbaniRepository.saveAndFlush(negahbani);

        // Get all the negahbaniList
        restNegahbaniMockMvc.perform(get("/api/negahbanis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(negahbani.getId().intValue())))
            .andExpect(jsonPath("$.[*].begin").value(hasItem(DEFAULT_BEGIN.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }
    
    @Test
    @Transactional
    public void getNegahbani() throws Exception {
        // Initialize the database
        negahbaniRepository.saveAndFlush(negahbani);

        // Get the negahbani
        restNegahbaniMockMvc.perform(get("/api/negahbanis/{id}", negahbani.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(negahbani.getId().intValue()))
            .andExpect(jsonPath("$.begin").value(DEFAULT_BEGIN.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNegahbani() throws Exception {
        // Get the negahbani
        restNegahbaniMockMvc.perform(get("/api/negahbanis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNegahbani() throws Exception {
        // Initialize the database
        negahbaniRepository.saveAndFlush(negahbani);

        int databaseSizeBeforeUpdate = negahbaniRepository.findAll().size();

        // Update the negahbani
        Negahbani updatedNegahbani = negahbaniRepository.findById(negahbani.getId()).get();
        // Disconnect from session so that the updates on updatedNegahbani are not directly saved in db
        em.detach(updatedNegahbani);
        updatedNegahbani
            .begin(UPDATED_BEGIN)
            .end(UPDATED_END);

        restNegahbaniMockMvc.perform(put("/api/negahbanis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNegahbani)))
            .andExpect(status().isOk());

        // Validate the Negahbani in the database
        List<Negahbani> negahbaniList = negahbaniRepository.findAll();
        assertThat(negahbaniList).hasSize(databaseSizeBeforeUpdate);
        Negahbani testNegahbani = negahbaniList.get(negahbaniList.size() - 1);
        assertThat(testNegahbani.getBegin()).isEqualTo(UPDATED_BEGIN);
        assertThat(testNegahbani.getEnd()).isEqualTo(UPDATED_END);
    }

    @Test
    @Transactional
    public void updateNonExistingNegahbani() throws Exception {
        int databaseSizeBeforeUpdate = negahbaniRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNegahbaniMockMvc.perform(put("/api/negahbanis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(negahbani)))
            .andExpect(status().isBadRequest());

        // Validate the Negahbani in the database
        List<Negahbani> negahbaniList = negahbaniRepository.findAll();
        assertThat(negahbaniList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNegahbani() throws Exception {
        // Initialize the database
        negahbaniRepository.saveAndFlush(negahbani);

        int databaseSizeBeforeDelete = negahbaniRepository.findAll().size();

        // Delete the negahbani
        restNegahbaniMockMvc.perform(delete("/api/negahbanis/{id}", negahbani.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Negahbani> negahbaniList = negahbaniRepository.findAll();
        assertThat(negahbaniList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
