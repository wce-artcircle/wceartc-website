import axios from 'axios';

export const createNewStudent = async(data1) => {
    const res = await axios.post("http://artc-website-production.up.railway.app/register/", data1);
    return res;
}
export const verifyOTP = async(data1) => {
    const res=await axios.patch("https://artc-website-production.up.railway.app/register/",data1);
    return res;
}
export const getAllRegisteredStudents = async() => {
    const res=await axios.get("https://artc-website-production.up.railway.app/register/getAllRegisteredStudents");
    return res;
}

export const updateStudent = async(id,truthvalue) => {
    const res=await axios.patch(`https://artc-website-production.up.railway.app/register/updateTask/${id}/${truthvalue}`);
    return res;
}
