import './../Styles/Screener.css';
import { useState } from 'react';



function Screener() {

    let [marketCapInputScreener, setMarketCapInputScreener] = useState('');
    let [dividendInputScreener, setDividendInputScreener] = useState('');
    let [countryInputScreener, setCountryInputScreener] = useState('');
    let [exchangeInputScreener,setExchangeInputScreener] = useState('')
    let [sectorInputScreener,setSectorInputScreener] = useState('')
    function onChangeMarketCapHandle(e) { 
        setMarketCapInputScreener(e.target.value);
    }

    function onChangeDividendHandle(e) {
        
        setDividendInputScreener(e.target.value);
    }
    function onChangeCountryHandle(e) { 
        setCountryInputScreener(e.target.value);
    }
    function onChangeExchangeHandle(e) { 
        setExchangeInputScreener(e.target.value)
    }

    function onChangeSectorHandle(e) { 

        setSectorInputScreener(e.target.value)

    }
    
    return (
        <div id="screener_div">
            <div id="screener_div_header">
                

                <h4>Show me stocks which has</h4>
                <div id="screener_div_header_sub_1">

                    Market Cap More Than
                    <input type="text" id="market_cap_screener_input" value={marketCapInputScreener} onChange={onChangeMarketCapHandle}></input>
                    Dividend More Than
                    <input type="text" id="dividend_screener_input" value={dividendInputScreener} onChange={onChangeDividendHandle}></input>
                    Country
                    <input type="text" id="country_screener_input" value={countryInputScreener} onChange={onChangeCountryHandle}></input>
                    Exchange
                    <input type="text" id="exchange_screener_input" value={exchangeInputScreener} onChange={onChangeExchangeHandle}></input>
                </div>
                <div id="screener_div_header_sub_2">
                    Sector
                    <input type="text" id="sector_screener_input" value={sectorInputScreener} onChange={onChangeSectorHandle}></input>
                </div>
            </div>
            <div id="screener_div_body">
               <h1>!!! PAGE UNDER CONSTRUCTION !!!</h1>
            </div>
        </div>
    )



}


export default Screener;