import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap'
import BookPage from './BookPage';
import { BsCart2 } from 'react-icons/bs';
import { app } from '../firebase';
import { getDatabase, ref, set, get, remove, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";

const Homepage = () => {
  const db = getDatabase(app);
  const [heart, setHeart] = useState([]);
  const [loading, setLoading] = useState(false);
  const uid = sessionStorage.getItem('uid');
  const navi = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("리액트");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const callAPI = async () => {
    try {
      setLoading(true);
      const url = "https://dapi.kakao.com/v3/search/book?target=title"
      const config = {
        "headers": {
          "Authorization": "KakaoAK cc7e003ea763f92f3084120e7b61e44b"
        },
        params: {
          query: query,
          size: 12,
          page: page
        }
      }

      const res = await axios.get(url, config)
      setDocuments(res.data.documents);
      setLastPage(Math.ceil(res.data.meta.pageable_count / 12));
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      alert('도서 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerText = "홈페이지";
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === '') {
      alert("검색어를 입력하세요");
    } else {
      setPage(1);
      callAPI();
    }
  }

  const onClickCart = (book) => {
    if (uid) {
      //장바구니넣기
      get(ref(db, `cart/${uid}/${book.isbn}`))
        .then(snapshot => {
          if (snapshot.exists()) {
            alert("장바구니에 이미 존재합니다");
          } else {
            const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            set(ref(db, `cart/${uid}/${book.isbn}`), { ...book, date })
            alert("장바구니에 추가되었습니다.");
          }
        });
    } else {
      navi('/login');
    }
  }

  // 빈 하트를 클릭한 경우
  const onClickRegHeart = (book) => {
    if (uid) {
      // 좋아요 등록
      set(ref(db, `heart/${uid}/${book.isbn}`), book);
      alert('좋아요 추가 완료!');
    } else {
      navi('/login')
    }
  }

  // 채운 하트를 클릭한 경우
  const onClickHeart = (book) => {
    remove(ref(db, `heart/${uid}/${book.isbn}`))
    alert('좋아요 취소 완료!');
  }

  // 현재 이메일의 좋아요 목록함수
  const checkHeart = () => {
    setLoading(true);
    onValue(ref(db, `heart/${uid}`), snapshot => {
      const rows = [];
      snapshot.forEach(row => {
        rows.push(row.val().isbn);
      });
      console.log(rows);
      setHeart(rows);
      setLoading(false);
    });
  }

  useEffect(() => {
        checkHeart();
    }, [])

  if (loading) {
    return <h1 className='text-center my-5'>로딩중...</h1>
  }

  return (
    <div>
      <h1 className='my-5 text-center'>홈페이지</h1>
      <Row className='mb-2'>
        <Col>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="도서 검색어를 입력하세요"
              />
              <Button type='submit'>검색</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        {documents.map((doc, index) => (
          <Col key={doc.isbn || index} lg={2} md={3} xs={6} className="mb-2">
            <Card>
              <Card.Body>
                <BookPage book={doc} />
                <div className='heart text-end'>
                  {heart.includes(doc.isbn) ?
                    <GoHeartFill onClick={()=> onClickHeart(doc)}/>
                  :
                  <GoHeart onClick={() => onClickRegHeart(doc)}/>
                  }
                </div>
              </Card.Body>
              <Card.Footer>
                <div className='text-truncate'>{doc.title}</div>
                <Row>
                  <Col>{doc.sale_price}원</Col>
                  <Col className='text-end'>
                    <BsCart2 onClick={() => onClickCart(doc)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <div className='text-center mt-3'>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}>이전</Button>
        <span className='mx-2'>{page}</span>
        <Button
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}>다음</Button>
      </div>
    </div>
  )
}

export default Homepage
