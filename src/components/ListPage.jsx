import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Table, Button } from 'react-bootstrap';

const ListPage = () => {
    const basename = process.env.PUBLIC_URL;
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
        let no = 0;
        let rows = [];
        onSnapshot(q, snapshot=>{
            no = 0;
            rows = [];
            snapshot.forEach(row=>{
                no = no + 1;
                const start = (page-1) * 5 + 1;
                const end = (page*5);
                if(no>=start && no<=end){
                    rows.push({ no:no, id:row.id, ...row.data()});
                }
            });

            console.log(rows);
            setPosts(rows);
            setLast(Math.ceil(no / 5));
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
        return <div className='text-center my-4'>Loading...</div>;
    }
    return (
        <div>
            <h1 className="text-center my-4">게시판</h1>
            <div className='mb-2'>
                <Button onClick={onClickWrite} className='px-5'>글쓰기</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td> No. </td>
                        <td> Title </td>
                        <td> Writer </td>
                        <td> Date </td>
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