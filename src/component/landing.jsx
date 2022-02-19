import React,{ useState, useEffect } from 'react';
import CountUp from 'react-countup'
import { allGlobalData, dbPromise } from '../api/index';
const Landing = () => {
    const [globalData, setGlobalData] = useState([])
    useEffect(() => {
        let isCancelled = false;
        const fethedGlobal = async() => {
            try {
                if(!isCancelled){
                    const { active, cases, deaths, recovered} = await allGlobalData()
                    
                    setGlobalData({ active, cases, deaths, recovered})
                    dbPromise.then(db => {
                        let tx = db.transaction('global', 'readwrite')
                        let store = tx.objectStore('global')
                        let id = 'globalData'
                        let item = {
                            active: active,
                            cases: cases,
                            deaths: deaths,
                            recovered: recovered,

                        }
                        store.put(item, id)
                        return tx.complete
                    })
                }
            } catch (error) {
                if(!isCancelled){
                    return dbPromise.then( db => {
                        let tx = db.transaction('global','readonly');
                        let store = tx.objectStore('global');
                        return store.get('globalData');
                      }).then(data => {
                        setGlobalData(data)
                        console.log('fey')
                      })
                      .catch(err => console.log(err));
                }
            }
        }
        fethedGlobal()
        return () => {
            isCancelled = true
        }
    },[])
    if(!globalData.cases){
        return <div className="progress"> <div className="indeterminate"></div></div>
    }
    return(
        <div className='landing'>       
        <div className="container">
           <div className="row">
                   <div className="col s12 m8">
                       <h3 className='title'>COVID-19<br/> Tracker</h3>
                       <h5 className="subtitle">Total Confirmed Cases:</h5>
                       <h3 className="infected-main"><CountUp separator={'.'} duration={2} start={0} end={globalData.cases} className='infected' /></h3>
                    <ul className="lab-ul">
                        <li><h6>Active cases    <CountUp separator={'.'} duration={2} start={0} end={globalData.active} className='active'/></h6></li>
                        <li><h6>Recovered cases <CountUp separator={'.'} duration={2} start={0} end={globalData.recovered} className='recover'/></h6></li>
                        <li><h6>Total Deaths    <CountUp separator={'.'} duration={2} start={0} end={globalData.deaths} className='deaths'/></h6></li>
                    </ul> 
                   </div>
           </div>
        </div>
        </div>
    );
};

export default Landing;