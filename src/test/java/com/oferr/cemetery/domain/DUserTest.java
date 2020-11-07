package com.oferr.cemetery.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.oferr.cemetery.web.rest.TestUtil;

public class DUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DUser.class);
        DUser dUser1 = new DUser();
        dUser1.setId(1L);
        DUser dUser2 = new DUser();
        dUser2.setId(dUser1.getId());
        assertThat(dUser1).isEqualTo(dUser2);
        dUser2.setId(2L);
        assertThat(dUser1).isNotEqualTo(dUser2);
        dUser1.setId(null);
        assertThat(dUser1).isNotEqualTo(dUser2);
    }
}
