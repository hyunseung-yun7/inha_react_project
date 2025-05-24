import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { app } from '../firebase';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import BookPage from './BookPage';

const CartPage = () => {
  const db = getDatabase(app);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const uid = sessionStorage.getItem('uid');
  const navi = useNavigate();

  const callCart = async () => {
    try {
      setLoading(true);
      const snapshot = await get(ref(db, `cart/${uid}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const temp = [];
        for (let key in data) {
          temp.push(data[key]);
        }
        setBooks(temp);
      }
    } catch (error) {
      console.error('장바구니 데이터 로딩 중 오류:', error);
      alert('장바구니 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerText = "장바구니";
    if (!uid) {
      navi('/login');
    } else {
      callCart();
    }
  }, []);

  const onClickDelete = (isbn) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      remove(ref(db, `cart/${uid}/${isbn}`))
        .then(() => {
          alert('삭제되었습니다.');
          callCart();
        })
        .catch(error => {
          console.error('삭제 중 오류:', error);
          alert('삭제 중 오류가 발생했습니다.');
        });
    }
  };

  if (loading) {
    return <h1 className='text-center my-5'>로딩중...</h1>;
  }

  return (
    <div>
      <h1 className='my-5 text-center'>장바구니</h1>
      <Row>
        {books.map((book, index) => (
          <Col key={book.isbn || index} lg={2} md={3} xs={6} className="mb-3">
            <Card>
              <Card.Body>
                <BookPage book={book} />
              </Card.Body>
              <Card.Footer>
                <div className='text-truncate'>{book.title}</div>
                <div>{book.sale_price}원</div>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="w-100"
                  onClick={() => onClickDelete(book.isbn)}
                >
                  삭제
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CartPage; 