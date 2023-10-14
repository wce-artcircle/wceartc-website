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
    const res=await axios.get("https://artc-website-production.up.railway.app/register/RegisteredStudents");
    return res;
}

export const updateStudent = async(id,truthvalue) => {
    const res=await axios.patch(`https://artc-website-production.up.railway.app/register/updateTask/${id}/${truthvalue}`);
    return res;
}

export const verifyStudent = async(id,truthvalue) => {
    const res=await axios.patch(`https://artc-website-production.up.railway.app/register/verifyTask/${id}/${truthvalue}`);
    return res;
}
//https://artc-website-production.up.railway.app
