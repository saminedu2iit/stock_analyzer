import './../Styles/News.css'
import { useContext } from 'react';
import { GlobalStateStore } from './GlobalStateStore';

function News() {

    

    let [stockTechnicalChart, setStockTechnicalChart, p1, setp1, p2, setp2,navbarMsg,setNavbarMsg,chartPeriodGlobal, setChartPeriodGlobal,newsArray,setNewsArray] = useContext(GlobalStateStore);
    return (
        <div id="news_div">
            <div id="news_item_1"></div>
            <div id="news_item_2"></div>
            <div id="news_item_3"></div>
        </div>
    )
 }

export default News;