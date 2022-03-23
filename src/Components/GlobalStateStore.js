import { createContext, useState } from "react";

export const GlobalStateStore = createContext();

export const GlobalStateStoreData = (props) => {

    let [stockTechnicalChart, setStockTechnicalChart] = useState('NAM');
    let [p1, setp1] = useState([1,2,3,4,5]);
    let [p2, setp2] = useState([11, 12, 13, 14, 15]);
    let [navbarMsg,setNavbarMsg] = useState('')
    
    

  
    return (
        
        <GlobalStateStore.Provider value={[stockTechnicalChart, setStockTechnicalChart,p1, setp1,p2, setp2,navbarMsg,setNavbarMsg]}>
            {props.children}
        </GlobalStateStore.Provider>
    );
};

