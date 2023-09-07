import React from 'react'
import './styles.css'

const TermsandConditions = () => {
  return (
    <div><main id="terms-and-conditions">
    <h1 className='heading1'>Terms & Conditions</h1>
    <h6 className='subheading'>Welcome to WCE Art Circle, a cultural club dedicated to promoting art and creativity. By participating in our events, you agree to the following terms and conditions:</h6>
    <ol className='points'>
        <li>Respectful Conduct: Treat fellow participants, artists, and staff with respect and courtesy.</li>
        <li>Event Guidelines: Follow specific guidelines set for each event to ensure a safe and enjoyable experience.</li>
        <li>Photography &amp; Media: Consent to the use of your likeness in event-related photographs and media.</li>
        <li>Code of Ethics: Abide by ethical standards and avoid any form of harassment or disruptive behavior.</li>
        <li>Liability Waiver: Acknowledge that WCE Art Circle is not liable for any personal injury, loss, or damage during events.</li>
        <li>Changes &amp; Updates: Terms and conditions may be updated, and it's your responsibility to stay informed.</li>
        <li>Right to Admission Reserved</li>
    </ol>
</main>
    <section id="contact">
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

export default TermsandConditions