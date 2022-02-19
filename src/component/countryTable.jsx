import React,{ useState, useEffect } from 'react';
import { fetchAllCountry,dbPromise } from '../api/index'

const AllCountryTable = () => {
    const [countryData, setCountryData] = useState([]);
    const [isSorterd, setSorted] = useState(false)
    const [query, setQuery] = useState('')
    useEffect(() => {
        let isCancelled = false;
        const allCountry = async() => {
            try {
                if(!isCancelled){
                    let data = await fetchAllCountry()
                    setCountryData(data)
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
        allCountry();
        return () => {
            isCancelled = true
        }
    },[])
    //table row data
    const TableRow = ({ countryData }) => {
        return (
            <tbody>
            {countryData.length !== 0 ? (countryData.map((country, i) =>(
                <tr key={i}>
                    <td className='center'>{i + 1}.</td>
                    <td><a href={`/country/${country.countryInfo.iso2}`} >{country.country.toLocaleString("id-ID")}</a></td>
                    <td  className='center' >{country.cases.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.active.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.recovered.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.deaths.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.todayCases.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.todayRecovered.toLocaleString("id-ID")}</td>
                    <td  className='center' >{country.todayDeaths.toLocaleString("id-ID")}</td>
                </tr>
            ))): <tr><td><h5>Not</h5></td><td><h5>Found</h5></td></tr>}
        </tbody>
        );
    }

    //function sord data
    const compareBy = (key, ascending) => {
        let sorted = [...countryData]
        let reverse = ascending ? 1 : -1;
        sorted.sort((a, b) =>{
            if (a[key] < b[key]) return -1 * reverse;
            if (a[key] > b[key]) return 1 * reverse;
            return 0;
        })
        setCountryData(sorted)
    }
    // function search data (country)
    const search = (rows) => {
        return rows.filter(item => item.country.toLowerCase().includes(query.toLowerCase()))
    }
    
    return (
        <div className='table-container'>
             <h5 className='center'>Live Cases By Country</h5>
             <div className="search container">
                <form action="">
                    <input placeholder='Search Country' onChange={e => setQuery(e.target.value)} type="text"/>
                </form>
             </div>
            <div className='table-country'>       
                <table className="striped">
                    <thead className='white-text'>
                        <tr>
                            <th>No</th>
                            <th onClick={() => {
                                setSorted(!isSorterd)
                                compareBy('country', isSorterd)
                            }}>Country <i className="fas fa-sort"></i></th>
                            <th onClick={() => {
                                setSorted(!isSorterd)
                                compareBy('cases', isSorterd)
                            }} >Cases <i className="fas fa-sort"></i></th>
                            <th onClick={() => {
                                setSorted(!isSorterd)
                                compareBy('active', isSorterd)
                            }}>Active Cases <i className="fas fa-sort"></i></th>
                            <th  onClick={() => {
                                setSorted(!isSorterd)
                                compareBy('recovered', isSorterd)
                            }}>Recovered <i className="fas fa-sort"></i></th>
                            <th onClick={() => {
                                setSorted(!isSorterd)
                                compareBy('deaths', isSorterd)
                            }}>Deaths <i className="fas fa-sort"></i></th>
                            <th>Today Cases</th>
                            <th>Today Recovered</th>
                            <th>Today Deaths</th>
                        </tr>
                    </thead>
                    <TableRow countryData={search(countryData)}/>
                </table>
            </div>
        </div>
    );
};

export default AllCountryTable;