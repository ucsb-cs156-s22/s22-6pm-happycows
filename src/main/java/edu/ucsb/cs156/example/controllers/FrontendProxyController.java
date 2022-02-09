package edu.ucsb.cs156.example.controllers;

import org.springframework.cloud.gateway.mvc.ProxyExchange;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import java.net.ConnectException;

@Profile("development")
@RestController
public class FrontendProxyController {
  @GetMapping({"/", "/{path:^(?!api|oauth2|swagger-ui).*}/**"})
  public ResponseEntity<String> proxy(ProxyExchange<String> proxy) {
    String path = proxy.path("/");
    try {
      return proxy.uri("http://localhost:3000/" + path).get();
    } catch (ResourceAccessException e) {
      if (e.getCause() instanceof ConnectException) {
        String instructions = """
                <p>Failed to connect to the frontend server...</p>
                <p>On Heroku, be sure that <code>PRODUCTION</code> is defined.</p>
                <p>On localhost, open a second terminal window, cd into <code>frontend</code> and type: <code>npm install; npm start</code></p>
                <p>Or, you may click to access: </p>
                <ul>
                  <li><a href='/swagger-ui/index.html'>/swagger-ui/index.html</a></li>
                  <li><a href='/h2-console'>/h2-console</a></li>
                </ul>""";

        return ResponseEntity.ok(instructions);
      }
      throw e;
    }
  }
}
