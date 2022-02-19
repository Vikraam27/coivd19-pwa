import React,{ useState, useEffect } from 'react';
import { fetchMapsData } from '../api/index';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

const CovidMaps = () => {
    const [viewPort, setViewPort] = useState({
        latitude: 20.593684,
        longitude: 78.96288,
        width: "98%",
        height: "100%",
        zoom :2,
      })
    const [mapsData, setMapsData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null)
    useEffect(() => {
        let isCancelled = false;
        const covidMapsData = async() => {
            try {
                if(!isCancelled){
                    setMapsData(await fetchMapsData())
                }
            } catch (error) {
                
            }
        }
        covidMapsData()
        return () => {
            isCancelled = true
        }
    },[])
    if(mapsData.code !== 200 || !navigator.onLine){
        return(
            <div id="offline">
                <div className="progress"> <div className="indeterminate"></div></div>
                <div>
                <p className='center'>Opps... looks like your offline</p>
                <p className='center'>or something broken. reload the browser or try again later</p>
                </div>    
            </div>
        )
    }
    return(
        <div id='maps'>
        <ReactMapGL
        {...viewPort}
         mapboxApiAccessToken={"pk.eyJ1IjoicGFyZW1ldjY1MCIsImEiOiJja2xycm9qMnYwMzNyMnBueGNwcDQzcmRuIn0.8mJ9PoamRgrew7crbIpFJg"}
         onViewportChange = {setViewPort}
        >
            {mapsData.data.map((mark, i) => (
                <Marker longitude={mark.longitude} latitude={mark.latitude} key={i}>
                    <button  className="marker-btn" onClick= { e => {
                        e.preventDefault()
                        setSelectedCountry(mark)
                    }} >
                        {mark.confirmed > 1000000 ? <i className="fas fa-map-marker-alt icon-red"></i> : mark.confirmed > 100000 ? <i className="fas fa-map-marker-alt icon-yellow"></i> : mark.confirmed < 50000 ?  <i className="fas fa-map-marker-alt icon-blue"></i> : null}
                        
                    </button>
                </Marker>
            ))}   
            {selectedCountry ? (
                <Popup 
                latitude={selectedCountry.latitude} 
                longitude={selectedCountry.longitude}
                onClose={() => setSelectedCountry(null)}
                >
                    <p className='Country-pop-up'>{selectedCountry.location}</p>
                    <p className="subheading">Confirmed : {selectedCountry.confirmed.toLocaleString("id-ID")}</p>
                    <p className="subheading">Recovered : {selectedCountry.recovered.toLocaleString("id-ID")}</p>
                    <p className="subheading">Dead : {selectedCountry.dead.toLocaleString("id-ID")}</p>
                    <p className="subheading">{new Date(selectedCountry.updated).toDateString()}</p>
                </Popup>
                ): null}
        </ReactMapGL>
     </div>
    )
};

export default CovidMaps;