package com.codingera.module.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.codingera.module.base.converter.LocalTimeConverter;

/**
 * 
 * @author JasonWoo
 * 
 */
@Configuration
@EnableWebMvc
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

	/**
	 * Global CORS configuration
	 * 
	 * As of version 4.2, Spring MVC supports CORS out of the box. Using
	 * controller method CORS configuration with @CrossOrigin annotations in
	 * your Spring Boot application does not require any specific configuration.
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("Authorization", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers")
				.exposedHeaders("Authorization", "Accept").allowCredentials(true).maxAge(3600);
	}

	/**
	 * @see http 
	 *      ://www.petrikainulainen.net/programming/spring-framework/spring-from
	 *      -the-trenches-using-type-converters-with-spring-mvc/
	 */
	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(new LocalTimeConverter("yyyy-MM-dd'T'HH:mm:ss.SSS"));
	}

	/**
	 * 配置 jackson-datatype-hibernate4 识别懒加载字段
	 * 
	 * @see  http://stackoverflow.com/questions/33727017/configure-jackson-to-omit-lazy-loading-attributes-in-springboot
	 */
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		List<MediaType> supportedMediaTypes = new ArrayList<>();
		supportedMediaTypes.add(MediaType.APPLICATION_JSON);
		supportedMediaTypes.add(MediaType.TEXT_PLAIN);
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setObjectMapper(new HibernateAwareObjectMapper());
		converter.setPrettyPrint(true);
		converter.setSupportedMediaTypes(supportedMediaTypes);
		converters.add(converter);
		super.configureMessageConverters(converters);
	}

}