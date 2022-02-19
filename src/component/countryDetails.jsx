import React, { useEffect, useState } from 'react';
import { fetchCountry } from '../api/index'
import CountUp from 'react-countup';
import { LineChartCountry, BarChartCountry } from './chart'
const CountryDetails = (props) => {
    const [countryData, setCountyData] = useState([])
    const [chartCountryData, setChartCountryData] = useState([])
    const [toggleSwitch, setToggleSwitch] = useState(false)
    useEffect(() => {
        let isCancelled = false
        const fetchCountryDetails = async() => {
            try {
                if(!isCancelled){
                    let dataCountry = await fetchCountry(props.match.params.code)
                    setCountyData(dataCountry)
                    let sorted = [...dataCountry.data.timeline]
                    sorted.sort((a, b) => {
                        if(a.confirmed < b.confirmed){
                            return -1;
                        }
                        if(a.confirmed > b.confirmed){
                            return 1
                        }
                        return 0
                    })
                    setChartCountryData(sorted)
                    
                }
            } catch (error) {
                if(isCancelled){
                    console.log(error)
                }
            }
        }
        fetchCountryDetails()
        return () => {
            isCancelled = true
        }
    },[])
    if(!navigator.onLine){
        return(
            <div className='country-offline'>
                <h1 className='font-offline'>4<span className='font-offline'><i className="fas fa-ghost"></i></span>4</h1>
                <h2 className='font-offline'>Error: 404 page not found</h2>
                <p className='font-offline'>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        )
    }
    if(!countryData.data){
        return  <div className="progress"> <div className="indeterminate"></div></div>
    }
    return (
        <div className='container country-details'>
            <h4 className='center title'>COVID-19 Case In {countryData.data.name}</h4>
        <div className='row'>
            <div className="col s12 m4 ">
                <div className="card-panel card-active">
                    <p>Confirmed cases</p>
                    <CountUp className='lime-text' start={0} end={countryData.data.latest_data.confirmed} duration={1} separator={'.'}/>
                    <p>Today Case: {countryData.data.today.confirmed.toLocaleString("id-ID")}</p>
                    <p className='grey-text'>{new Date(countryData.data.updated_at).toDateString()}</p>
                </div>
            </div>
            <div className="col s12 m4">
                <div className="card-panel card-recovered">
                    <p>Recovered cases</p>
                    <CountUp className='green-text' start={0} end={countryData.data.latest_data.recovered} duration={1} separator={'.'}/>
                <p>Recovered Rate: {countryData.data.latest_data.calculated.recovery_rate.toString().split(".")[0]}%</p>
                <p className='grey-text'>{new Date(countryData.data.updated_at).toDateString()}</p>
                </div>
            </div>
            <div className="col s12 m4">
                <div className="card-panel card-deaths">
                    <p>Total Deaths</p>
                    <CountUp className='red-text' start={0} end={countryData.data.latest_data.deaths} duration={1} separator={'.'}/>
                <p>Today Deaths: {countryData.data.today.deaths.toLocaleString("id-ID")} </p>
                <p className='grey-text'>{new Date(countryData.data.updated_at).toDateString()}</p>
                </div>
            </div>
        </div>
        <h5 className='center'>Graphic Covid-19 in {countryData.data.name}</h5>
            <div className="switch center"><label>Line Chart<input type="checkbox" defaultChecked={toggleSwitch} onChange={() => setToggleSwitch(!toggleSwitch)} name="chart" id="chart-toogle"/><span className="lever"></span>Bar Chart</label></div>
            <div className='chart'>
                {!toggleSwitch ? <LineChartCountry countryData={chartCountryData}/> : <BarChartCountry countryData={countryData} />}
            </div>
    </div>
    );
};

export default CountryDetails;
