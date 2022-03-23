import './../Styles/TechnicalChart.css';
import { Line, Pie } from 'react-chartjs-2';
import { getArrayOfDailyClosingPrice } from './../Utilities/TechnicalCartUtilities';
import { GlobalStateStore, GlobalStateStoreData } from './GlobalStateStore';
import { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)




function TechnicalChart() {

  let [stockTechnicalChart, setStockTechnicalChart, p1, setp1, p2, setp2, navbarMsg, setNavbarMsg] = useContext(GlobalStateStore);
  // console.log("Technical chart rendered");
  //getArrayOfDailyClosingPrice(stockTechnicalChart);

  
 
  //console.log(myLabels);
  let data = {

    labels: p1,
    
    
    datasets: [

      {
        label: 'Daily Chart - '+ stockTechnicalChart,
        data: p2,
        borderColor:"grey"
      },
     
    
    ]
  }

 
   
  return (
    <div id="stock_line_chart_div">
      
      
      <Line id="stock_line_chart" data={data} />
      </div>        
      
    )


}

export default TechnicalChart;