import React from 'react'
import './events.css'
import events, { resolveEventStatus } from './allEvents'
import Event from './Event'

const statusOrder = { live: 0, upcoming: 1, past: 2 }

const Events = () => {
  const sortedEvents = [...events].sort(
    (a, b) => statusOrder[resolveEventStatus(a)] - statusOrder[resolveEventStatus(b)]
  )

  return (
    <div id='events'>
      <h2 className='warm-gradient-text'>Recent Events</h2>
      <div className='events-container'>
        {sortedEvents.map((event, index) => {
          return (
            <Event
              key={index}
              idx={event.index}
              Name={event.Name}
              date={event.date}
              description={event.description}
              icon={event.icon}
              register={event.register}
              comingSoon={event.comingSoon}
              status={resolveEventStatus(event)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Events;