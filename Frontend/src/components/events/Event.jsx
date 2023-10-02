import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as API from '../../API/registerAPI'
import './events.css'
import gimQR from '../../assets/favi.png'

const Event = ({ index, idx, Name, date, description, icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [descp, setDescp] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const [truncatedDescription, setTruncatedDescription] = useState('')
  useEffect(() => {
    setTruncatedDescription(description.slice(0, 50) + '...')
    console.log(index)
  }, [description])

  const [name, setName] = useState()
  const [prn, setPrn] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handlePrnChange = (e) => {
    setPrn(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !prn || !phone || !email) {
      Swal.fire('Please fill all the fields')
    } else if (phone.length !== 10) {
      Swal.fire('Please enter a valid phone number')
    }
    const {data:{order}} = await axios.post("https://artc-website-production.up.railway.app/payment/checkout");
    
    const options = {
      "key":"rzp_test_8N5cWng2se0xIQ", // Enter the Key ID generated from the Dashboard
      "amount": "7000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "WCE ART CIRCLE",
      "description": "GIM 2023",
      "image": gimQR,
      "order_id": order.id, 
      "handler": async function (response) {
        if (response.razorpay_payment_id) {
          const data1 = {
            name: name,
            prn: prn,
            phone: phone,
            email: email,
          };
          try {
            const res = await API.createNewStudent(data1);
            console.log(res);
            if (res.status === 200) {
              Swal.fire('Payment Successful');
              closeModal();
            } else {
              Swal.fire('Payment Failed');
            }
          } catch (error) {
            console.error('API Error:', error);
            Swal.fire('Payment Failed');
          }
        } else {
          Swal.fire('Payment Failed');
        }
      },
      
      "prefill": {
          "name": name,
          "email": email,
          "contact": phone
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#21E6C1"
      }
    };
    var razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <div>
      <div className='event'>
        <div className='event-image'>
          <img src={icon} alt='' />
        </div>
        <div className='event-info'>
          <h1>{Name}</h1>
          <p>{truncatedDescription}</p>
          <div className='buttons'>
            <button className='btn' onClick={() => setDescp(true)}>
              Read More
            </button>
            <button
              className={`${idx === 1 ? '' : 'hidden'} btn`}
              onClick={openModal}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <div className='event-form'>
              <h1>{Name}</h1>
              <form>
                <input
                  type='text'
                  id='name'
                  placeholder='Enter your Name'
                  onChange={handleNameChange}
                />
                <input
                  type='text'
                  id='prn'
                  placeholder='Enter your PRN'
                  onChange={handlePrnChange}
                />
                <input
                  type='text'
                  id='phone'
                  placeholder='Enter your Mobile Number'
                  onChange={handlePhoneChange}
                />
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your Email Id'
                  onChange={handleEmailChange}
                />
                <button className='btn' type='submit' onClick={handleSubmit}>
                  Proceed to Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {descp && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setDescp(false)}>
              &times;
            </span>
            <div className='event-descp'>
              <div className='event-image'>
                <img src={icon} alt='' />
              </div>
              <div className='event-info'>
                <h1>{Name}</h1>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Event;
