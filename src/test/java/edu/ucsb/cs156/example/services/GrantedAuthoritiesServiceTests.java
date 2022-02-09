package edu.ucsb.cs156.example.services;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;

@ExtendWith(SpringExtension.class)
@EnableConfigurationProperties(value = SystemInfoServiceImpl.class)
@Import(TestConfig.class)
@ContextConfiguration
class GrantedAuthoritiesServiceTests {

  @MockBean
  UserRepository userRepository;

  @Autowired
  GrantedAuthoritiesService grantedAuthoritiesService;

  @WithMockUser(roles = { "USER" })
  @Test
  void test_getGrantedAuthorities() {
    // act 
    Collection<? extends GrantedAuthority> grantedAuthorities = grantedAuthoritiesService.getGrantedAuthorities();
 
    // assert

    assertTrue(grantedAuthorities.size() > 0 );
  }

}
