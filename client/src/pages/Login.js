
// import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { useNavigate } from "react-router-dom"
import  "../Styles/RegisterStyles.css"
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from "axios";
// import ReCAPTCHA from 'react-google-recaptcha'

     const Login = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
    //  const [capVal, setCapVal] = useState(null)

     //form handler
     const onFinishHandler = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/users/login', values)
            window.location.reload();
            dispatch(hideLoading())
            if(res.data.success){
                localStorage.setItem("token", res.data.token)
                message.success('Login Successfully');
                navigate("/")
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something Went Wrong')
        }
    }


  return (
        <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
            <h3>Register</h3>
            <Form.Item label="Name" name="name">
                <Input type="text" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" required />
            </Form.Item>
            
{/* <ReCAPTCHA sitekey="6LcRJDkpAAAAAExzVnKxQwNcinBMGYcfjwU8lTN1"
onChange={(val)} => setCapVal(val)} />
,
            <h6>Not a User? <Link to="/register">Click Here</Link></h6>

                {/* //diri tingali */}

            <button className="btn btn-primary" type="submit">Login</button>
        </Form>
        </div>
  )
}

export default Login