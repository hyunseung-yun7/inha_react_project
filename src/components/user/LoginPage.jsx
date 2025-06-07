import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { app } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: 'test@test.com',
    pass: '123456'
  });
  const { email, pass } = form;
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    // Submit 이벤트가 발생하면 새로고침을 방지
    // e.preventDefault()를 사용하여 기본 동작을 막을 수 있습니다.
    e.preventDefault();
    //유효성체크
    if (email === '' || pass === '') {
      alert('이메일과 비밀번호를 입력해주세요.');
    } else {
      //로그인체크
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then(success => {
          alert('로그인 성공');
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('uid', success.user.uid);
          setLoading(false);

          if (sessionStorage.getItem('target')) {
            navigate(sessionStorage.getItem('target'));
            sessionStorage.removeItem('target');
          } else {
            navigate('/');
          }
        })
        .catch(error => {
          console.log('로그인 에러:', error);
          alert('로그인 실패: ' + error.message);
          setLoading(false);
        });
    }
  };

  if (loading) return <h1 className='my-5 text-center'>로딩중...</h1>
  return (
    <div>
      <Row className='my-5 justify-content-center'>
        <Col lg={4} md={6} xs={8}>
          <Card>
            <Card.Header>
              <h5>로그인</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
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
                <Button className="w-100" type="submit">로그인</Button>
              </Form>
              <div className='text-center mt-3'>
                <Link to="/join">회원가입</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage