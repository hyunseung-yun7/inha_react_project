import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const JoinPage = () => {
    const [form, setForm] = useState({
        email: 'green@inha.com',
        pass: '12341234',
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
        }
    };
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

export default JoinPage
