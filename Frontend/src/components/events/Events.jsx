import React from 'react'
import './events.css'
import events from './allEvents'
import Event from './Event'

const Events = () => {
  return (
    <div id='events'>
      <h2>Recent Events</h2>
      <div className='events-container'>
        {events.map((event, index) => {
          return (
            <Event
              key={index}
              idx={event.index}
              Name={event.Name}
              date={event.date}
              description={event.description}
              icon={event.icon}
              register={event.register}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Events;
