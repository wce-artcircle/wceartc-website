import React, { useState, useEffect } from 'react'
import './teams.css'
const Slideshow = ({ images, desc }) => {
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
        <h2>Our Teams</h2>
        <div className='slideshow'>
          <div className='slideContent'>
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
