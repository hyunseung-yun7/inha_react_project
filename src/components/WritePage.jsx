import React, {useState} from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { app } from '../firebase';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const WritePage = () => {
    const db = getFirestore(app);
    const navi = useNavigate();
    const [form, setForm] = React.useState({
        email: sessionStorage.getItem('email'),
        date:'',
        title: '',
        body:''
    });
    const {title, body} = form;
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (title === '' || body === '') {
            alert('제목과 내용을 입력해주세요.');
        }else {
            //게시글 등록
            const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            addDoc(collection(db, 'posts'), {...form,date})
            navi('/post')
        }
    }

    const onReset = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            title: '',
            body: ''
        })
    }
    return (
        <div>
            <h1 className="text-center my-5">글쓰기</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form onSubmit={onSubmit}>
                        <Form.Control className='mb-3'
                        name='title' value={title} onChange={onChangeForm}
                        placeholder='제목을 입력하세요'/>
                        <Form.Control as='textarea' rows={10} className='my-3'
                        name='body' value={body} onChange={onChangeForm}
                        placeholder='내용을 입력하세요'/>
                        <div className='mt-3 text-center'>
                            <Button className='px-5 mx-2' type="submit">등록</Button>
                            <Button className='px-5' variant='secondary'>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default WritePage;
