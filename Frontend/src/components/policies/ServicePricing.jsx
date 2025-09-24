import React from 'react'
import './styles.css'

const ServicePricing = () => {
  return (
    <div>
        <main id="service-pricing">
        <h1 className='heading1 warm-gradient-text'>Service Pricing</h1>
        <h4 className='subheading'>Art Circle offers a range of services and event tickets according to event at competitive prices. Please refer to our website or contact us for detailed pricing information.
    </h4>
    </main>
    <section id="contact">
        <h2 className='subheading'>Contact:</h2>
        <p>For any inquiries or assistance, please reach out to us:</p>
        <ul className='points'>
            <li>Phone: <a href="tel:+919405519630">+919405519630</a></li>
            <li>Email: <a href="mailto:wceartcircle@walchandsangli.ac.in">wceartcircle@walchandsangli.ac.in</a></li>
            <li>Operational Address: Kalasadan, Academic Complex, walchand college of engineering, Vishrambagh, Sangli-416415</li>
        </ul>
    </section>
    </div>
  )
}

export default ServicePricing