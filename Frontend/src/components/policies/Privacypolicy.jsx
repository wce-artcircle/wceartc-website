import React from 'react'
import './styles.css'

const Privacypolicy = () => {
  return (
    <div>
        <main id="privacy-policy">
        <h1 className='heading'>Privacy Policy</h1>
        <h2 className='subheading'>At WCE Art Circle, we value your privacy and handle your personal information with care:</h2>
        <ul className='points'>
            <li>Information Collection: We collect data like name, contact details, and preferences to enhance your experience.</li>
            <li>Data Usage: Your information is used for event communication, personalized recommendations, and statistical analysis.</li>
            <li>Third Parties: We may share data with partners for event-related purposes, but never for commercial use.</li>
            <li>Opt-Out: You can opt out of communication or request data removal by contacting our support team.</li>
        </ul>
    </main>
    <section id="contact" >
        <h2 className='subheading'>Contact:</h2>
        <p>For any inquiries or assistance, please reach out to us:</p>
        <ul className='points'>
            <li>Phone: <a href="tel:+917757854058">+917757854058</a></li>
            <li>Email: <a href="mailto:wceartcircle@walchandsangli.ac.in">wceartcircle@walchandsangli.ac.in</a></li>
            <li>Operational Address: Kalasadan, Academic Complex, walchand college of engineering, Vishrambagh, Sangli-416415</li>
        </ul>
    </section>
    </div>
  )
}

export default Privacypolicy