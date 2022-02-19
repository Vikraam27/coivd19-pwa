import React, { useState, useEffect} from 'react';
import { LineChart } from '../component/chart';
import { globalDailyData, dbPromise } from '../api/index';

const GlobalChart = () => {
    const [ globalDataChart, setGlobalDataChart ] = useState([])
    useEffect(() => {
        let isCancelled = false;
        const fetchGlobalChart = async() => {
            try {
                if(!isCancelled){
                    let dataMap = await globalDailyData()
                    setGlobalDataChart(dataMap)
                    dbPromise.then(db => {
                        let tx = db.transaction('global', 'readwrite')
                        let store = tx.objectStore('global')
                        let id = 'globalChart'
                        let item = dataMap
                        store.put(item, id)
                        return tx.complete
                      })
                }
            } catch (error) {
                if(!isCancelled){
                    return dbPromise.then( db => {
                        let tx = db.transaction('global','readonly');
                        let store = tx.objectStore('global');
                        return store.get('globalChart');
                      }).then(data => {
                        setGlobalDataChart(data)
                        return data;
                      })
                      .catch(err => console.log(err));
                }
            }
        }
        fetchGlobalChart()
        return () => {
            isCancelled = true
        }
    },[])
    return (
        <div>
            <LineChart globalDataChart={globalDataChart}/>
        </div>
    );
};

export default GlobalChart;