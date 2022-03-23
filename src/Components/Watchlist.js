import './../Styles/Watchlist.css'

function Watchlist(props) { 

    

    function getStockNameFromString(stock_string) { 

        let stock_name = "";
        let stock_name_starts = false;
        for (let i = 0; i < stock_string.length; i++) { 
            if (stock_string[i] === '{') { 
                stock_name_starts = true;
               // console.log("started");
                continue;
            }
            if (stock_string[i] === '}') { 
                stock_name_starts = false;
                break;
            }

            if (stock_name_starts === true) { 
                stock_name += stock_string[i];
            }
           
          
        }
     
        return stock_name;
    }

    return (
        
        props.watchlistItems.map((element, index) => {
            return (<div className="watchlist_item" key={index} >
                <div className='watchlist_item_div_left'
                onClick={() => { 
                    
                    props.searchStockHandle(getStockNameFromString(element));
                   
                  
                    }}
                >{getStockNameFromString(element)}
                    </div>
                <div className='watchlist_item_div_right'>
                    <input className='delete_watchlist_item_button' type="button" value="X" onClick={() => { 
                        props.removeItemFromWatchlist(index);
                    }}></input>
                </div>
            </div>)

            })
        
    );



}

export default Watchlist;