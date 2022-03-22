let copyStockSuggestions = [];

function getExchangeExtentionAndSymbol(exchange_dropdown) { 

    let stock_name_extention;
    let stock_exchange_symbol;

    let arrayOfExchangeInfo = [];

    if (exchange_dropdown == "NSE") {
        stock_name_extention = ".NS";
        stock_exchange_symbol="^NSEI"
    
    }
    else if (exchange_dropdown == "NASDAQ") {
        stock_name_extention = "";
        stock_exchange_symbol = "^NDX";
    }
    else if (exchange_dropdown == "XETRA") { 
        stock_name_extention = ".DE"
        stock_exchange_symbol = "^GDAXI";
    }
    else if (exchange_dropdown == "MCE")
    {
        stock_name_extention = ".MC"
        stock_exchange_symbol = "^IBEX";
    }
    
    return [stock_name_extention, stock_exchange_symbol];

}

//defining arrayOfDataForHeader globally so that the other functions will be able to use this array
let arrayOfDataForHeader = [];

async function populateStockHeaderInfo(link1, link2,setSuggestionsList) {

    

    // arrayOfDataForHeader will have data in following index

    // 0. company_name
    // 1. industry
    // 2. official website
    // 3. exchange
    // 4. market cap
    // 5. stock currency
    // 6. cmp
    // 7. percentageChange
    // 8. 52 week yearHigh
    // 9. 52 week yearLow
    // 10 company logo
    
    setSuggestionsList(["LOADING......"])
    copyStockSuggestions = [];
    let promise1 = fetch(link1);
    await promise1.then((intermediate_data) => {
        let promise2 = intermediate_data.json();
        promise2.then((real_data) => {

           
           
            let cmp = real_data[0]['price'];
            let market_cap = real_data[0]['mktCap'];
            market_cap = (market_cap / 10000000).toFixed(2);
            let company_name = real_data[0]['companyName'];
            let currency = real_data[0]['currency'];
            let exchange = real_data[0]['exchangeShortName'];
            let industry = real_data[0]['industry'];
            let official_website = real_data[0]['website'];
            let company_logo = real_data[0]['image'];


            arrayOfDataForHeader[0] = company_name;
            arrayOfDataForHeader[1] = industry;
            arrayOfDataForHeader[2] = official_website;
            arrayOfDataForHeader[3] = exchange;
            arrayOfDataForHeader[4] = market_cap;
            arrayOfDataForHeader[5] = currency;
            arrayOfDataForHeader[6] = cmp;
            arrayOfDataForHeader[7] = '';
            arrayOfDataForHeader[8] = '';
            arrayOfDataForHeader[9] = '';
            arrayOfDataForHeader[10] = company_logo;
            


        })
    })

    let promise3 = fetch(link2);
   await promise3.then((intermediate_data) => {
        let promise4 = intermediate_data.json();
       promise4.then((real_data) => {
       
            let _52_week_high = real_data[0]['yearHigh'];
            let _52_week_low = real_data[0]['yearLow'];
           let percentageChange = real_data[0]['changesPercentage'];
           let arrowSymbol;
           if (percentageChange > 0) {
               arrowSymbol = "↑";
               
           }
           else if (percentageChange < 0) { 
               arrowSymbol = '↓';
           }
            percentageChange = "(" + arrowSymbol + percentageChange.toFixed(2) + ")";

            
            arrayOfDataForHeader[7] = percentageChange;
            arrayOfDataForHeader[8] = _52_week_high;
            arrayOfDataForHeader[9] = _52_week_low;
            console.log("ASSIGNED")
        })
    })

    setTimeout(() => {
       
        generateHeaderStructure(arrayOfDataForHeader);
        populateCompanyLogo(arrayOfDataForHeader[10]);

        setTimeout(() => {
            generateSuggestions(setSuggestionsList);
         },4000)
       
    }, 1000);
    
    
}

