import axios from 'axios';

export const createNewStudent = async(data) => {
    const res = await axios.post("https://artc-website-production.up.railway.app/register/", data);
    return res;
}
export const verifyOTP = async(data) => {
    const res=await axios.patch("https://artc-website-production.up.railway.app/register/",data);
    return res;
}
export const getAllRegisteredStudents = async() => {
    const res=await axios.get("http://localhost:5000/register/getAllRegisteredStudents");
    return res;
}

export const updateStudent = async(id,truthvalue) => {
    const res=await axios.patch(`http://localhost:5000/register/updateTask/${id}/${truthvalue}`);
    return res;
}
