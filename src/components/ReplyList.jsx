import { Row, Col, Button, Form } from 'react-bootstrap'
import { app } from '../firebase'
import { getDatabase, ref, onValue, remove, update } from 'firebase/database'
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const ReplyList = ({pid}) => {
    const login = sessionStorage.getItem('email');
    const db = getDatabase(app);
    const [list, setList] = useState([]);

    const getList = () => {
        const unsubscribe = onValue(ref(db, 'replies'), snapshot => {
            let rows = [];
            if (snapshot.exists()) {
                snapshot.forEach(row => {
                    const reply = row.val();
                    if (reply.pid === pid) {
                        rows.push({id: row.key, ...reply});
                    }
                });
            }
            // 날짜순으로 내림차순 정렬
            rows.sort((a, b) => new Date(b.date) - new Date(a.date));
            const data = rows.map(row => row && {...row, ellipsis: true, edit: false, text: row.contents});
            setList(data);
        });
        return unsubscribe;
    }

    useEffect(() => {
        const unsubscribe = getList();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [pid]);

    const onClickContents = (id) => {
        const data = list.map(reply=>reply.id===id ? 
            {...reply, ellipsis:!reply.ellipsis}: reply);
        setList(data);
    }

    const onClickUpdate = (id) => {
        const data = list.map(reply=>reply.id===id ? 
            {...reply, edit:!reply.edit} : reply);
        console.log(id);
        setList(data);
    }

    const onChangeContents = (id, e)=> {
        const data = list.map(reply=> reply.id===id ? 
            {...reply, contents:e.target.value}: reply);
        setList(data);
    }

    const onClickCancel = (r) => {
        const data = list.map(reply=>reply.id===r.id ? 
            {...reply, edit:false, contents:reply.text} : reply);
        setList(data);
    }

    const onClickSave = async (reply) => {
        if (reply.contents !== reply.text) {
            await update(ref(db, `replies/${reply.id}`), {
                contents: reply.contents
            });
            alert('댓글이 수정되었습니다.');
        }
    }

    const onClickDelete = async (reply) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            await remove(ref(db, `replies/${reply.id}`));
            alert('댓글이 삭제되었습니다.');
        }
    }

    return (
        <Row className='justify-content-center'>
            <Col md={10}>
                {list.map(reply=>
                    <div key={reply.id} className='my-5'>
                        <Row>
                            <Col className='text-muted'>
                                {reply.date}:{reply.email}
                            </Col>
                            {reply.email === login && !reply.edit &&
                                <Col className='text-end'>
                                    <CiEdit onClick={()=>onClickUpdate(reply.id)} className='edit'/>
                                    <MdDeleteOutline onClick={()=>onClickDelete(reply)} className='delete'/>
                                </Col>
                            }
                        </Row>
                        {reply.edit ? 
                            <Form>
                                <TextareaAutosize className='textarea'
                                    onChange={(e)=>onChangeContents(reply.id, e)}
                                    value={reply.contents}/>  
                                <div className='text-end'>
                                    <Button onClick={()=>onClickSave(reply)} size='sm' variant='primary' className='mx-2' 
                                        disabled={reply.text===reply.contents}>저장</Button>
                                    <Button onClick={()=>onClickCancel(reply)} 
                                        size='sm' variant='secondary'>취소</Button>
                                </div>      
                            </Form>
                            :
                            <div onClick={()=>onClickContents(reply.id)} style={{cursor:'pointer'}}
                                className={reply.ellipsis ? 'ellipsis2' : ''}>
                                    <p style={{whiteSpace:'pre-wrap'}}>{reply.contents}</p>
                            </div>
                        }
                    </div>
                )}
            </Col>
        </Row>
    )
}

export default ReplyList