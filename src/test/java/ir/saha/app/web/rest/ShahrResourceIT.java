package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Shahr;
import ir.saha.app.repository.ShahrRepository;

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
 * Integration tests for the {@link ShahrResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ShahrResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ZARIB_ABO_HAVA = 1;
    private static final Integer UPDATED_ZARIB_ABO_HAVA = 2;

    private static final Integer DEFAULT_ZARIB_TASHIAT = 1;
    private static final Integer UPDATED_ZARIB_TASHIAT = 2;

    private static final Integer DEFAULT_MASAFAT_TA_MARKAZ = 1;
    private static final Integer UPDATED_MASAFAT_TA_MARKAZ = 2;

    @Autowired
    private ShahrRepository shahrRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShahrMockMvc;

    private Shahr shahr;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shahr createEntity(EntityManager em) {
        Shahr shahr = new Shahr()
            .name(DEFAULT_NAME)
            .zaribAboHava(DEFAULT_ZARIB_ABO_HAVA)
            .zaribTashiat(DEFAULT_ZARIB_TASHIAT)
            .masafatTaMarkaz(DEFAULT_MASAFAT_TA_MARKAZ);
        return shahr;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shahr createUpdatedEntity(EntityManager em) {
        Shahr shahr = new Shahr()
            .name(UPDATED_NAME)
            .zaribAboHava(UPDATED_ZARIB_ABO_HAVA)
            .zaribTashiat(UPDATED_ZARIB_TASHIAT)
            .masafatTaMarkaz(UPDATED_MASAFAT_TA_MARKAZ);
        return shahr;
    }

    @BeforeEach
    public void initTest() {
        shahr = createEntity(em);
    }

    @Test
    @Transactional
    public void createShahr() throws Exception {
        int databaseSizeBeforeCreate = shahrRepository.findAll().size();
        // Create the Shahr
        restShahrMockMvc.perform(post("/api/shahrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shahr)))
            .andExpect(status().isCreated());

        // Validate the Shahr in the database
        List<Shahr> shahrList = shahrRepository.findAll();
        assertThat(shahrList).hasSize(databaseSizeBeforeCreate + 1);
        Shahr testShahr = shahrList.get(shahrList.size() - 1);
        assertThat(testShahr.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShahr.getZaribAboHava()).isEqualTo(DEFAULT_ZARIB_ABO_HAVA);
        assertThat(testShahr.getZaribTashiat()).isEqualTo(DEFAULT_ZARIB_TASHIAT);
        assertThat(testShahr.getMasafatTaMarkaz()).isEqualTo(DEFAULT_MASAFAT_TA_MARKAZ);
    }

    @Test
    @Transactional
    public void createShahrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shahrRepository.findAll().size();

        // Create the Shahr with an existing ID
        shahr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShahrMockMvc.perform(post("/api/shahrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shahr)))
            .andExpect(status().isBadRequest());

        // Validate the Shahr in the database
        List<Shahr> shahrList = shahrRepository.findAll();
        assertThat(shahrList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllShahrs() throws Exception {
        // Initialize the database
        shahrRepository.saveAndFlush(shahr);

        // Get all the shahrList
        restShahrMockMvc.perform(get("/api/shahrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shahr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].zaribAboHava").value(hasItem(DEFAULT_ZARIB_ABO_HAVA)))
            .andExpect(jsonPath("$.[*].zaribTashiat").value(hasItem(DEFAULT_ZARIB_TASHIAT)))
            .andExpect(jsonPath("$.[*].masafatTaMarkaz").value(hasItem(DEFAULT_MASAFAT_TA_MARKAZ)));
    }
    
    @Test
    @Transactional
    public void getShahr() throws Exception {
        // Initialize the database
        shahrRepository.saveAndFlush(shahr);

        // Get the shahr
        restShahrMockMvc.perform(get("/api/shahrs/{id}", shahr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shahr.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.zaribAboHava").value(DEFAULT_ZARIB_ABO_HAVA))
            .andExpect(jsonPath("$.zaribTashiat").value(DEFAULT_ZARIB_TASHIAT))
            .andExpect(jsonPath("$.masafatTaMarkaz").value(DEFAULT_MASAFAT_TA_MARKAZ));
    }
    @Test
    @Transactional
    public void getNonExistingShahr() throws Exception {
        // Get the shahr
        restShahrMockMvc.perform(get("/api/shahrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShahr() throws Exception {
        // Initialize the database
        shahrRepository.saveAndFlush(shahr);

        int databaseSizeBeforeUpdate = shahrRepository.findAll().size();

        // Update the shahr
        Shahr updatedShahr = shahrRepository.findById(shahr.getId()).get();
        // Disconnect from session so that the updates on updatedShahr are not directly saved in db
        em.detach(updatedShahr);
        updatedShahr
            .name(UPDATED_NAME)
            .zaribAboHava(UPDATED_ZARIB_ABO_HAVA)
            .zaribTashiat(UPDATED_ZARIB_TASHIAT)
            .masafatTaMarkaz(UPDATED_MASAFAT_TA_MARKAZ);

        restShahrMockMvc.perform(put("/api/shahrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedShahr)))
            .andExpect(status().isOk());

        // Validate the Shahr in the database
        List<Shahr> shahrList = shahrRepository.findAll();
        assertThat(shahrList).hasSize(databaseSizeBeforeUpdate);
        Shahr testShahr = shahrList.get(shahrList.size() - 1);
        assertThat(testShahr.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShahr.getZaribAboHava()).isEqualTo(UPDATED_ZARIB_ABO_HAVA);
        assertThat(testShahr.getZaribTashiat()).isEqualTo(UPDATED_ZARIB_TASHIAT);
        assertThat(testShahr.getMasafatTaMarkaz()).isEqualTo(UPDATED_MASAFAT_TA_MARKAZ);
    }

    @Test
    @Transactional
    public void updateNonExistingShahr() throws Exception {
        int databaseSizeBeforeUpdate = shahrRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShahrMockMvc.perform(put("/api/shahrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(shahr)))
            .andExpect(status().isBadRequest());

        // Validate the Shahr in the database
        List<Shahr> shahrList = shahrRepository.findAll();
        assertThat(shahrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShahr() throws Exception {
        // Initialize the database
        shahrRepository.saveAndFlush(shahr);

        int databaseSizeBeforeDelete = shahrRepository.findAll().size();

        // Delete the shahr
        restShahrMockMvc.perform(delete("/api/shahrs/{id}", shahr.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shahr> shahrList = shahrRepository.findAll();
        assertThat(shahrList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
