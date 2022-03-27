import Homepage from './Components/Homepage';
import './App.css';
import './Components/Navbar'
import Navbar from './Components/Navbar';
import { BrowserRouter,Route, Router } from 'react-router-dom';
import TechnicalChart from './Components/TechnicalChart';
import { GlobalStateStore, GlobalStateStoreData } from './Components/GlobalStateStore';
import About from './Components/About';
import Learn from './Components/Learn';
import Screener from './Components/Screener';
import News from './Components/News'

function App() {

  let API_key_main = process.env.REACT_APP_API_KEY;
  return (
    <GlobalStateStoreData>
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        {/* <Route exact path="/technicalChart" component={TechnicalChart}></Route>
        <Route exact path="/" component={Homepage}></Route> */}
     
          {/* <Homepage/> */}

          <Route exact path="/about" render={() => { 
            return (
              <>
              
                {/* <Navbar /> */}
                <About />
              </>);
          }}>

          </Route>

          <Route exact path="/stock_analyzer" render={() => {
            return (
              <>
              {/* <Navbar /> */}
                <Homepage API_key={process.env.REACT_APP_API_KEY}/>
                <TechnicalChart />
                {/* <News/> */}
            </>
              
            )
           
          }}>
          </Route>
          
          <Route exact path="/screener" render={() => {
            return (
              <>
              {/* <Navbar /> */}
              
                <Screener />
                {/* <News/> */}
            </>
              
            )
           
          }}>
            </Route>

      <Route exact path="/learn" render={() => {
            return (
              <>
              {/* <Navbar /> */}
              <Learn />
              
            </>
              
            )
           
          }}> 

          </Route>


         
         
      </div>
      </BrowserRouter>
      </GlobalStateStoreData>
  );
}

export default App;
