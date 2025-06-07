import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from './ListPage';
import WritePage from './WritePage';
import ReadPage from './ReadPage';
import UpdatePage from './UpdatePage';

const PostRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/read/:id" element={<ReadPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
  )
}

export default PostRouter