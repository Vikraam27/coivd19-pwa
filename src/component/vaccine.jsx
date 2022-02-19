import React, { useEffect, useState } from 'react';
import { fetchVaccine,dbPromise } from '../api/index'
const Vaccine = () => {
    const [vaccineData, setVaccineData] = useState([])
    useEffect(() => {
        let isCancelled = false;
        const vaccinePage = async() => {
            try {
                if(!isCancelled){
                    const data = await fetchVaccine()
                    setVaccineData(data)
                    dbPromise.then(db => {
                        let tx = db.transaction('global', 'readwrite')
                        let store = tx.objectStore('global')
                        let id = 'vaccineData'
                        let item = data
                        store.put(item, id)
                        return tx.complete
                    })
                }
            } catch (error) {
                if(!isCancelled){
                    return dbPromise.then( db => {
                        let tx = db.transaction('global','readonly');
                        let store = tx.objectStore('global');
                        return store.get('vaccineData');
                      }).then(data => {
                        setVaccineData(data)
                        console.log(data)
                        return data;
                      })
                      .catch(err => console.log(err));
                }
            }
        }
        vaccinePage()
        return () => {
            isCancelled = true
        }
    },[])
    if(!vaccineData.data){
        return( <div className="progress"> <div className="indeterminate"></div></div>)
        
    }
    return (
        <div className='container vaccine'>
        <h5 className='center'>Vaccine Covid-19</h5>
        <p>Total Vaccine :  {vaccineData.totalCandidates}</p> 
        <div className='card-container'>
                {vaccineData.data.map((vac, i) => (
                  <div className='card-panel' key={i}>
                      <strong className='title-vaccine'>{vac.candidate}</strong><br/> 
                      <strong className='subDetail'>Institutions : </strong>
                      {!vac.institutions[0] ? <span className='subDetail'>To be announcment</span>: <span className='subDetail'> {vac.institutions[0]}</span>}
                      <br/><strong className='subDetail'>Mechanism : </strong><span className='subDetail'>{vac.mechanism}</span><br/>
                      <strong className='subDetail'>Trial Phase : </strong><span className='subDetail'>{vac.trialPhase}</span>
                    </div>
                ))}
        </div>
     </div>
    );
};

export default Vaccine;