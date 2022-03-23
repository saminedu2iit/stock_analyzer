import { createContext, useState } from "react";

export const GlobalStateStore = createContext();

export const GlobalStateStoreData = (props) => {

    let [stockTechnicalChart, setStockTechnicalChart] = useState('Stock Name');
    let [p1, setp1] = useState([1,2,3,4,5]);
    let [p2, setp2] = useState([11, 12, 13, 14, 15]);
    let [navbarMsg, setNavbarMsg] = useState('');
    let [newsArray,setNewsArray] = useState([1,2,3,4,5,6,7,8,9,10])
  
    
    

  
    return (
        
        <GlobalStateStore.Provider value={[stockTechnicalChart, setStockTechnicalChart,p1, setp1,p2, setp2,navbarMsg,setNavbarMsg,newsArray,setNewsArray]}>
            {props.children}
        </GlobalStateStore.Provider>
    );
};

