import Layout from "../components/Layout"
import React from 'react'
import { Form, Row, Col, Input, TimePicker, message } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from "../redux/features/alertSlice"
import axios from 'axios'

const ApplyDentist = () => {
  const {user} = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  //handle form
const handleFinish = async (values) => {
  try {
    dispatch(showLoading());
    const res = await axios.post('/api/v1/users/apply-dentist', {...values, userId: user._id}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
    console.log('Server response:', res.data); // Add this line to log the server response
    dispatch(hideLoading());
    if (res.data.success) {
      message.success(res.data.message);
      navigate("/");
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.error(error);
    message.error("Something went wrong");
  }
}
  return (
    <>
      <Layout>
        <h1 className="text-center">Apply Dentist</h1>
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>         
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone Number" name="phone" required rules={[{required:true}]}>
                <Input type="text" placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your Address" />
            </Form.Item>
          </Col>
          </Row>  
          <h4 className="">Professional Details : </h4>
          <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                <Input type="text" placeholder="Your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Availability" name="availability" required>
                <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary form-btn" type="submit">
                Submit
               </button>
            </div>   
          </Col>
        </Row>
        </Form>
      </Layout>
    </>
    
  )
}

export default ApplyDentist