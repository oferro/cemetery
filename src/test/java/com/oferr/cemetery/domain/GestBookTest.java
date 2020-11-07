package com.oferr.cemetery.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.oferr.cemetery.web.rest.TestUtil;

public class GestBookTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GestBook.class);
        GestBook gestBook1 = new GestBook();
        gestBook1.setId(1L);
        GestBook gestBook2 = new GestBook();
        gestBook2.setId(gestBook1.getId());
        assertThat(gestBook1).isEqualTo(gestBook2);
        gestBook2.setId(2L);
        assertThat(gestBook1).isNotEqualTo(gestBook2);
        gestBook1.setId(null);
        assertThat(gestBook1).isNotEqualTo(gestBook2);
    }
}
