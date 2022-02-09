import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole} from "main/utils/currentUser";

export default function AppNavbar({currentUser, systemInfo, doLogout}) { 
  return (
    <Navbar expand="xl" variant="dark" bg="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Example
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-between">
          <Nav className="mr-auto">
            {
              hasRole(currentUser,"ROLE_ADMIN") && (
                <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown" >
                  <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                </NavDropdown>
              )
            }
          </Nav>

          <>
           {/* be sure that each NavDropdown has a unique id and data-testid  */}
          </>

          <Nav className="mr-auto">
            {
              hasRole(currentUser,"ROLE_USER") && (
                <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown" >
                  <NavDropdown.Item href="/todos/list">List Todos</NavDropdown.Item>
                  <NavDropdown.Item href="/todos/create">Create Todo</NavDropdown.Item>
                </NavDropdown>
              )
            }
          </Nav>

          <Nav className="me-auto">
            {
              systemInfo?.springH2ConsoleEnabled && (
                <>
                   <Nav.Link href="/h2-console">H2Console</Nav.Link>
                </>
              ) 
            }
            {
              systemInfo?.showSwaggerUILink && (
                <>
                   <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                </>
              ) 
            }
          </Nav>

          <Nav className="ml-auto">
            {
              currentUser && currentUser.loggedIn ? (
                <>
                  <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                  <Button onClick={doLogout}>Log Out</Button>
                </>
              ) : (
                <Button href="/oauth2/authorization/google">Log In</Button>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  );
}