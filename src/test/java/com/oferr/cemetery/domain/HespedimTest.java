package com.oferr.cemetery.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.oferr.cemetery.web.rest.TestUtil;

public class HespedimTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hespedim.class);
        Hespedim hespedim1 = new Hespedim();
        hespedim1.setId(1L);
        Hespedim hespedim2 = new Hespedim();
        hespedim2.setId(hespedim1.getId());
        assertThat(hespedim1).isEqualTo(hespedim2);
        hespedim2.setId(2L);
        assertThat(hespedim1).isNotEqualTo(hespedim2);
        hespedim1.setId(null);
        assertThat(hespedim1).isNotEqualTo(hespedim2);
    }
}
