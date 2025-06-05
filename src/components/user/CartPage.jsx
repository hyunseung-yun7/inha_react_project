import React, {useState, useEffect} from 'react'
import { app } from '../../firebase'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Table, Button } from 'react-bootstrap'
import BookPage from '../BookPage'

const CartPage = () => {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const db = getDatabase(app);

  const getCart = () => {
    setLoading(true);
    const uid=sessionStorage.getItem('uid');
    onValue(ref(db, `cart/${uid}`), snapshot=> {
      let rows=[];
      snapshot.forEach(row=>{
        rows.push({key:row.key, ...row.val()})
      })
      console.log(rows);
      setBooks(rows);
      setLoading(false);
    });
  }

  useEffect(() => {
    getCart()
  }, [])

  const onClickRemove = (book) => {
    if(window.confirm(`'${book.title}'을(를) 삭제하시겠습니까?`)) {
      const uid=sessionStorage.getItem('uid');
      remove(ref(db, `cart/${uid}/${book.isbn}`))
    }
  }

  if(loading) return <h1 className='my-5 text-center'>로딩중...</h1>
  return (
    <div className='my-5'>
      <h1 className='my-5 text-center'>장바구니</h1>
      <Table striped hover style={{fontStyle:'12px'}}>
        <thead>
          <tr style={{textAlign:'center'}}>
            <td width={50}></td>
            <th>제목</th>
            <th>저자</th>
            <th>출판사</th>
            <th>가격</th>
            <th>등록일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.isbn}>
              <td><BookPage book={book}/></td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
              <td>{book.sale_price}원</td>
              <td>{book.date}</td>
              <td>
                <Button variant='outline-danger' size='sm'
                  onClick={()=>onClickRemove(book)}>삭제</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default CartPage;