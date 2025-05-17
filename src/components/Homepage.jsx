import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap'

const Homepage = () => {
  const apiKey=process.env.REACT_APP_API_KEY;
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("리액트");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const callAPI = async() => {
    const url = "https://dapi.kakao.com/v3/search/book?target=title"
    const config = {
      "headers": {
        "Authorization": "KakaoAK cc7e003ea763f92f3084120e7b61e44b"
      },
      params: {
        query: query,
        size:12,
        page:page
      }
    }
    
    const res = await axios.get(url, config)
    setDocuments(res.data.documents);
    setLastPage(Math.ceil(res.data.meta.pageable_count/12));
  }

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerText = "홈페이지";
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query===''){
      alert("검색어를 입력하세요");
    } else {
      callAPI();
    }
  }
  return (
    <div>
      <h1 className='my-5 text-center'>홈페이지</h1>
      <Row className='mb-2'>
        <Col>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control onChange={(e)=>setQuery(e.target.value)} 
                value={query}/>
              <Button type='submit'>검색</Button>
            </InputGroup>
          </Form>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        {documents.map(doc=>
          <Col lg={2} md={3} xs={6}>
            <Card>
              <Card.Body>
                  <img src={doc.thumbnail} width="100%"/>
                </Card.Body>
              <Card.Footer>
                <div className='text-truncate'>{doc.title}</div>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
      <div className='text-center mt-3'>
        <Button 
          disabled={page===1}
          onClick={()=>setPage(page-1)}>이전</Button>
        <span>{page}</span>
        <Button 
          disabled={page===lastPage}
          onClick={()=>setPage(page+1)}>다음</Button>
      </div>
    </div>
  )
}

export default Homepage
