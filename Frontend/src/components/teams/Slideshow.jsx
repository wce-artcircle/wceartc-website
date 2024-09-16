import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import './teams.css'
const Slideshow = ({ images, desc, navlink }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to the next slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3500) // Change slide every 3 seconds (adjust as needed)

    return () => {
      clearInterval(intervalId) // Clear the interval when the component unmounts
    }
  }, [currentIndex, images.length])

  const navigate = useNavigate();

  const handleSlideClick = (navlink) =>{
    navigate(navlink);
  }

  //   const nextSlide = () => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   };

  //   const prevSlide = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //     );
  //   };

  return (
    <div id='teams'>
      <div className='Slide'>
        <h2>Our Teams And Their Artforms</h2>
        <div className='slideshow'>
          <div className='slideContent' onClick={()=>handleSlideClick(navlink[currentIndex])}>
            <img
              className='silder-img'
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
            />
            <p>{desc[currentIndex]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slideshow
