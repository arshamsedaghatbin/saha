package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Morkhasi;
import ir.saha.app.repository.MorkhasiRepository;

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
 * Integration tests for the {@link MorkhasiResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MorkhasiResourceIT {

    private static final Instant DEFAULT_BEGIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BEGIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MorkhasiRepository morkhasiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMorkhasiMockMvc;

    private Morkhasi morkhasi;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Morkhasi createEntity(EntityManager em) {
        Morkhasi morkhasi = new Morkhasi()
            .begin(DEFAULT_BEGIN)
            .end(DEFAULT_END);
        return morkhasi;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Morkhasi createUpdatedEntity(EntityManager em) {
        Morkhasi morkhasi = new Morkhasi()
            .begin(UPDATED_BEGIN)
            .end(UPDATED_END);
        return morkhasi;
    }

    @BeforeEach
    public void initTest() {
        morkhasi = createEntity(em);
    }

    @Test
    @Transactional
    public void createMorkhasi() throws Exception {
        int databaseSizeBeforeCreate = morkhasiRepository.findAll().size();
        // Create the Morkhasi
        restMorkhasiMockMvc.perform(post("/api/morkhasis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(morkhasi)))
            .andExpect(status().isCreated());

        // Validate the Morkhasi in the database
        List<Morkhasi> morkhasiList = morkhasiRepository.findAll();
        assertThat(morkhasiList).hasSize(databaseSizeBeforeCreate + 1);
        Morkhasi testMorkhasi = morkhasiList.get(morkhasiList.size() - 1);
        assertThat(testMorkhasi.getBegin()).isEqualTo(DEFAULT_BEGIN);
        assertThat(testMorkhasi.getEnd()).isEqualTo(DEFAULT_END);
    }

    @Test
    @Transactional
    public void createMorkhasiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = morkhasiRepository.findAll().size();

        // Create the Morkhasi with an existing ID
        morkhasi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMorkhasiMockMvc.perform(post("/api/morkhasis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(morkhasi)))
            .andExpect(status().isBadRequest());

        // Validate the Morkhasi in the database
        List<Morkhasi> morkhasiList = morkhasiRepository.findAll();
        assertThat(morkhasiList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMorkhasis() throws Exception {
        // Initialize the database
        morkhasiRepository.saveAndFlush(morkhasi);

        // Get all the morkhasiList
        restMorkhasiMockMvc.perform(get("/api/morkhasis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(morkhasi.getId().intValue())))
            .andExpect(jsonPath("$.[*].begin").value(hasItem(DEFAULT_BEGIN.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }
    
    @Test
    @Transactional
    public void getMorkhasi() throws Exception {
        // Initialize the database
        morkhasiRepository.saveAndFlush(morkhasi);

        // Get the morkhasi
        restMorkhasiMockMvc.perform(get("/api/morkhasis/{id}", morkhasi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(morkhasi.getId().intValue()))
            .andExpect(jsonPath("$.begin").value(DEFAULT_BEGIN.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMorkhasi() throws Exception {
        // Get the morkhasi
        restMorkhasiMockMvc.perform(get("/api/morkhasis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMorkhasi() throws Exception {
        // Initialize the database
        morkhasiRepository.saveAndFlush(morkhasi);

        int databaseSizeBeforeUpdate = morkhasiRepository.findAll().size();

        // Update the morkhasi
        Morkhasi updatedMorkhasi = morkhasiRepository.findById(morkhasi.getId()).get();
        // Disconnect from session so that the updates on updatedMorkhasi are not directly saved in db
        em.detach(updatedMorkhasi);
        updatedMorkhasi
            .begin(UPDATED_BEGIN)
            .end(UPDATED_END);

        restMorkhasiMockMvc.perform(put("/api/morkhasis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMorkhasi)))
            .andExpect(status().isOk());

        // Validate the Morkhasi in the database
        List<Morkhasi> morkhasiList = morkhasiRepository.findAll();
        assertThat(morkhasiList).hasSize(databaseSizeBeforeUpdate);
        Morkhasi testMorkhasi = morkhasiList.get(morkhasiList.size() - 1);
        assertThat(testMorkhasi.getBegin()).isEqualTo(UPDATED_BEGIN);
        assertThat(testMorkhasi.getEnd()).isEqualTo(UPDATED_END);
    }

    @Test
    @Transactional
    public void updateNonExistingMorkhasi() throws Exception {
        int databaseSizeBeforeUpdate = morkhasiRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMorkhasiMockMvc.perform(put("/api/morkhasis")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(morkhasi)))
            .andExpect(status().isBadRequest());

        // Validate the Morkhasi in the database
        List<Morkhasi> morkhasiList = morkhasiRepository.findAll();
        assertThat(morkhasiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMorkhasi() throws Exception {
        // Initialize the database
        morkhasiRepository.saveAndFlush(morkhasi);

        int databaseSizeBeforeDelete = morkhasiRepository.findAll().size();

        // Delete the morkhasi
        restMorkhasiMockMvc.perform(delete("/api/morkhasis/{id}", morkhasi.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Morkhasi> morkhasiList = morkhasiRepository.findAll();
        assertThat(morkhasiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