function generateHeaderStructure(arrayOfData) {
   
    
    let span_id = "stock_header_span_";
    let current_span_id = "";
    let entity_name;

    for (let i = 0; i < 10; i++) { 
        current_span_id = '#' + span_id + i;
        
        entity_name = getEntityNameForStockHeaderInfo(i)




        if (i == 2) {
            document.querySelector(current_span_id).href = arrayOfData[i];
        }
        else if (i == 4)
        { 
            document.querySelector(current_span_id).innerHTML = entity_name + arrayOfData[i] + " Cr";
        }
            
        else {
            document.querySelector(current_span_id).innerHTML = entity_name + arrayOfData[i];
        }
    }    

}

function getEntityNameForStockHeaderInfo(i) {
    let entity_name;

    if (i == 0)
    {
        entity_name = "";

        }
    else if (i == 1) {
        entity_name = "Industry : ";
    }
    else if (i == 3) { 
        entity_name = "Exchange : ";
    }
    else if (i == 4) { 
        entity_name = "Market Cap : ";
    }
    else if (i == 5) { 
        entity_name = "Currency : ";
    }

    else if (i == 6) { 
        entity_name = "CMP : ";
    }
    else if (i == 7)
    {
        entity_name = "";
        }

    else if (i == 8) { 
        entity_name = "52 week high : ";
    }
    else if (i == 9) { 
        entity_name = "52 week low : ";
    }

   
    return entity_name;

    
 }
    
function populateCompanyLogo(imageLink) {
    document.querySelector('#company_logo_img').src = imageLink;

}

async function populateTechnicalAnalysis(API_link_200_sma, API_link_50_sma, API_link_20_sma, isPageLoadingForFirstTime,RSI_link) { 
    
    
    
    if (isPageLoadingForFirstTime === true) { 
        generateTechnicalAnalysisModuleStructure();

    }
    

    let _200_sma;
    let _50_sma;
    let _20_sma;
    let rsi;

    let promise1 = fetch(API_link_200_sma);
    await promise1.then((intermediate_data) => {

        let promise2 = intermediate_data.json();
        promise2.then((real_data) => { 
            _200_sma = real_data[0]['sma'].toFixed(2);
           
        })
    })

    let promise3 = fetch(API_link_50_sma);
    await promise3.then((intermediate_data) => {

        let promise4 = intermediate_data.json();
        promise4.then((real_data) => { 
            _50_sma = real_data[0]['sma'].toFixed(2);
            
        })
    })

    let promise5 = fetch(API_link_20_sma);
    await promise5.then((intermediate_data) => {

        let promise5 = intermediate_data.json();
        promise5.then((real_data) => { 
            _20_sma = real_data[0]['sma'].toFixed(2);
           
        })
    })

   


    setTimeout(() => {
        let message;

        let technical_analysis_signal;
        let cmp = arrayOfDataForHeader[6];

        if ((_200_sma > _50_sma) && (_50_sma > _20_sma) && (_20_sma > cmp)) {
            technical_analysis_signal = "BUY";
        }
        else if ((_200_sma < _50_sma) && (_50_sma < _20_sma) && (_20_sma < cmp)) {
            technical_analysis_signal = "SELL";
            

        }
        else { 
            technical_analysis_signal = "NEUTRAL";
        }

        let rsi_promsise1 = fetch(RSI_link);
        message = `Technical analysis is giving ${technical_analysis_signal} signal`;
        copyStockSuggestions.push(message)

                                          
        rsi_promsise1.then((intermediate_data) => { 
            let rsi_promise2 = intermediate_data.json();
            rsi_promise2.then((real_data) => {

                let rsi = real_data[0]['rsi'].toFixed(2);
               
                // document.querySelector('#rsa_div').innerText = "RSI : " + rsi;
                // if (rsi < 30) {
                //     suggestion_message.push(`RSI of this stock is ${rsi}, hence its a good time to buy this stock if fundamentals are good`)
                   
                // }
                // else if (rsi > 70) { 
                //     suggestion_message.push(`RSI of this stock is ${rsi}, hence the stock might have risen a lot and might correct in upcoming sessions`)
                // }

                

            })
        })
        
    document.querySelector('#moving_average_table_row1_column_1').innerHTML = "200 days";
    document.querySelector('#moving_average_table_row1_column_2').innerHTML = _200_sma;
    document.querySelector('#moving_average_table_row2_column_1').innerHTML = "50 days";
    document.querySelector('#moving_average_table_row2_column_2').innerHTML = _50_sma;
    document.querySelector('#moving_average_table_row3_column_1').innerHTML = "20 days";
    document.querySelector('#moving_average_table_row3_column_2').innerHTML = _20_sma;
    document.querySelector('#moving_average_table_row4_column_1').innerHTML = "CMP";
    document.querySelector('#moving_average_table_row4_column_2').innerHTML = cmp;
    document.querySelector('#moving_average_table_row5_column_1').innerHTML = "Signal";
    document.querySelector('#moving_average_table_row5_column_2').innerHTML = technical_analysis_signal;
        document.querySelector('#rsi_div').innerHTML = "RSI HT = " + rsi;
        console.log("RSI = ",rsi)
     }, 2000);

    

    

}

