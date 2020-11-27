package ir.saha.app.web.rest;

import ir.saha.app.SahaApp;
import ir.saha.app.domain.Karbar;
import ir.saha.app.repository.KarbarRepository;

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
 * Integration tests for the {@link KarbarResource} REST controller.
 */
@SpringBootTest(classes = SahaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class KarbarResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ONVAN_SHOGHLI = "AAAAAAAAAA";
    private static final String UPDATED_ONVAN_SHOGHLI = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_PERSENELI = "AAAAAAAAAA";
    private static final String UPDATED_CODE_PERSENELI = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BEZANESHATE = false;
    private static final Boolean UPDATED_BEZANESHATE = true;

    private static final Boolean DEFAULT_SAZMANI = false;
    private static final Boolean UPDATED_SAZMANI = true;

    private static final Instant DEFAULT_TARIKH_BAZNESHASTEGI = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TARIKH_BAZNESHASTEGI = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private KarbarRepository karbarRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKarbarMockMvc;

    private Karbar karbar;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Karbar createEntity(EntityManager em) {
        Karbar karbar = new Karbar()
            .name(DEFAULT_NAME)
            .onvanShoghli(DEFAULT_ONVAN_SHOGHLI)
            .codePerseneli(DEFAULT_CODE_PERSENELI)
            .bezaneshate(DEFAULT_BEZANESHATE)
            .sazmani(DEFAULT_SAZMANI)
            .tarikhBazneshastegi(DEFAULT_TARIKH_BAZNESHASTEGI);
        return karbar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Karbar createUpdatedEntity(EntityManager em) {
        Karbar karbar = new Karbar()
            .name(UPDATED_NAME)
            .onvanShoghli(UPDATED_ONVAN_SHOGHLI)
            .codePerseneli(UPDATED_CODE_PERSENELI)
            .bezaneshate(UPDATED_BEZANESHATE)
            .sazmani(UPDATED_SAZMANI)
            .tarikhBazneshastegi(UPDATED_TARIKH_BAZNESHASTEGI);
        return karbar;
    }

    @BeforeEach
    public void initTest() {
        karbar = createEntity(em);
    }

    @Test
    @Transactional
    public void createKarbar() throws Exception {
        int databaseSizeBeforeCreate = karbarRepository.findAll().size();
        // Create the Karbar
        restKarbarMockMvc.perform(post("/api/karbars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(karbar)))
            .andExpect(status().isCreated());

        // Validate the Karbar in the database
        List<Karbar> karbarList = karbarRepository.findAll();
        assertThat(karbarList).hasSize(databaseSizeBeforeCreate + 1);
        Karbar testKarbar = karbarList.get(karbarList.size() - 1);
        assertThat(testKarbar.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testKarbar.getOnvanShoghli()).isEqualTo(DEFAULT_ONVAN_SHOGHLI);
        assertThat(testKarbar.getCodePerseneli()).isEqualTo(DEFAULT_CODE_PERSENELI);
        assertThat(testKarbar.isBezaneshate()).isEqualTo(DEFAULT_BEZANESHATE);
        assertThat(testKarbar.isSazmani()).isEqualTo(DEFAULT_SAZMANI);
        assertThat(testKarbar.getTarikhBazneshastegi()).isEqualTo(DEFAULT_TARIKH_BAZNESHASTEGI);
    }

    @Test
    @Transactional
    public void createKarbarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = karbarRepository.findAll().size();

        // Create the Karbar with an existing ID
        karbar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKarbarMockMvc.perform(post("/api/karbars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(karbar)))
            .andExpect(status().isBadRequest());

        // Validate the Karbar in the database
        List<Karbar> karbarList = karbarRepository.findAll();
        assertThat(karbarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKarbars() throws Exception {
        // Initialize the database
        karbarRepository.saveAndFlush(karbar);

        // Get all the karbarList
        restKarbarMockMvc.perform(get("/api/karbars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(karbar.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].onvanShoghli").value(hasItem(DEFAULT_ONVAN_SHOGHLI)))
            .andExpect(jsonPath("$.[*].codePerseneli").value(hasItem(DEFAULT_CODE_PERSENELI)))
            .andExpect(jsonPath("$.[*].bezaneshate").value(hasItem(DEFAULT_BEZANESHATE.booleanValue())))
            .andExpect(jsonPath("$.[*].sazmani").value(hasItem(DEFAULT_SAZMANI.booleanValue())))
            .andExpect(jsonPath("$.[*].tarikhBazneshastegi").value(hasItem(DEFAULT_TARIKH_BAZNESHASTEGI.toString())));
    }
    
    @Test
    @Transactional
    public void getKarbar() throws Exception {
        // Initialize the database
        karbarRepository.saveAndFlush(karbar);

        // Get the karbar
        restKarbarMockMvc.perform(get("/api/karbars/{id}", karbar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(karbar.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.onvanShoghli").value(DEFAULT_ONVAN_SHOGHLI))
            .andExpect(jsonPath("$.codePerseneli").value(DEFAULT_CODE_PERSENELI))
            .andExpect(jsonPath("$.bezaneshate").value(DEFAULT_BEZANESHATE.booleanValue()))
            .andExpect(jsonPath("$.sazmani").value(DEFAULT_SAZMANI.booleanValue()))
            .andExpect(jsonPath("$.tarikhBazneshastegi").value(DEFAULT_TARIKH_BAZNESHASTEGI.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingKarbar() throws Exception {
        // Get the karbar
        restKarbarMockMvc.perform(get("/api/karbars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKarbar() throws Exception {
        // Initialize the database
        karbarRepository.saveAndFlush(karbar);

        int databaseSizeBeforeUpdate = karbarRepository.findAll().size();

        // Update the karbar
        Karbar updatedKarbar = karbarRepository.findById(karbar.getId()).get();
        // Disconnect from session so that the updates on updatedKarbar are not directly saved in db
        em.detach(updatedKarbar);
        updatedKarbar
            .name(UPDATED_NAME)
            .onvanShoghli(UPDATED_ONVAN_SHOGHLI)
            .codePerseneli(UPDATED_CODE_PERSENELI)
            .bezaneshate(UPDATED_BEZANESHATE)
            .sazmani(UPDATED_SAZMANI)
            .tarikhBazneshastegi(UPDATED_TARIKH_BAZNESHASTEGI);

        restKarbarMockMvc.perform(put("/api/karbars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedKarbar)))
            .andExpect(status().isOk());

        // Validate the Karbar in the database
        List<Karbar> karbarList = karbarRepository.findAll();
        assertThat(karbarList).hasSize(databaseSizeBeforeUpdate);
        Karbar testKarbar = karbarList.get(karbarList.size() - 1);
        assertThat(testKarbar.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testKarbar.getOnvanShoghli()).isEqualTo(UPDATED_ONVAN_SHOGHLI);
        assertThat(testKarbar.getCodePerseneli()).isEqualTo(UPDATED_CODE_PERSENELI);
        assertThat(testKarbar.isBezaneshate()).isEqualTo(UPDATED_BEZANESHATE);
        assertThat(testKarbar.isSazmani()).isEqualTo(UPDATED_SAZMANI);
        assertThat(testKarbar.getTarikhBazneshastegi()).isEqualTo(UPDATED_TARIKH_BAZNESHASTEGI);
    }

    @Test
    @Transactional
    public void updateNonExistingKarbar() throws Exception {
        int databaseSizeBeforeUpdate = karbarRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKarbarMockMvc.perform(put("/api/karbars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(karbar)))
            .andExpect(status().isBadRequest());

        // Validate the Karbar in the database
        List<Karbar> karbarList = karbarRepository.findAll();
        assertThat(karbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKarbar() throws Exception {
        // Initialize the database
        karbarRepository.saveAndFlush(karbar);

        int databaseSizeBeforeDelete = karbarRepository.findAll().size();

        // Delete the karbar
        restKarbarMockMvc.perform(delete("/api/karbars/{id}", karbar.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Karbar> karbarList = karbarRepository.findAll();
        assertThat(karbarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
