# Environment Variables are set up in `.env.SAMPLE`

Any environment variables  needed in the application should be put into `.env.SAMPLE`
* This is particularly true for secret or sensitive ones such as credentials, api-keys, etc; these should not be
  directly entered into `.properties` files that are committed to the repo.
* The `.env.SAMPLE` file should never contain an *actual* value for any secret, but should instead contain 
  placeholder values; for example:
  ```
  GOOGLE_CLIENT_ID=put-client-id-here
  ```
* the file `.env.SAMPLE` *should* be committed to the GitHub repo.

The actual values go into a file `.env` that is copied from `.env.SAMPLE`, but that is NOT committed to the repo.
* `.env` goes into your `.gitignore`
* If you need to exchange secrets with other members of your team, consider doing so in private DMs on Slack rather than,
  for example, a message in your team's public slack channel.

# Environment Variables should have default values

When adding new properties to the application that are necessary for the application to run, it is
helpful to have fallback values, especially if those values are not accessed during tests.

As an example, in `src/main/resources/application.properties`, we see lines that contain fallback values for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `ADMIN_EMAILS`:

```
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:${env.GOOGLE_CLIENT_ID:client_id_unset}}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:${env.GOOGLE_CLIENT_SECRET:client_secret_unset}}
spring.security.oauth2.client.registration.google.scope=email,profile
...
app.admin.emails=${ADMIN_EMAILS:${env.ADMIN_EMAILS:phtcon@ucsb.edu}}
```

The fallback values, in this case being:

| Env variable | Default Value |
|--------------|---------------|
| `GOOGLE_CLIENT_ID` | `client_id_unset` |
| `GOOGLE_CLIENT_SECRET` | `client_secret_unset` |
| `ADMIN_EMAILS` | `phtcon@ucsb.edu` |

While the values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` will not work in practice (i.e. with these values, OAuth login 
will fail), having a default value:
* avoids the error that the Spring Boot application fails to load because a specific environment variable is undefined.
* allows the test suite to run (since actual the actual OAuth protocol exchange is not part of any tests, but code that
  requires those values to *have some non-null value* is run as part of the tests.

It is recommended that if/when any additional environment variables are added to `.env.SAMPLE` that 
similar fallback values be included in the `.properties` files.



