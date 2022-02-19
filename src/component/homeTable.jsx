import React, { useEffect, useState } from 'react';
import { fetchAllCountry,dbPromise } from '../api/index';
const CountryTable = () => {
    const [countryData, setCountryData] = useState([])
    useEffect(() => {
        let isCancelled = false;
        const fetchCountry = async() => {
            try {
                if(!isCancelled){
                    let dataCountry = await fetchAllCountry()
                    let sorted = [...dataCountry]
                    sorted.sort((a, b) => {
                        if(a.cases > b.cases){
                            return -1;
                        }
                        if(a.cases < b.cases){
                            return 1
                        }
                        return 0
                    })
                    setCountryData(sorted)
                    dbPromise.then(db => {
                        let tx = db.transaction('global', 'readwrite')
                        let store = tx.objectStore('global')
                        let id = 'tableData'
                        let item = sorted
                        store.put(item, id)
                        return tx.complete
                    })
                }
            } catch (error) {
                if(!isCancelled){
                    return dbPromise.then( db => {
                        let tx = db.transaction('global','readonly');
                        let store = tx.objectStore('global');
                        return store.get('tableData');
                      }).then(data => {
                        setCountryData(data)
                        return data;
                      })
                      .catch(err => console.log(err));
                }
            }
        }
        fetchCountry()
        return () => {
            isCancelled = true
        }
    },[])
    return (
        <div className='table-container'>
            <h4 className="title">Live Cases By Country</h4>
            <div className='table-countries'>
            <table className="striped highlight">
                <thead className='white-text'>
                <tr>
                    <th>Country</th>
                    <th>Cases</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                </tr>
                </thead>

                <tbody>
                    {countryData.map((country, i) => (
                        <tr key={i}>
                            <td><a href={`/country/${country.countryInfo.iso2}`}>{country.country}</a></td>
                            <td>{country.cases.toLocaleString("id-ID")}</td>
                            <td>{country.recovered.toLocaleString("id-ID")}</td>
                            <td>{country.deaths.toLocaleString("id-ID")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default CountryTable;