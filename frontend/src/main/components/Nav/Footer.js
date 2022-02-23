import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light pt-3 pt-md-4 pb-4 pb-md-5">
      <Container>
        <p data-testid="footer-content">
          HappierCows is a project of <a href="https://devries.chem.ucsb.edu/mattanjah-de-vries">Mattanjah de Vries</a>, 
          Distinguished Professor of Chemistry at UC Santa Barbara. 
          The open source code is available on <a href="https://github.com/ucsb-cs156-w22/HappierCows">GitHub</a>. 
        </p>
        
      </Container>
    </footer>
  );
}