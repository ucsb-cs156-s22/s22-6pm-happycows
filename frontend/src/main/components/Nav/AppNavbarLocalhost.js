import { Container, Nav, Navbar } from "react-bootstrap";

export default function AppNavbarLocalhost({url}) {
  return (
    <>
      <Navbar expand="sm" bg="warning" sticky="top" data-testid="AppNavbarLocalhost">
        <Container>
          <Navbar.Brand href="http://localhost:8080">
            Warning
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-between">

            <Nav className="mr-auto text-center">
              <Nav.Item className="text-center">
                <p>
                  Running on <code>{ url }</code> with no backend.<br />
                  You probably want <a href="http://localhost:8080">http://localhost:8080</a> instead.
                </p>
              </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  );
}