function generateTechnicalAnalysisModuleStructure() {
    
    //structure for technical analysis

    let moving_average_table = document.createElement('table');
    


    let movingAverageTableRowArray = [];
    let newRowName = 'moving_average_table_row';

    for (let i = 1; i <= 5; i++) {
        newRowName = 'moving_average_table_row' + i;
        let newRow = document.createElement('tr');
        newRow.setAttribute('id', newRowName);
        movingAverageTableRowArray[i] = newRow;

        let newRowColumnName = 'moving_average_table_row' + i + '_column_1';
        let newRowColumn = document.createElement('td');
        newRowColumn.setAttribute('id', newRowColumnName);
        newRowColumn.style.border = "2px solid black";

        movingAverageTableRowArray[i].appendChild(newRowColumn);

        newRowColumnName = 'moving_average_table_row' + i + '_column_2';
        newRowColumn = document.createElement('td');
        newRowColumn.setAttribute('id', newRowColumnName);
        newRowColumn.style.border = "2px solid black";
        movingAverageTableRowArray[i].appendChild(newRowColumn);

        moving_average_table.appendChild(movingAverageTableRowArray[i])
    }

 
    
    document.querySelector('#technical_analysis_body').append(moving_average_table);

    let RSI_div = document.createElement('div');
    RSI_div.setAttribute('id', 'rsi_div');


    RSI_div.innerHTML = "RSI = ";

    document.querySelector('#technical_analysis_body').append(RSI_div); 
   
    
}

function generateFinancialInformationStructure() {
    
    let financial_info_div_name;
    let div_content_description;
    let sub_div_left;
    let sub_div_right;
    let sub_div_left_id;
    let sub_div_right_id;
    let financial_data_table;
    
    
    for (let i = 0; i < 4; i++) { 
        let new_financial_info_div = document.createElement('div');
        financial_info_div_name = "financial_info_div_";
        financial_info_div_name = financial_info_div_name + i;
        new_financial_info_div.setAttribute('id', financial_info_div_name);

        sub_div_left = document.createElement('div');
        sub_div_left_id = financial_info_div_name + 'sub_div_left';
        sub_div_left.setAttribute('id', sub_div_left_id);
        

        div_content_description = generateFinancialInformationStructure_helper(i);
        sub_div_left.innerHTML = div_content_description;
        


        new_financial_info_div.append(sub_div_left);


        if (i > 0) { 

        sub_div_right = document.createElement('div');
        sub_div_right_id = financial_info_div_name + 'sub_div_right';
            sub_div_right.setAttribute('id', sub_div_right_id);
            
            if (i == 1) { 
                
                financial_data_table = generateCustomEmptyTable(2, 8, "quarterly_net_profit_table_row", "quarterly_net_profit_table_column","quarterly_net_profit_row", "quarterly_net_profit_column", "quarterly_net_profit_table");

            }
            else if (i == 2)
            {
                financial_data_table = generateCustomEmptyTable(2, 8, "cash_from_OA_table_row", "cash_from_OA_table_column", "cash_from_OA_row", "cash_from_OA_column","cash_from_OA_table");
            }
            
            else if (i == 3)
            {
                financial_data_table = generateCustomEmptyTable(2, 8, "revenue_table_row", "revenue_table_column", "revenue_row", "revenue_column","revenue_table");
                }
        
        sub_div_right.append(financial_data_table);
        new_financial_info_div.append(sub_div_right);


        }
        
        
        

        document.querySelector('#stock_line_info_right').append(new_financial_info_div);
        

        

    }

    
    console.log();
     
    

}

