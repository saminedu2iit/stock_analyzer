import './../Styles/Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() { 
    return (
        <div id="navbar_div">
            <div id="navbar_links_holder_div">

            <span className='navbar_div_link_span'> <Link to='/'>Home</Link></span>
            <span className='navbar_div_link_span'> <Link to='/about'>About</Link></span>
            <span className='navbar_div_link_span'> <Link to='/learn'>Learn</Link></span>
            

            </div>
            
        </div>
    )
}

export default Navbar;