

function getArrayOfDailyClosingPrice(stock_name, setp1, setp2, chartPeriod) {
    
    let chart_period;
 

    let finalArr = [];
    let arrDates = [];
    let arrClosingPrices = [];

    if (chartPeriod === '1_week') {
        chart_period = 7;
    }
    else if (chartPeriod === '1_month') { 
        chart_period = 30;
    }
        
    else if (chartPeriod === '90_days') { 
        chart_period = 90;
    }
    else if (chartPeriod === '200_days') { 
        chart_period = 200;
    }
    else if (chartPeriod === '365_days') { 
        chart_period = 365;
    }

    

    

    let daily_closing_price_link = "https://fmpcloud.io/api/v3/historical-price-full/" + stock_name + "?serietype=line&apikey=6ce511bda188cc745eb33e6ad907c5ec";

   

    let promise1 = fetch(daily_closing_price_link);
    promise1.then((intermediate_data) => { 
        let promise2 = intermediate_data.json();
        promise2.then((json_data) => { 
           
            for (let i = 0; i < chart_period; i++) { 
                arrDates.push(json_data['historical'][i]['date']);
                arrClosingPrices.push(json_data['historical'][i]['close'])
            }
            arrDates = arrDates.reverse();
            arrClosingPrices = arrClosingPrices.reverse();
            setp1(arrDates);
            setp2(arrClosingPrices);
            finalArr.push(arrDates);
            finalArr.push(arrClosingPrices);
        })
    })

   
    return finalArr;
    
}

export { getArrayOfDailyClosingPrice };