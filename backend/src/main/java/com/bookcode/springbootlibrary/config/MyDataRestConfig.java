package com.bookcode.springbootlibrary.config;

import com.bookcode.springbootlibrary.entity.Book;
import com.bookcode.springbootlibrary.entity.History;
import com.bookcode.springbootlibrary.entity.Message;
import com.bookcode.springbootlibrary.entity.Payment;
import com.bookcode.springbootlibrary.entity.Review;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
  private String theAllowedOrigins = "https://localhost:3000";

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

    config.exposeIdsFor(Book.class);
    config.exposeIdsFor(Review.class);
    config.exposeIdsFor(History.class);
    config.exposeIdsFor(Message.class);
    
    disableHttpMethods(Book.class, config, theUnsupportedActions);
    disableHttpMethods(Review.class, config, theUnsupportedActions);
    disableHttpMethods(History.class, config, theUnsupportedActions);
    disableHttpMethods(Message.class, config, theUnsupportedActions);

    
    /*configure cors mapping */
    cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins).allowedHeaders("*");

  }

  private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
    config.getExposureConfiguration()
      .forDomainType(theClass)
      .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
      .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }
}