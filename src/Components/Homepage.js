import './../Styles/Homepage.css'
import { useState,useMemo, useEffect } from 'react';
import SearchSuggestions from './SearchSuggestions';
import TechnicalChart from './TechnicalChart'
import { populateStockPeers,populateStockHeaderInfo,populateTechnicalAnalysis,populateFinancialInformation,styleNavbarMessageBox,generateSuggestions,populateExahangeCMPinNavbar } from './../Utilities/HomepageUtilities';
import { addToLocalStorageWatchList, getWatchlistArrayFromLocalStorage, LocalStorageRemoveItem } from '../Utilities/LocalStorageUtilities.js';
import { Link } from 'react-router-dom';
import Watchlist from './Watchlist';
import { useContext } from "react";
import { GlobalStateStore } from "./GlobalStateStore";
import { getArrayOfDailyClosingPrice } from './../Utilities/TechnicalCartUtilities';
import StockSuggestions from './StockSuggestions';
import News from './News'


let API_key = "6ce511bda188cc745eb33e6ad907c5ec";

function Homepage() {

   
   


    let [inputStock, setInputStock] = useState('');
    let [inputExchange, setInputExchange] = useState('NSE')
    let [stockSearchSuggestions, setStockSearchSuggestions] = useState([]);
    let [currentDisplayedStock, setCurrentDisplayedStock] = useState({});
    let [updateLocalStorageRequired, setUpdateLocalStorageRequired] = useState(false);
    let [watchlistItems, setWatchListItems] = useState([2, 4, 5]);
    let [isWatchlistLoaded, setIsWatchlistLoaded] = useState(false);
    let [isPageLoadingForFirstTime, setIsPageLoadingForFirstTime] = useState(true);
    let [chartPeriod, setChartPeriod] = useState('90_days');
    let [suggestionsList, setSuggestionsList] = useState([])

    let [stockTechnicalChart, setStockTechnicalChart, p1, setp1, p2, setp2,navbarMsg,setNavbarMsg,chartPeriodGlobal, setChartPeriodGlobal] = useContext(GlobalStateStore);

    if (isWatchlistLoaded === false) {
        let watchlistArray = getWatchlistArrayFromLocalStorage();
        setWatchListItems(watchlistArray);
        setIsWatchlistLoaded(true)
    

    }

    useEffect(() => {
        styleNavbarMessageBox(20);

        
        document.querySelector('#add_to_watchlist_button').style.visibility = "hidden";
        document.querySelector('#stock_header_span_2').visibility = "hidden";
    
        
        setNavbarMsg("WELCOME !");

        setTimeout(() => {
            document.querySelector('#stock_input').focus();
            setNavbarMsg("Start your stock analyis by typing your stock name");
            setTimeout(() => {
                setNavbarMsg("");
                // document.querySelector('#stock_input').blur();
            }, 6000)
    
        }, 3000)
    },[])
    
    let memoizedWatchlist = useMemo(() => {
        return (<Watchlist watchlistItems={watchlistItems}
            setInputStock={setInputStock}
            searchStockHandle={searchStockHandle2}
            removeItemFromWatchlist={removeItemFromWatchlist} />)
    }, [watchlistItems, isPageLoadingForFirstTime])

    

    let memoizedStockSuggestions = useMemo(() => {
        return (<StockSuggestions suggestionsList={suggestionsList} />
            
        )
    }, [suggestionsList])
   


    

    
    function testFunc() { 
        console.log("actual debounce")
    }
    const debounceGenerateStockSuggestions = function (fn, delay) {
        
        let timeoutID;
        console.log("debounce called")

        return function (...args) { 

            if (timeoutID) { 
                clearTimeout(timeoutID)
            }

            timeoutID = setTimeout(() => {
                fn(...args)
             },delay)
        }
        

    }
   
    let populateExchangeCMPinterval = setInterval(() => {
        populateExahangeCMPinNavbar(inputExchange, API_key);
    }, 10000);
    function generatStockSuggestions(input_stock) { 
        if (input_stock.length > 0) {
            let stock_suggestions_link = `https://fmpcloud.io/api/v3/search?query=${inputStock}&limit=10&exchange=${inputExchange}&apikey=${API_key}`
    
            let promise1 = fetch(stock_suggestions_link);
            promise1.then((intermediate_data) => {
                let promise2 = intermediate_data.json();
                promise2.then((json_data) => {
                   // console.log(json_data);
                   // debounceGenerateStockSuggestions((e) => { console.log("search") }, 3000)
                   // debounceGenerateStockSuggestions((e) => {setStockSearchSuggestions(json_data)},3000)
                    setStockSearchSuggestions(json_data)
                })
            })
    
        }
        else { 
            setStockSearchSuggestions([])
        }
        

    }

    

    function inputStockHandle(e) {

        //make the stock name as uppercase
        let input_stock = e.target.value.toUpperCase();
        generatStockSuggestions(input_stock)
      
        setInputStock(input_stock);

        //debounceGenerateStockSuggestions(testFunc, 2000);
        
              

    

       
    }
    if (isWatchlistLoaded === false) { 
        let watchlistArray = getWatchlistArrayFromLocalStorage();    
        setWatchListItems(watchlistArray);
        setIsWatchlistLoaded(true)
    

    }


    if (stockSearchSuggestions.length > 0) {
        //console.log("stockSearchSuggestions = ", stockSearchSuggestions);
    }
   
    function searchStockHandle() { 
       // console.log("Search for - ", inputStock);
        setStockSearchSuggestions([]);
       
        
        

        if (inputStock === "") {
            alert("Error ! Search bar is empty. Please enter stock name to search");
            
        }
        else {
            getArrayOfDailyClosingPrice(inputStock,setp1,setp2,chartPeriod);
            
            setStockTechnicalChart(inputStock);
            
            let RSI_link = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+inputStock + "?period=10&type=rsi&apikey=" + API_key
            let API_link_stock_intro = "https://fmpcloud.io/api/v3/profile/" + inputStock + "?apikey=" + API_key;
            let stock_52_high_52_low_link = "https://fmpcloud.io/api/v3/quote/" + inputStock + "?apikey=" + API_key;
            let API_link_200_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+inputStock+"?period=200&type=sma&apikey=" + API_key
            let API_link_20_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+inputStock+"?period=20&type=sma&apikey=" + API_key
            let API_link_50_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/" + inputStock + "?period=50&type=sma&apikey=" + API_key;
            let quarterly_income_statement_link = "https://fmpcloud.io/api/v3/income-statement/" + inputStock + "?period=quarter&limit=8&apikey=" + API_key;
            let cash_from_operating_activities_link = "https://fmpcloud.io/api/v3/cash-flow-statement/" + inputStock + "?limit=10&apikey=" + API_key;
            let stock_peers_link = "https://fmpcloud.io/api/v4/stock_peers?symbol="+inputStock+"&apikey="+ API_key;


            
            populateStockHeaderInfo(API_link_stock_intro, stock_52_high_52_low_link,setSuggestionsList,navbarMsg,setNavbarMsg);
            //console.log("DISPLAYING :", currentDisplayedStock);
            populateTechnicalAnalysis(API_link_200_sma, API_link_50_sma, API_link_20_sma, isPageLoadingForFirstTime,RSI_link);
            populateFinancialInformation(isPageLoadingForFirstTime, quarterly_income_statement_link, cash_from_operating_activities_link);
            populateStockPeers(stock_peers_link);
            //generateSuggestions(setSuggestionsList)


            if (isPageLoadingForFirstTime === true) {
                setIsPageLoadingForFirstTime(false)

            }
            
        }
    }

    function searchStockHandle2(stock) { 
        // console.log("Search for - ", inputStock);
        setStockSearchSuggestions([]);
        getArrayOfDailyClosingPrice(stock,setp1,setp2,chartPeriod);
            
        setStockTechnicalChart(stock);
        setInputStock(stock)
        
 
        
             let RSI_link = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+stock + "?period=10&type=rsi&apikey=" + API_key
             let API_link_stock_intro = "https://fmpcloud.io/api/v3/profile/" + stock + "?apikey=" + API_key;
             let stock_52_high_52_low_link = "https://fmpcloud.io/api/v3/quote/" + stock + "?apikey=" + API_key;
             let API_link_200_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+stock+"?period=200&type=sma&apikey=" + API_key
             let API_link_20_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/"+stock+"?period=20&type=sma&apikey=" + API_key
             let API_link_50_sma = "https://fmpcloud.io/api/v3/technical_indicator/daily/" + stock + "?period=50&type=sma&apikey=" + API_key;
             let quarterly_income_statement_link = "https://fmpcloud.io/api/v3/income-statement/" + stock + "?period=quarter&limit=8&apikey=" + API_key;
             let cash_from_operating_activities_link = "https://fmpcloud.io/api/v3/cash-flow-statement/" + stock + "?limit=10&apikey=" + API_key;
             let stock_peers_link = "https://fmpcloud.io/api/v4/stock_peers?symbol="+stock+"&apikey="+ API_key;
 
 
 
             populateStockHeaderInfo(API_link_stock_intro, stock_52_high_52_low_link,setSuggestionsList,navbarMsg,setNavbarMsg);
             //console.log("DISPLAYING :", currentDisplayedStock);
             populateTechnicalAnalysis(API_link_200_sma, API_link_50_sma, API_link_20_sma, isPageLoadingForFirstTime,RSI_link);
             populateFinancialInformation(isPageLoadingForFirstTime, quarterly_income_statement_link, cash_from_operating_activities_link);
             populateStockPeers(stock_peers_link);
 
 
             if (isPageLoadingForFirstTime === true) {
                 setIsPageLoadingForFirstTime(false)
 
             }
             
         
     }

    


    function removeItemFromWatchlist(indexToRemoveItem) { 

        let filteredArray = watchlistItems.filter((element, index) => index != indexToRemoveItem);
        //console.log(filteredArray);
        //console.log("HELLO");
        setWatchListItems(filteredArray);
        addToLocalStorageWatchList(filteredArray);
    }
    function generateStringForStockObject(stock_obj) { 
        let stock_as_string = "";
        stock_as_string += '{';
        stock_as_string += stock_obj['currentStockSymbol'];
        stock_as_string += '}';
        stock_as_string += '[';
        stock_as_string += stock_obj['currentStockExchange'];
        stock_as_string+=']'

        return stock_as_string;

    }
    
    function addToWatchlistHandle() {
        // setUpdateLocalStorageRequired(true);
        // LocalStorageRemoveItem('watchlistArrayAsList');
        //console.log("type8 = ",typeof watchlistItems)
        // console.log("Add to watchlist");
        //let objToString = JSON.stringify(currentDisplayedStock);
        // console.log("stock_as_string = ", generateStringForStockObject(currentDisplayedStock));
        let stock_as_string = generateStringForStockObject(currentDisplayedStock);
        // if (stock_as_string in watchlistItems) {
        //     alert("Already present")
        // }
        // console.log("STRINGED = ", objToString)
        
        if (watchlistItems.includes(stock_as_string)) {
            alert(`${inputStock} is already present in watchlist`)
        }
        else { 
            if (watchlistItems.length===0) {
                setWatchListItems([stock_as_string]);
            }
            else {
              //  console.log("Type of watchlistItems1 - ",watchlistItems)
                let copyList = [...watchlistItems]
                copyList.push(stock_as_string);
                setWatchListItems(copyList);
            }
         
            
            setUpdateLocalStorageRequired(true);

        }
        
        
        
        
        

    }
    if (updateLocalStorageRequired === true) { 
        addToLocalStorageWatchList(watchlistItems);

        console.log("Updaetd watchlist - ", watchlistItems, "length = ", watchlistItems.length, "type = ",typeof watchlistItems);
        setUpdateLocalStorageRequired(false)
    }


    return (

       

        <div id="homepage_container">
            <div id="homepage_container_top">
                <div id="homepage_container_top_left">

                    <div id="stock_searchbar">
                        <div id="stock_search_bar_top">
                            <span className='entity_description'>Stock</span>
                            <input type="text" id="stock_input" value={inputStock} onChange={inputStockHandle} placeholder="Enter stock name"></input>    
                            <span className='entity_description'>Exchange</span>
                            <select id="exchange_dropdown" value={inputExchange} onChange={(e) => { setInputExchange(e.target.value)}}>
                                <option value="NSE">NSE</option>
                                <option value="XETRA">XETRA</option>
                                <option value="NASDAQ">NASDAQ</option>
                            </select>
                            <span className='entity_description'> Chart Period</span>
                            <select id="exchange_dropdown" value={chartPeriod} onChange={(e) => { setChartPeriod(e.target.value) }}>
                            <option value="90_days">90 days</option>
                                <option value="1_week">1 week</option>
                                <option value="1_month">1 month</option>
                                <option value="200_days">200 days</option>
                                <option value="365_days">365 days</option>
                            </select>
                            <input type="button" id="stock_search_button" value="Search" onClick={searchStockHandle}></input>
                        </div>
                        <div id="stock_search_bar_bottom">
                            <SearchSuggestions suggestion_list={stockSearchSuggestions}
                                setInputStock={setInputStock}
                                setStockSearchSuggestions={setStockSearchSuggestions}
                                setCurrentDisplayedStock={setCurrentDisplayedStock} />
                            
                            {/* <Link to="/technicalChart" target="_blank">Technical Chart</Link> */}
                        </div>
                    </div>
                    <div id="stock_info_header">
                        <div id="stock_info_header_left">
                        <img src = "" id="company_logo_img" alt="COMPANY LOGO"></img>
                        </div>
                        <div id="stock_info_header_right">
                            <div id="stock_info_header_right_row_1">
                            <span id="stock_header_span_0"></span>
                                <span id="stock_header_row_1_span2">
                                    <input type="button" id="add_to_watchlist_button" readOnly value="Add to Watchlist" onClick={addToWatchlistHandle}></input>
                                </span>
                            </div>
                            <div id="stock_info_header_right_row_2">

                            <span id="stock_header_span_1"></span>
                                <span id="stock_header_span_22"><a id ="stock_header_span_2" href="" target ="_blank">official website</a></span>
                            </div>
                            <div id="stock_info_header_right_row_3">
                            <span id="stock_header_span_3"></span>
                                <span id="stock_header_span_4"></span>
                                <span id="stock_header_span_5"></span>

                            </div>
                            <div id="stock_info_header_right_row_4">
                            <span id="stock_header_span_temp"><span id="stock_header_span_6"></span>
                                    <span id="stock_header_span_7"></span>
                                </span>
                            
                                <span id="stock_header_span_8"></span>
                                <span id="stock_header_span_9"></span>
                            </div>
                        </div>
                    </div>
                    <div id="stock_line_info">
                    <div id="stock_line_info_left" name="technical_analysis_section">
                            <div id="technical_analysis_title">
                                <b>Simple Moving Average</b>
                            </div>
                            <div id="technical_analysis_body">

                            </div>
                        </div>
                        <div id="stock_line_info_right">
                            <div id="stock_line_info_right_top">Financial information comes here</div>
                            <div id="stock_line_info_right_bottom"></div>
                            
                        </div>
                    </div>
                </div>
                <div id="homepage_container_top_right">
                    <div id="watchlist_title">WATCHLIST</div>
                    {/* <Watchlist watchlistItems={watchlistItems}
                        setInputStock={setInputStock}
                        searchStockHandle={searchStockHandle2}
                        removeItemFromWatchlist={ removeItemFromWatchlist}/> */}
                    {memoizedWatchlist}
                    
                </div>
            </div>
            <div id="homepage_container_bottom">
                <div id="homepage_container_bottom_left">
                    <div id="homepage_container_bottom_left_header">SUGGESTIONS</div>
                    <div id="homepage_container_bottom_left_body">
                        {memoizedStockSuggestions}
                    </div>
                </div>
                <div id="homepage_container_bottom_right">
                    <div id="homepage_container_bottom_right_header">PEERS</div>
                    <div id="homepage_container_bottom_right_body"></div>
                </div>
                
            </div>
            
        </div>
    )


}

export default Homepage;