import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import { getDatabase, ref, get, update } from 'firebase/database'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';

const UpdatePage = () => {
    const [form, setForm] = useState({
        title: '',
        body: '',
        preTitle: '',
        preBody: ''
    })
    const db = getDatabase(app);
    const params = useParams();
    const { id } = params;
    const navi = useNavigate();

    const getPost = async () => {
        const snapshot = await get(ref(db, `posts/${id}`));
        const post = snapshot.val();
        if (post) {
            setForm({
                title: post.title,
                body: post.body,
                preTitle: post.title,
                preBody: post.body
            });
        }
    }

    const { title, body, preTitle, preBody } = form;

    useEffect(() => {
        getPost();
    }, []);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onClickSave = async () => {
        await update(ref(db, `posts/${id}`), { title, body });
        navi(`/post/read/${id}`);
    }

    const onClickCancel = () => {
        setForm({
            title: preTitle,
            body: preBody,
            preTitle,
            preBody
        });
    }

    return (
        <div>
            <h1 className='my-5 text-center'>게시글수정</h1>
            <Row>
                <Col>
                    <Form>
                        <Form.Control
                            value={title}
                            name='title' onChange={onChange}
                            placeholder="제목을 입력하세요"
                            className='mb-2' />
                        <Form.Control
                            value={body}
                            name='body' onChange={onChange}
                            as='textarea' rows={10} 
                            placeholder="내용을 입력하세요" />
                        <div className='text-center mt-3'>
                            <Button
                                onClick={onClickSave}
                                disabled={title === preTitle && body === preBody}
                                className='px-5 me-2'> 저장 </Button>
                            <Button
                                onClick={onClickCancel}
                                disabled={title === preTitle && body === preBody}
                                className='px-5' variant='secondary'> 취소
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage
