// MainPage.js
import React from 'react';
import Navbar from '../nav/Navbar';
import Footer from '../footer/Footer';
import './mainpage.css';
import title from '../../assets/text.png';
import poster from '../../assets/yuvarang2k24.png';
import concert from '../../assets/concert.jpeg';
// import rulebook from ''

const MainPage = () => {
  return (
    <>
      <Navbar/>
      
      <div className="mainpage__container">
          
        <div className="blurWrapper"></div> 
        <div className='bgImage'>
          <img src={title} alt=""/>
        </div>
      </div>
      <div className='about-yuvarang'>
        <div className='bg stars'>
          <span></span>
        </div>
          <h1>About Yuvarang</h1>
          <div className='about-yuvarang-content'>
            <img src={poster} alt=""/>
            <div className='abt-yuva'>
              <p>
              YUVARANG...here we create and you celebrate. It is a two day, annual mega event organised and conducted by Art Circle which is the cultural club of WCE Sangli. This mega event consists of many interesting competitions like street plays, dance battles, poetry and many more. School level competitions like that of drawing, painting, creative writing are also organised. Each participant gets a certificate and the winners recieve amazing and heavy cash prizes. Every year this event attracts a mob of 2.5k. Here one gets a platform to exhibit his/her art, vibe up and compete with people having similar interests. People create communities and make connections strong. It is always said that Art is a way to embark. Revolving around this objective, the entire event turns into a place to simply innovate and exhilarate. It is a life time experience for participants as well as organisers. And finally YUVARANG is a festival where passion thrives, imagination gains life and emotion becomes memory to cherish alive.
              </p>
              <a href='https://drive.google.com/file/d/1Ik2wxTAtdaMnnA1T0SUxoYweDSSU2WGL/view?usp=drivesdk'>View RuleBook</a>
              <a href='https://konfhub.com/yuvarang2024'>REGISTER</a>
            </div>
            
          </div>
          <h1>Swapnil Bandodkar - Live Concert</h1>
          <div className='about-yuvarang-content'>
            <img src={concert} alt=""/>
            <div className='abt-yuva'>
              <p>
                Swapnil Bandodkar will be performing live at Yuvarang 2024. Swapnil Bandodkar is a Marathi playback singer from Maharashtra, India. He is known for his work in Marathi Music Industry. He has sung songs in Hindi and Konkani as well. He is the recipient of the Best Playback Singer Award at the 2008 Maharashtra Times Awards for his song "Mala Ved Lagale" from the film. We will be having a live concert of Swapnil Bandodkar on the 2nd day of Yuvarang 2024 i.e. on 7th January 2024 in Walchand College of Engineering, Sangli.
              </p>
              <a href='https://konfhub.com/yuvarang2024'>REGISTER</a>
            </div>
            
          </div>
        
      </div>
      <Footer />
    </>
  );
}

export default MainPage;