function generateFinancialInformationStructure_helper(div_index) {
    
    if (div_index === 0) {
        return "All figures are in Crore"
    }
    else if (div_index === 1) { 
        return "Quarterly Net Profit"
    }
    else if (div_index === 2) { 
        return "Cash from Operating Activities"
    }
    else if (div_index === 3) { 
        return "Revenue"
    }

}

function generateCustomEmptyTable(rows, cols,row_id_prefix,column_id_prefix,row_class_name,column_class_name,table_id) {

    let new_table = document.createElement('table');
    new_table.setAttribute('id',table_id)
    let row_id;
    let column_id;

    for (let i = 0; i < rows; i++) {
        
        let new_row = document.createElement('tr');
        row_id = row_id_prefix + '_' + i;
        new_row.setAttribute('id', row_id);
        new_row.setAttribute('class', row_class_name);

        

        for (let j = cols-1; j >=0; j--) { 

            let new_column = document.createElement('td');
            column_id = column_id_prefix + '_' + j + '_row_' + i;
            new_column.setAttribute('id', column_id);
            new_column.setAttribute('class',column_class_name)
            new_row.append(new_column);


        }

        new_table.appendChild(new_row);
        


    }

    return new_table;

    

}

async function populateFinancialInformation(isPageLoadingForFirstTime,quarterly_income_statement_link,cash_from_operating_activities_link) {

    if (isPageLoadingForFirstTime === true) { 
        generateFinancialInformationStructure();
    }

    let promise1 = fetch(quarterly_income_statement_link);
    
    await promise1.then((intermediate_data) => { 
        let promise2 = intermediate_data.json();
        promise2.then((final_data) => {
             
            let quarterly_net_income_array = [];
            let quarterly_revenue_array = [];
            let quarterly_interest_income_array = [];
             
            for (let i = 0; i < 8; i++) {
                quarterly_net_income_array.push(final_data[i]['netIncome']);
                quarterly_revenue_array.push(final_data[i]['revenue']);
                quarterly_interest_income_array.push(final_data[i]['interestIncome']);
            }
             
            let tempDate = final_data[0]["date"].slice(0, 4);
            let tempYear = tempDate.slice(0, 4);
             
            let temp_revenue_array = [];

            if (quarterly_interest_income_array[0] == 0) {
                temp_revenue_array = quarterly_revenue_array;
            }
            else {
                temp_revenue_array = quarterly_interest_income_array;
            }

            
            let cashFromOA_data = [];

            let cashFromOperatingActivities_promise1 = fetch(cash_from_operating_activities_link);
            cashFromOperatingActivities_promise1.then((intermediate_data) => { 
                let cashFromOperatingActivities_promise2 = intermediate_data.json();
                cashFromOperatingActivities_promise2.then((real_data) => { 
                 
                    let target_element;

                  
                    
                    for (let i = 0; i < 2; i++) { 
                        for (let j = 0; j < 8; j++) { 


                            target_element = `cash_from_OA_table_column_${j}_row_${i}`;
                            target_element = '#' + target_element;
        
                            if (i == 0) {
                                document.querySelector(target_element).innerText = (real_data[j]["date"]).slice(0, 4);
                                document.querySelector(target_element).style.fontWeight = "bold";
                           }
                           else { 
                              document.querySelector(target_element).innerText = (real_data[j]['netCashProvidedByOperatingActivities'] / 10000000).toFixed(2);
                           }


                        }
                    }
                    
                   
                })
            })
            

            let target_element = "";
            
            

            let month;
            let quarter;
            let year;
            let period;

            

             for (let i = 0; i < 2; i++) { 

                 for (let j = 0; j < 8; j++) {
                     
                     target_element = `quarterly_net_profit_table_column_${j}_row_${i}`
                     target_element = '#' + target_element;
                     
                    
                     if (i == 0) {

                         let year = final_data[j]["date"].slice(0, 4);
                         let month = final_data[j]["date"].slice(5, 7);
                       
                         if (month === '12') {
                            
                             period="Q4"
                         }
                         else  if (month === '09') {
                            
                            period="Q3"
                         }
                         else  if (month === '06') {
                            
                            period="Q2"
                         }
                         else  if (month === '03') {
                            
                            period="Q1"
                        }
                        //  document.querySelector(target_element).innerText = (final_data[j]["date"].slice(0, 4) + "-" + final_data[j]['period']);
                        //  document.querySelector(target_element).style.fontWeight = "bold";
                         document.querySelector(target_element).innerText = (year + "-" + period);
                         document.querySelector(target_element).style.fontWeight = "bold";
                     }

                     else {
                         document.querySelector(target_element).innerText = (final_data[j]['netIncome'] / 10000000).toFixed(2);
                     }

                     target_element = `revenue_table_column_${j}_row_${i}`
                     target_element = '#' + target_element;

                     if (i == 0) {
                        let year = final_data[j]["date"].slice(0, 4);
                        let month = final_data[j]["date"].slice(5, 7);
                        // document.querySelector(target_element).innerText = final_data[j]["date"].slice(0, 4) + "-" + final_data[j]['period'];
                        document.querySelector(target_element).innerText = (year + "-" + period);
                         document.querySelector(target_element).style.fontWeight = "bold";
                     }
                     else { 
                        document.querySelector(target_element).innerText = final_data[j]['interestIncome'] == 0 ? (final_data[j]['revenue'] / 10000000).toFixed(2) : (final_data[j]['interestIncome'] / 10000000).toFixed(2);
                     }                                     
                     
                 }
             }


             
             
         })
        
        
        
        
    })



    
}

