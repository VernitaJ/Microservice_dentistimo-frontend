import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Test from './Test'
import '../App.css';
function Header() {
    
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Test />
          <Navbar.Brand className="justify-content-start" href="#home"> 
            Dentistimo
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#search">Search dentist</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
