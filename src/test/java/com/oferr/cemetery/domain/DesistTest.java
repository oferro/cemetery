package com.oferr.cemetery.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.oferr.cemetery.web.rest.TestUtil;

public class DesistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Desist.class);
        Desist desist1 = new Desist();
        desist1.setId(1L);
        Desist desist2 = new Desist();
        desist2.setId(desist1.getId());
        assertThat(desist1).isEqualTo(desist2);
        desist2.setId(2L);
        assertThat(desist1).isNotEqualTo(desist2);
        desist1.setId(null);
        assertThat(desist1).isNotEqualTo(desist2);
    }
}
