import React, { useEffect, useState } from 'react';
import './admin.css';
import * as API from '../../API/registerAPI';

const Admin = () => {
  const [userDetails, setuserDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  
  const updateUsers = async () => {
    try {
      const res = await API.getAllRegisteredStudents();
      console.log(res.data);
      setuserDetails(res.data.tasks);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    updateUsers();
  }, []);

  useEffect(() => {
    // Filter the userDetails based on the search input
    const filtered = userDetails.filter((item) => {
      return search === '' ? true : String(item.otp).includes(search);
    });
    setFilteredItems(filtered);
  }, [userDetails, search]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

  const handleCheckBox = async (e, index) => {
    if(!e){
        alert('user is already marked')
        return
    }
    
    try {
        for(let i=0;i<userDetails.length;i++){
            if(userDetails[i]._id===index){
                userDetails[i].visited=e
                break
            }
        }
        setuserDetails([...userDetails])
        const updateCheck = await API.updateStudent(index, e);
        
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };

  const verifyCheckBox = async (e, index) => {
    if(!e){
        alert('user is already marked')
        return
    }
    
    try {
        for(let i=0;i<userDetails.length;i++){
            if(userDetails[i]._id===index){
                userDetails[i].verified=e
                break
            }
        }
        setuserDetails([...userDetails])
        const verifyCheck = await API.verifyStudent(index, e);
        
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };

  return (
    <div id="admin-page">
      <h1>Admin</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter the otp"
          onChange={handleSearch}
        />
      </div>
      <div className="student-list">
        <table>
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Name</th>
              <th>Transaction Id</th>
              <th>PRN</th>
              <th>OTP</th>
              <th>Scanned</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((user, index) => (
              <tr key={index}>
                <td>{user.phone}</td>
                <td>{user.name}</td>
                <td>{user.transactionId}</td>
                <td>{user.prn}</td>
                
                <td>{user.otp}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.visited}
                    onChange={(e) => {
                      handleCheckBox(e.target.checked, user._id);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.verified}
                    onChange={(e) => {
                      verifyCheckBox(e.target.checked, user._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;