function findMatchingStocks(stock_search_query, exchange,display_results_limit,API_key) {
        
    let search_search_query_API_link = `https://fmpcloud.io/api/v3/search?query=${stock_search_query}&limit=${display_results_limit}&exchange=${exchange}&apikey=${API_key}`;
    
    console.log(search_search_query_API_link)
    let promise1 = fetch(search_search_query_API_link);
    promise1.then((intermediate_data) => { 
        let promise2 = intermediate_data.json();
        promise2.then((real_data) => { 
            console.log("OUTPUT - ",real_data)
        })
    })

    
}

function populateStockPeers(stock_peers_link) {
    
    let promise1 = fetch(stock_peers_link);
    promise1.then((intermediate_data) => { 
        let promise2 = intermediate_data.json();
        promise2.then((json_data) => { 
            console.log(json_data);

            let peers_list_div = document.querySelector('#homepage_container_bottom_right_body');
            peers_list_div.innerHTML = '';
           
            for (let i = 0; i < json_data[0]['peersList'].length; i++)
            {
               

                let new_div = document.createElement('div');
                new_div.setAttribute('class','peers_list_item_div')
                new_div.innerHTML = json_data[0]['peersList'][i];
                peers_list_div.append(new_div)

            }
           
        })
    })

}

function generateSuggestions(setSuggestionsList) { 

    let _52_week_high = arrayOfDataForHeader[8];
    let cmp = arrayOfDataForHeader[6];
    let percentDownFrom52weekHigh = (((_52_week_high) - cmp) * 100 / _52_week_high).toFixed(2);
    let message;
    if (percentDownFrom52weekHigh > 0) { 
        message = `stock is trading ${percentDownFrom52weekHigh}% down from its 52 week high`;
        copyStockSuggestions.push(message);
        setSuggestionsList(copyStockSuggestions)
    }
   

}

export {populateStockPeers, getExchangeExtentionAndSymbol,populateStockHeaderInfo,populateTechnicalAnalysis,populateFinancialInformation,findMatchingStocks,generateSuggestions};