import React, { useState, useEffect } from "react";
// import Swal from 'sweetalert2'
// import axios from 'axios'
// import * as API from '../../API/registerAPI'
import "./events.css";
import "./events.css";

const Event = ({ index, idx, Name, date, description, icon, register }) => {
  // const [isOpen, setIsOpen] = useState(false)
  const [descp, setDescp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // const [img, setimg] = useState(withDandiya)
  // const [text,setText]=useState("With Dandiya");
  // const [amount, setAmount] = useState("150/-")
  // const openModal = () => {
  //   setIsOpen(true)
  // }

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  const [truncatedDescription, setTruncatedDescription] = useState("");
  useEffect(() => {
    setTruncatedDescription(description.slice(0, 50) + "...");
  }, [description]);

  // const [name, setName] = useState()
  // const [prn, setPrn] = useState()
  // const [phone, setPhone] = useState()
  // const [email, setEmail] = useState()
  // const [transactionId,setTransactionId]=useState()

  // const handleNameChange = (e) => {
  //   setName(e.target.value)
  // }
  // const handlePrnChange = (e) => {
  //   setPrn(e.target.value)
  // }
  // const handlePhoneChange = (e) => {
  //   setPhone(e.target.value)
  // }
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value)
  // }
  // const handletransactionIdChange=(e) =>{
  //   setTransactionId(e.target.value)
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log(name, prn, phone, email)
  //   if (!name || !prn || !phone || !email || !transactionId) {
  //     Swal.fire('Please fill all the fields')
  //   } else if (phone.length !== 10) {
  //     Swal.fire('Please enter a valid phone number')
  //     return;
  //   }
  //   else if(name && prn && phone && email && transactionId){
  //     const data = {
  //       name: name,
  //       prn: prn,
  //       phone: phone,
  //       email: email,
  //       transactionId: transactionId,
  //       amount: amount
  //     }
  //     console.log(data)
  //     const res = await API.createNewStudent(data)
  //     console.log(res)
  //     if (res.status === 200) {
  //       Swal.fire('Registered Successfully')
  //       closeModal()
  //     }
  //     else if(res.status===202){
  //       Swal.fire('Transaction Id already used')
  //       closeModal()
  //     }
  //     else {
  //       Swal.fire('Something went wrong')
  //     }
  //   }
  // }

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="event">
        <div className="event-image">
          <img src={icon} alt="" />
        </div>
        <div className="event-info">
          <h1 className="rainbow-text">{Name}</h1>
          <p>{truncatedDescription}</p>
          <div className="buttons">
            <button className="btn" onClick={() => setDescp(true)}>
              Read More
            </button>
            {register && (
              <a href={register} target="_blank" rel="noreferrer">
                <button className="btn">Register Now</button>
              </a>
            )}
            {/* <button
              className={`${idx === 1 ? '' : 'hidden'} btn`}
              onClick={openModal}
            >
              Register
            </button> */}
          </div>
        </div>
      </div>

      {/*
      {isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <div className='event-form'>
              <h1>{Name}</h1>
              <form>
                <div className='QR'>
                  <img src={img} alt={img}/>
                </div>
                <div className='options' style={{marginLeft:'6rem'}}>
                *Without dandiya
                
              <input type="checkbox"  id='cb'  onChange={(e)=>{
                if(e.target.checked){
                  setAmount("100/-")
                  setimg(withoutDandiya)
                }
                else{
                  setAmount("150/-")
                  setimg(withDandiya)
                }
              }}  />
              </div>

              {/* <div className='inputTag'> //
                  <input
                    value={amount}
                    contentEditable={false}
                    className='inputTag'
                    style={{height:'10px',margin:'3px'}}
                  />
                  <input
                    type='text'
                    id='name'
                    placeholder='Enter your Name'
                    onChange={handleNameChange}
                    className='inputTag'
                    style={{height:'10px',margin:'3px'}}
                  />
                  <input
                    type='text'
                    id='prn'
                    placeholder='Enter your PRN'
                    onChange={handlePrnChange}
                    className='inputTag'
                    style={{height:'10px',margin:'3px'}}
                  />
                  <input
                    type='text'
                    id='phone'
                    placeholder='Enter your Mobile Number'
                    onChange={handlePhoneChange}
                    className='inputTag'
                    style={{height:'10px',margin:'3px'}}
                  />
                  <input
                    type='email'
                    id='email'
                    placeholder='Enter your Email Id'
                    onChange={handleEmailChange}
                    className='inputTag'
                    style={{height:'10px',margin:'3px'}}
                  />
                  <input
                    type='transactionId'
                    id='transactionId'
                    placeholder='Enter your transaction Id'
                    onChange={handletransactionIdChange}
                    style={{height:'10px',margin:'3px'}}
                  />
                  
                  
                  <button className='btn' type='submit' onClick={handleSubmit} >
                    Register
                  </button>
               
              </form>
            </div>
          </div>
        </div>
      )}
        */}

      {descp && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDescp(false)}>
              &times;
            </span> 
            <div
              className="event-descp"
              style={{
                display: isModalOpen ? "none" : "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: isSmallScreen ? "0rem" : "20rem",
                gap: isSmallScreen ? "1rem" : "10rem",
                fontSize: isSmallScreen ? "4rem" : "1rem",
                fontWeight: isSmallScreen ? "normal" : "bold",
              }}
            >
              <div className="event-image">
                <img
                  src={icon}
                  alt=""
                  onClick={toggleModal}
                  style={{ borderRadius: "0.7rem" }}
                />
              </div>
              <div className="event-info">
                <h1 className="rainbow-text1">{Name}</h1>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal1" onClick={toggleModal}>
          <span className="close1">&times;</span>
          <img className="modal1-content" src={icon} alt={Name} />
          <div className="modal1-caption">{Name}</div>
        </div>
      )}
    </div>
  );
};

export default Event;
