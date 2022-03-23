function addToLocalStorageWatchList(list) { 

    let listToString = list.toString();
   
    localStorage.setItem('watchlistArrayAsList', listToString);
    
    
}

function getWatchlistArrayFromLocalStorage() { 

    let arrayAsString = localStorage.getItem('watchlistArrayAsList');
    
    if (arrayAsString === null) {
        //console.log("Empty Watchlist")
        return [];
    }
    else { 
        arrayAsString = arrayAsString.split(',');
    }

    return arrayAsString;
}

function LocalStorageRemoveItem(itemToDelete) {
    
    localStorage.removeItem(itemToDelete)

}

export { addToLocalStorageWatchList, getWatchlistArrayFromLocalStorage,LocalStorageRemoveItem };