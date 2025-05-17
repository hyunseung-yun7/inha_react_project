import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const LoginPage = () => {
  const basename = process.env.PUBLIC_URL;
  const [form, setForm] = React.useState({
    email: 'blue@inha.com',
    pass: '12341234'
  });
  const { email, pass } = form;
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //유효성체크
    if(email ==='' || pass ===''){
      alert('이메일과 비밀번호를 입력해주세요.');
    }else{
      //로그인체크
    }
  };

  return (
    <div>
      <Row className='my-5 justify-content-center'>
        <Col lg={4} md={6} xs={8}>
          <Card>
            <Card.Header>
              <h5>로그인</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Control
                  placeholder="email" className='mb-2'
                  value={email}
                  name='email'
                  onChange={onChange} />
                <Form.Control
                  placeholder="password" type='password' className='mb-2'
                  value={pass}
                  name='pass'
                  onChange={onChange} />
                <Button className="w-100">로그인</Button>
              </Form>
              <div>
                <a href={`${basename}/join`}>회원가입</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage