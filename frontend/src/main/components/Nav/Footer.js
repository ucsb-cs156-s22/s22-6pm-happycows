import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light pt-3 pt-md-4 pb-4 pb-md-5">
      <Container>
        <p>
          This is a sample webapp using React with a Spring Boot backend.
        </p>
      </Container>
    </footer>
  );
}