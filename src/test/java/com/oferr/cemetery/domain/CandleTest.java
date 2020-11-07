package com.oferr.cemetery.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.oferr.cemetery.web.rest.TestUtil;

public class CandleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Candle.class);
        Candle candle1 = new Candle();
        candle1.setId(1L);
        Candle candle2 = new Candle();
        candle2.setId(candle1.getId());
        assertThat(candle1).isEqualTo(candle2);
        candle2.setId(2L);
        assertThat(candle1).isNotEqualTo(candle2);
        candle1.setId(null);
        assertThat(candle1).isNotEqualTo(candle2);
    }
}
