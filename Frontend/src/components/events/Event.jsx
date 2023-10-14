import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as API from '../../API/registerAPI'
import './events.css'
import withDandiya from '../../assets/navratri-with.jpg'
import withoutDandiya from '../../assets/navratri-without.jpg'

const Event = ({ index, idx, Name, date, description, icon }) => {
  
  const [isOpen, setIsOpen] = useState(false)
  const [descp, setDescp] = useState(false)
    const [img, setimg] = useState(withDandiya)
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
  }, [description,img])

  const [name, setName] = useState()
  const [prn, setPrn] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [transactionId,setTransactionId]=useState()

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
  const handletransactionIdChange=(e) =>{
    setTransactionId(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name, prn, phone, email)
    if (!name || !prn || !phone || !email || !transactionId) {
      Swal.fire('Please fill all the fields')
    } else if (phone.length !== 10) {
      Swal.fire('Please enter a valid phone number')
      return;
    }
    else if(name && prn && phone && email && transactionId){ 
      const data = {
        name: name,
        prn: prn,
        phone: phone,
        email: email,
        transactionId: transactionId
      }
      console.log(data)
      const res = await API.createNewStudent(data)
      console.log(res)
      if (res.status === 200) {
        Swal.fire('Registered Successfully')
        closeModal()
      } 
      else if(res.status===202){
        Swal.fire('Transaction Id already used')
        closeModal()
      }
      else {
        Swal.fire('Something went wrong')
      } 
    }
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
              <div className='options'>
                <button className='dandiya' onClick={(e)=>{
                    e.preventDefault()
                    setimg(withDandiya)
                  }}>With Dandiya</button>
                  <button className='dandiya' onClick={(e)=>{
                    e.preventDefault()
                    setimg(withoutDandiya)
                  }}>Without Dandiya</button>
              </div>
                <div className='QR'>
                  <img src={img} alt={img}/>
                </div>
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
                <input
                  type='transactionId'
                  id='transactionId'
                  placeholder='Enter your transaction Id'
                  onChange={handletransactionIdChange}
                />
                
                <button className='btn' type='submit' onClick={handleSubmit}>
                  Register
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
