import './../Styles/About.css'
function About() { 

    return (
        <div id="about_div">
            <h2 id="about_heading">Stock Analyzer</h2>

            <div id="about_details">

                <p id="about_para">
                Stock Analyzer is a frontend application built using HTML, CSS and ReactJS. The key objective of developing this application is
                to make the stock analysis process simple, and provide the basic key metrices in one screen. Following are the features provided by
                this application.
                </p>
                <ul>
                    <li>
                        Search stocks across 3 exchanges - NSE, XETRA and NASDAQ.
                    </li>
                    <li>Get Moving average details for the period 200 days, 50 days and 20 days, along with the current RSI.</li>
                    <li>Get key financial information about the company.</li>
                    <li>Add your favorite stocks to the watchlist.</li>
                    <li>Get the basic pricing information about the stocks.</li>
                    <li>Get the technical chart of the given chart to understand the price movement.</li>
                    <li>Get the customized suggestions by the application based upon the financial and technical information.</li>
                </ul>


            </div>
        </div>
    )


}

export default About;