package com.bensonlu.ecommercefullstack;

import com.bensonlu.ecommercefullstack.config.AsyncSyncConfiguration;
import com.bensonlu.ecommercefullstack.config.EmbeddedRedis;
import com.bensonlu.ecommercefullstack.config.EmbeddedSQL;
import com.bensonlu.ecommercefullstack.config.JacksonConfiguration;
import com.bensonlu.ecommercefullstack.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = { EcommercefullstackApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class }
)
@EmbeddedRedis
@EmbeddedSQL
public @interface IntegrationTest {
}
