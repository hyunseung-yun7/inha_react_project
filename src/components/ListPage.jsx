import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Table, Button } from 'react-bootstrap';

const ListPage = () => {
    const basename = process.env.PUBLIC_URL;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const [list, setList] = useState([]);
    const db = getDatabase(app);
    const email = sessionStorage.getItem('email');
    const nav = useNavigate();

    const getList = () => {
        setLoading(true);
        const unsubscribe = onValue(ref(db, 'posts'), snapshot => {
            const rows = [];
            if (snapshot.exists()) {
                snapshot.forEach(row => {
                    rows.push({
                        id: row.key,
                        ...row.val()
                    });
                });
            }
            // 날짜순으로 내림차순 정렬
            rows.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // 번호 매기기
            const numberedRows = rows.map((row, index) => ({
                ...row,
                no: index + 1
            }));
            
            setAllPosts(numberedRows);
            setLast(Math.ceil(numberedRows.length / 5));
            setLoading(false);
        });
        
        return unsubscribe;
    }

    // 페이징 처리 함수
    const updatePagedList = () => {
        const start = (page - 1) * 5;
        const end = page * 5;
        const pagedRows = allPosts.slice(start, end);
        setList(pagedRows);
    }

    useEffect(() => {
        const unsubscribe = getList();
        
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    useEffect(() => {
        updatePagedList();
    }, [page, allPosts]);
    const onClickWrite = () => {
        if(email){
            nav('/post/write');
        }else{
            sessionStorage.setItem('target', '/post/write');
            nav('/login');
        }
    }

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <div>
            <h1 className='my-5 text-center'>게시글</h1>
            <div className='my-3'>
                <Button className='px-5' variant='outline-primary' size='sm'
                    onClick={onClickWrite}>글쓰기</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td width='30'>No.</td>
                        <td width='50%'>Title</td>
                        <td>Writer</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(bbs=>
                        <tr key={bbs.id}>
                            <td>{bbs.no}</td>
                            <td>
                                <div className='ellipsis'>
                                    <a href={`${basename}/post/read/${bbs.id}?page=${page}`}>{bbs.title}</a>
                                </div>
                            </td>
                            <td>
                                <div className='ellipsis'>{bbs.email}</div>
                            </td>
                            <td>
                                <div className='ellipsis'>{bbs.date}</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={()=>setPage(page-1)}
                    variant='outline-primary' size='sm' disabled={page===1}>이전</Button>
                <span className='px-2'>{page}/{last}</span>
                <Button onClick={()=>setPage(page+1)}
                    variant='outline-primary' size='sm' disabled={page===last}>다음</Button>
            </div>
        </div>
    )
}

export default ListPage