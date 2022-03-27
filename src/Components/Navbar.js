import './../Styles/Navbar.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalStateStore } from "./GlobalStateStore";

function Navbar() { 

    let [stockTechnicalChart, setStockTechnicalChart, p1, setp1, p2, setp2, navbarMsg, setNavbarMsg,chartPeriodGlobal, setChartPeriodGlobal] =  useContext(GlobalStateStore);
    
    return (
        <div id="navbar_div">
            <div id="navbar_links_holder_div">

            <span className='navbar_div_link_span'> <Link to='/stock_analyzer'>Home</Link></span>
            <span className='navbar_div_link_span'> <Link to='/screener'>Screener</Link></span>
            <span className='navbar_div_link_span'> <Link to='/about'>About</Link></span>
            <span className='navbar_div_link_span'> <Link to='/learn'>Learn</Link></span>
            

            </div>

            <span id="navbar_messagebox">{navbarMsg}</span>
            <span id="index_cmp"></span>
            
        </div>
    )
}

export default Navbar;