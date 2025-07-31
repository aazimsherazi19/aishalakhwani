import React, { useEffect } from 'react';
import { Select, Card, Flex, Form, Input, Button, Typography, Alert, Spin } from 'antd';
import './Register.css';
import { Link } from 'react-router-dom';
import registerImage from '../../assets/drx.jpg';
import usesignup from '../../hooks/usesignup';

const Register = () => {
  const { loading, error, registerUser } = usesignup();
  const [form] = Form.useForm();  
  
  useEffect(() => {
    document.body.classList.add('register-page');

    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const handleRegister = (values) => {
    registerUser(values).then(() => {
      form.resetFields(); 
    });
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join for exclusive access!
          </Typography.Text>
          <Form
            form={form} 
            layout="vertical"
            onFinish={handleRegister} 
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm password!',
                },
              ]}
            >
              <Input.Password size="large" placeholder="Re-enter your Password" />
            </Form.Item>
           

            {error && <Alert description={error} type="error" showIcon closable className="alert" />}
            <Form.Item>
              <Button type={`${loading ? '' : 'primary'}`} htmlType="submit" size="large" className="btn">
                {loading ? <Spin /> : 'Create Account'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login">
                <Button size="large" className="btn">
                  Sign In
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>

        {/* image */}
        <Flex flex={1}>
          <img src={registerImage} className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
