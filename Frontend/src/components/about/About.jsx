import React from 'react'
import './about.css'
import ABTIMAGE from '../../assets/aboutusimg.png'

const About = () => {
  return (
    <div id='about'>

      <div className='main'>
        <div className='about'>
          <h1>About Us</h1>
          <div className='heading'>
            <div className='about-img'>
              <img src={ABTIMAGE} alt='' />
            </div>
            <div className='about-text'>
              <h6>ART CIRCLE is a cultural club of Walchand College of Engineering, Sangli. We always strive for the development and growth of artistic skills and capabilities in the students. ART CIRCLE also provides a platform for the students to enhance their management skills as well as personality development. Currently we are a family of more than 100 working members. Since last 4 years we have produced more than 400 artists from Walchand College of Engineering, Sangli. We also conduct various cultural and art-related events throughout the academic year. We contribute to social and personal development of a student achieving balance between curricular and extra-curricular skill.</h6>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About