import { FaTooth } from 'react-icons/fa'
import '../App.css'
function Header() {
  return (
    <div className="header-container">
      <header className="inner-header">
        <div className="tooth-logo">
          <FaTooth />
        </div>
        <div className="brand">Dentistimo</div>
      </header>
    </div>
  )
}

export default Header
