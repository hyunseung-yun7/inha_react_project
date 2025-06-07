import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: 'test@test.com',
        pass: '123456',
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
            //회원가입체크
            if(window.confirm('회원가입 하시겠습니까?')){
                setLoading(true);
                createUserWithEmailAndPassword(auth, email, pass)
                .then(success => {
                    console.log('회원가입 성공:', success);
                    alert('회원가입 성공');
                    navigate('/login');
                })
                .catch(error =>{
                    console.log('회원가입 에러:', error);
                    setLoading(false);
                    alert('회원가입 실패: ' + error.message);
                })
            }
        }
    };
    if(loading) return <h1 className='my-5 text-center'>로딩중...</h1>
    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col lg={4} md={6} xs={8}>
                    <Card>
                        <Card.Header>
                            <h5>회원가입</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control className='mb-2'
                                    value={email} name='email'
                                    onChange={onChange}/>
                                <Form.Control className='mb-2'
                                    value={pass} name='pass' type='password'
                                    onChange={onChange}/>
                                <Button className='w-100' type='submit'>회원가입</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default JoinPage;
