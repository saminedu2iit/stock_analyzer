function StockSuggestions(props) {

        
    return (
        <ol>
            {props.suggestionsList.map((element, index) => {
                return (<li key={index}>{element}</li>)
             })}
        </ol>
    )


}

export default StockSuggestions;