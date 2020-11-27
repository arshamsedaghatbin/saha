package ir.saha.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ir.saha.app.web.rest.TestUtil;

public class DoreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dore.class);
        Dore dore1 = new Dore();
        dore1.setId(1L);
        Dore dore2 = new Dore();
        dore2.setId(dore1.getId());
        assertThat(dore1).isEqualTo(dore2);
        dore2.setId(2L);
        assertThat(dore1).isNotEqualTo(dore2);
        dore1.setId(null);
        assertThat(dore1).isNotEqualTo(dore2);
    }
}
