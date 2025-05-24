import React, {useState, useEffect} from 'react'
import { app } from '../../firebase'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import BookPage from '../BookPage'
import { Table, Button } from 'react-bootstrap'

const CartPage = () => {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const db = getDatabase(app)
  const uid = sessionStorage.getItem('uid')

  const getCart = () => {
    onValue(ref(db, `cart/${uid}`), snapshot=> {
      const rows=[];
      snapshot.forEach(row=>{
        rows.push({key:row.key, ...row.val()})
      })
      setBooks(rows)
    })
  }

  useEffect(() => {
    getCart()
  }, [])

  const onClickRemove = (book) => {
    if(window.confirm(`'${book.title}'을(를) 삭제하시겠습니까?`)) {
      remove(ref(db, `cart/${uid}/${book.isbn}`))
    }
  }

  if(loading) return <h1>로딩중...</h1>
  return (
    <div>
      <h1 className='my-5 text-center'>장바구니</h1>
      <Table>
        <thead>
          <tr>
            <th>도서</th>
            <th>제목</th>
            <th>가격</th>
            <th>등록일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.isbn}>
              <td><BookPage book={book} /></td>
              <td>{book.title}</td>
              <td>{book.sale_price}원</td>
              <td>{book.date}</td>
              <td>
                <Button onClick={()=>onClickRemove(book)}
                  size='sm' variant='outline-danger'>삭제</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default CartPage;