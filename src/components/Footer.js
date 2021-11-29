import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import '../App.css';
const Footer = () => {
  return (
    <div>
    <Navbar bg="gradient" variant="dark" fixed="bottom">
      <Container>
        <Navbar className="justify-content-center" href="#"> 
          Team 9 
        </Navbar>
        <Navbar className="justify-content-end" href="#search">
        © 2021
        </Navbar>
      </Container>
    </Navbar>
  </div>
  )
}
export default Footer
