import React from 'react'
import './styles.css'

const CancelandRefund = () => {
  return (
    <div>
        <main id="cancellation-and-refund">
        <h1 className='heading1 rainbow-text'>Cancellation & Refund Policy</h1>
        <h2 className='subheading'>At Art Circle, we value your privacy and handle your personal information with care:</h2>
        <ol className='points'>
            <li>
                <strong>Event Cancellation:</strong> In the event of cancellation, registered participants will be notified promptly and offered rescheduling or refunds.
            </li>
            <li>
                <strong>Refund Eligibility:</strong> Refunds are available for cancellations made within 10 days before the event date.
            </li>
            <li>
                <strong>Refund Process:</strong> To request a refund, contact our team with your booking details. Refunds will be processed within 10 business days.
            </li>
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

export default CancelandRefund