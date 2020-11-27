package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.BargeMamooriat;
import ir.saha.app.repository.BargeMamooriatRepository;

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
 * Integration tests for the {@link BargeMamooriatResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BargeMamooriatResourceIT {

    private static final Instant DEFAULT_TARIKH_SODOOR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TARIKH_SODOOR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BargeMamooriatRepository bargeMamooriatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBargeMamooriatMockMvc;

    private BargeMamooriat bargeMamooriat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BargeMamooriat createEntity(EntityManager em) {
        BargeMamooriat bargeMamooriat = new BargeMamooriat()
            .tarikhSodoor(DEFAULT_TARIKH_SODOOR);
        return bargeMamooriat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BargeMamooriat createUpdatedEntity(EntityManager em) {
        BargeMamooriat bargeMamooriat = new BargeMamooriat()
            .tarikhSodoor(UPDATED_TARIKH_SODOOR);
        return bargeMamooriat;
    }

    @BeforeEach
    public void initTest() {
        bargeMamooriat = createEntity(em);
    }

    @Test
    @Transactional
    public void createBargeMamooriat() throws Exception {
        int databaseSizeBeforeCreate = bargeMamooriatRepository.findAll().size();
        // Create the BargeMamooriat
        restBargeMamooriatMockMvc.perform(post("/api/barge-mamooriats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bargeMamooriat)))
            .andExpect(status().isCreated());

        // Validate the BargeMamooriat in the database
        List<BargeMamooriat> bargeMamooriatList = bargeMamooriatRepository.findAll();
        assertThat(bargeMamooriatList).hasSize(databaseSizeBeforeCreate + 1);
        BargeMamooriat testBargeMamooriat = bargeMamooriatList.get(bargeMamooriatList.size() - 1);
        assertThat(testBargeMamooriat.getTarikhSodoor()).isEqualTo(DEFAULT_TARIKH_SODOOR);
    }

    @Test
    @Transactional
    public void createBargeMamooriatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bargeMamooriatRepository.findAll().size();

        // Create the BargeMamooriat with an existing ID
        bargeMamooriat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBargeMamooriatMockMvc.perform(post("/api/barge-mamooriats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bargeMamooriat)))
            .andExpect(status().isBadRequest());

        // Validate the BargeMamooriat in the database
        List<BargeMamooriat> bargeMamooriatList = bargeMamooriatRepository.findAll();
        assertThat(bargeMamooriatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBargeMamooriats() throws Exception {
        // Initialize the database
        bargeMamooriatRepository.saveAndFlush(bargeMamooriat);

        // Get all the bargeMamooriatList
        restBargeMamooriatMockMvc.perform(get("/api/barge-mamooriats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bargeMamooriat.getId().intValue())))
            .andExpect(jsonPath("$.[*].tarikhSodoor").value(hasItem(DEFAULT_TARIKH_SODOOR.toString())));
    }
    
    @Test
    @Transactional
    public void getBargeMamooriat() throws Exception {
        // Initialize the database
        bargeMamooriatRepository.saveAndFlush(bargeMamooriat);

        // Get the bargeMamooriat
        restBargeMamooriatMockMvc.perform(get("/api/barge-mamooriats/{id}", bargeMamooriat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bargeMamooriat.getId().intValue()))
            .andExpect(jsonPath("$.tarikhSodoor").value(DEFAULT_TARIKH_SODOOR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBargeMamooriat() throws Exception {
        // Get the bargeMamooriat
        restBargeMamooriatMockMvc.perform(get("/api/barge-mamooriats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBargeMamooriat() throws Exception {
        // Initialize the database
        bargeMamooriatRepository.saveAndFlush(bargeMamooriat);

        int databaseSizeBeforeUpdate = bargeMamooriatRepository.findAll().size();

        // Update the bargeMamooriat
        BargeMamooriat updatedBargeMamooriat = bargeMamooriatRepository.findById(bargeMamooriat.getId()).get();
        // Disconnect from session so that the updates on updatedBargeMamooriat are not directly saved in db
        em.detach(updatedBargeMamooriat);
        updatedBargeMamooriat
            .tarikhSodoor(UPDATED_TARIKH_SODOOR);

        restBargeMamooriatMockMvc.perform(put("/api/barge-mamooriats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBargeMamooriat)))
            .andExpect(status().isOk());

        // Validate the BargeMamooriat in the database
        List<BargeMamooriat> bargeMamooriatList = bargeMamooriatRepository.findAll();
        assertThat(bargeMamooriatList).hasSize(databaseSizeBeforeUpdate);
        BargeMamooriat testBargeMamooriat = bargeMamooriatList.get(bargeMamooriatList.size() - 1);
        assertThat(testBargeMamooriat.getTarikhSodoor()).isEqualTo(UPDATED_TARIKH_SODOOR);
    }

    @Test
    @Transactional
    public void updateNonExistingBargeMamooriat() throws Exception {
        int databaseSizeBeforeUpdate = bargeMamooriatRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBargeMamooriatMockMvc.perform(put("/api/barge-mamooriats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bargeMamooriat)))
            .andExpect(status().isBadRequest());

        // Validate the BargeMamooriat in the database
        List<BargeMamooriat> bargeMamooriatList = bargeMamooriatRepository.findAll();
        assertThat(bargeMamooriatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBargeMamooriat() throws Exception {
        // Initialize the database
        bargeMamooriatRepository.saveAndFlush(bargeMamooriat);

        int databaseSizeBeforeDelete = bargeMamooriatRepository.findAll().size();

        // Delete the bargeMamooriat
        restBargeMamooriatMockMvc.perform(delete("/api/barge-mamooriats/{id}", bargeMamooriat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BargeMamooriat> bargeMamooriatList = bargeMamooriatRepository.findAll();
        assertThat(bargeMamooriatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
