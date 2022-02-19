import idb from 'idb';
//index db
export const dbPromise = idb.open('Covid', 1, upgradeDB => {
    if(!upgradeDB.objectStoreNames.contains('global')){
        upgradeDB.createObjectStore('global')
    }
})
//global now 
export const allGlobalData = async() => {
    const res = await fetch(`https://disease.sh/v3/covid-19/all`);
    const { active, cases, deaths, recovered } = await res.json();
    return { active, cases, deaths, recovered } 
}

//all country data
export const fetchAllCountry = async() => {
    const req = await fetch('https://disease.sh/v3/covid-19/countries')
    const res = await req.json()
    return res
}
//maps data
export const fetchMapsData = async() => {
    const req = await fetch('https://www.trackcorona.live/api/countries', { mode: 'no-cors'})
    const res = await req.json()
    return res
}
//daily global case
export const globalDailyData = async() => {
    const req = await fetch('https://covid19.mathdro.id/api/daily');
    const res = await req.json();
    const mapData = res.map((daily) => ({
        confirmed: daily.confirmed.total,
        deaths: daily.deaths.total,
        date: daily.reportDate
    }))
    return mapData
}


//country details
export const fetchCountry = async(code) => {
    const req = await fetch(`https://corona-api.com/countries/${code}`);
    const res = await req.json();
    return res
}

export const fetchVaccine = async() => {
    const req = await fetch('https://disease.sh/v3/covid-19/vaccine')
    const res = await req.json()
    return res
}
