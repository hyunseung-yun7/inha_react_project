import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Table, Button } from 'react-bootstrap';

const ListPage = () => {
    const db = getFirestore(app);
    const navi = useNavigate();
    const email = sessionStorage.getItem('email');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const getList = () => {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
        setLoading(true);
        onSnapshot(q, snapshot=>{
            const rows = [];
            let no = 0;
            const total = snapshot.size;
            setLast(Math.ceil(total/5));
            
            snapshot.forEach(row=>{
                no = no + 1;
                rows.push({id: row.id, no: no, ...row.data()});
            });
            
            // 페이지네이션 적용
            const start = (page - 1) * 5;
            const end = start + 5;
            const pagePosts = rows.slice(start, end);
            
            setPosts(pagePosts);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getList();
    }, [page]);

    const onClickPrev = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    const onClickNext = () => {
        setPage(page + 1);
    }

    function onClickWrite() {
        if (email) {
            navi(`/post/write`);
        } else {
            sessionStorage.setItem('target', '/post/write');
            navi('/login');
        }
    }
    if (loading) {
        return <div className='text-center my-5'>Loading...</div>;
    }
    return (
        <div>
            <h1 className="text-center my-5">게시판</h1>
            <div className='mb-2'>
                <Button onClick={onClickWrite} className='px-5'>글쓰기</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Title</td>
                        <td>Writer</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post=>
                        <tr key={post.no}>
                            <td>{post.no}</td>
                            <td>{post.title}</td>
                            <td>{post.email}</td>
                            <td>{post.date}</td>
                        </tr>
                    )}
                </tbody>
            </ Table>
            <div className='text-center'>
                <Button onClick={()=>setPage(page-1)} disabled={page === 1} size='sm' className='px-3'>이전</Button>
                <span className='mx-3'>{page}/{last || 1}</span>
                <Button onClick={()=>setPage(page+1)} disabled={page >= last} size='sm' className='px-3'>다음</Button>
            </div>
        </div>
    );
}

export default ListPage;