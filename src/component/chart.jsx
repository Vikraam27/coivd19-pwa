import { Bar, Line } from 'react-chartjs-2';
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
        ticks: {
            callback: function(value) {
                var ranges = [
                    { divider: 1e6, suffix: 'M' },
                    { divider: 1e3, suffix: 'k' }
                ];
                function formatNumber(n) {
                    for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                    }
                    }
                    return n;
                }
                return formatNumber(value);
            }
        }
        }]
    }
}
let height
    if(window.screen.width < 920 ){
        height = '270px'
    }else {
        height = '400px'
    }
export const LineChart = ({ globalDataChart}) => {
   return (
   <Line height={height} 
        data={{
            labels:globalDataChart.map(({ date }) => date),
            datasets: [{
                data: globalDataChart.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
                
            }, {
                data: globalDataChart.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                fill: true
            }]
        }}
    options={options}/>)
}

export const LineChartCountry = ({ countryData }) => {
    return(
        <Line  height={height} 
        data={{
            labels: countryData.map( data => data.date),
            datasets:[{
                data: countryData.map( data => data.confirmed),
                label: 'Confirmed',
                borderColor: '#3333ff',
                fill: true,
            },{
                data: countryData.map( data => data.recovered),
                label: 'Recovered',
                borderColor: '#51ed56',
                fill: true,
            },{
                data: countryData.map( data => data.deaths),
                label: 'Death',
                borderColor: '#ff0000',
                fill: true,
            }]
        }}
    options={options}/>)
}

export const BarChartCountry = ({ countryData }) => {
    return(
        <Bar height={height} 
            data={{
                labels:['Confirmed','Recovered','Deaths'],
                datasets: [{
                    label: 'Poeple',
                    backgroundColor: ['#d1de1b', '#6dd627', '#cf1f2b'], 
                    data: [countryData.data.latest_data.confirmed, countryData.data.latest_data.recovered, countryData.data.latest_data.deaths]
                }]
            }} options={options}
        />
    )
}