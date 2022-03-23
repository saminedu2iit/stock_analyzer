import './../Styles/SearchSuggestion.css'

function SearchSuggestions(props) { 
   
   
    return (

        <div id="search_suggestion_container">
            {
                
                props.suggestion_list.map((element, index) => { 
                    return (<div className='suggestion_list_item' key={index} onClick={() => {
                        //console.log("choice =  ", element['symbol'], element['exchangeShortName'], element['name']);
                        props.setInputStock(element['symbol'])
                        props.setStockSearchSuggestions([])
                        props.setCurrentDisplayedStock({
                            currentStockSymbol: element['symbol'],
                            currentStockExchange: element['exchangeShortName'],
                            currentStockName : element['name']
                        })
                    }}>{element['name']} </div>)
                })
            }
        </div>
    )


    
}

export default SearchSuggestions;