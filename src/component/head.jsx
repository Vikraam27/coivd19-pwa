import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize';

const Head = () => {
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }, [])
    return(
        <div>
            <nav className="z-depth-0 cyan darken-4 ">
                <div className="nav-wrapper">
                <a href="#"> <i className="material-icons sidenav-trigger" data-target="slide-out">menu</i></a>
                
               <a href='/' className="brand-logo center"><img className="app-logo" alt='brand-logo' src='/logo.png'/><span>Covid-19</span></a> 
                </div>
            </nav>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
            <div className="background">
                <img src='https://akcdn.detik.net.id/community/media/visual/2020/03/15/b1aa7813-0e7a-48c7-88c1-b071a4c2ccad_169.jpeg?w=700&q=90' alt="logo" />
            </div>
                <a href="#"><span className="white-text name">COVID-19</span></a>
                <a href="#"><span className="white-text email">Covid-19 Tracker Apps</span></a>
            </div></li>
                <li><a href="/">Home</a></li>
                <li><div className="divider"></div></li>
                <li><a className="waves-effect" href="/countries">Countries</a></li>
                <li><a className="waves-effect" href="/vaccine">Vaccine</a></li>
            </ul>
        </div>
  
    )
}
export default Head;