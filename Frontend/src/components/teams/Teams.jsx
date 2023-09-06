import React,{useState} from 'react'
import {motion} from 'framer-motion'
// import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-react-navigations";
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import Slideshow from './Slideshow'
import './teams.css'
import DANCE from '../../assets/dance.jpg'
import MUSIC from '../../assets/music_t.jpeg'
import PHOTO from '../../assets/photo_team.jpg'
import DRAMA from '../../assets/drama_t.jpg'
import CONTENT from '../../assets/write_team.jpg'
import ART from '../../assets/design_team.jpg'




const Teams = () => {
  // const desc=["Dance Team","Band Team","Photography Team","Drama Team","Content Team","Art and Deco Team"];
  // const images=[DANCE,MUSIC,PHOTO,DRAMA,CONTENT,ART];
  //  return (
  //   <div id='teams'>
  //     <div className='Slide'>
  //     <h2>Our Teams</h2>
  //      <Slideshow  images={images} desc={desc}></Slideshow>
  //   </div>
  //   </div>
  //  )
  const [expandIndex,setExpandIndex]=useState(null)

  const handleCardClick =(index)=>{
    setExpandIndex(index===expandIndex ? -1:index)
  }

  const cardVariables={
    expand:{
      width: "400px"
    },
    collapsed:{
      width: "200px"
    }
  }
  const cardImages=[DANCE,DRAMA,MUSIC,PHOTO,CONTENT,ART]
  const card=['Dance Team','Drama Team','Music Team','Photography Team','Content Team','Design Team']
  const cardDescription=['Dance Team','Drama Team','Music Team','Photography Team','Content Team','Design Team']

  return (
    <div id='teams'>
      <div className='teams'>
        <h2>Our Teams</h2>
      </div>
        <div className='cards'>
        
          {[0,1,2,3,4,5].map((index)=>(
            <motion.div
            className={ `${index===expandIndex ? 'expand': ' ' }, cards-style`}
            key={index}
            variants={cardVariables}
            initial='collapsed'
            animate={index===expandIndex ? 'expand': 'collapsed'}
            transition={{duration:0.5}}
            onHoverStart={()=>{
              handleCardClick(index)
            }}
            onHoverEnd={()=>{
              handleCardClick(index)
            }}
            
            style={{
              backgroundImage:`url(${cardImages[index]})`
            }}
            
            >
              
              <div className='card-content'>
                
                <div className='card-footer'>
                  <h6 className='heading'>{card[index]}</h6>
                  {
                    index===expandIndex && (
                      <p>{cardDescription[index]}</p>
                    )
                  }
                </div>
              </div>

            </motion.div>
          ))}
      </div>
    </div>
  )
}

export default Teams