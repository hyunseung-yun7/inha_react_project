import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getDatabase, ref, get, remove } from 'firebase/database'
import { Button, Card, Col, Row } from 'react-bootstrap'
import ReplyPage from './ReplyPage'

const ReadPage = () => {
    const login = sessionStorage.getItem('email');
    const [loading, setLoading] = useState(true);
    const db = getDatabase(app);
    const params = useParams();
    const {id} = params;
    const navi = useNavigate();
    const [post, setPost] = useState({
        id:'', 
        title:'',
        body:'',
        date:'',
        email:''
    })

    const {title, body, date, email} = post;

    const getPost = async() => {
        const snapshot = await get(ref(db, `posts/${id}`));
        const data = snapshot.val();
        if(data) {
            setPost({...data, id});
        }
        setLoading(false);
    }

    const onDelete = async () => {
        if(window.confirm('정말 삭제하시겠습니까?')) {
            await remove(ref(db, `posts/${id}`));
            alert('삭제되었습니다.');
            navi('/post');
        }
    }
    
    useEffect(()=>{
        getPost();
    }, []);
    
    if(loading) return <h1 className='text-center my-5'> 로딩중 ... </h1>
    return (
        <div>
            {login === email && 
                <Row className='justify-content-center mb-3'>
                    <Col md={10} className='text-end'>
                        <Button size='sm' 
                            onClick={() => navi(`/post/update/${id}`)}
                            variant='outline-success' className='mx-2'>수정</Button>
                        <Button size='sm' variant='outline-danger'
                            onClick={onDelete}>삭제</Button>
                    </Col>
                </Row>}
            <Row className='justify-content-center'>
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <h3>{title}</h3>
                            <hr/>
                            <p style={{whiteSpace: 'pre-wrap'}}>{body}</p>
                        </Card.Body>
                        <Card.Footer>
                            Posted on {date} by {email}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            
            {/* 댓글 섹션 추가 */}
            <ReplyPage id={id} />
        </div>
    )
}

export default ReadPage
