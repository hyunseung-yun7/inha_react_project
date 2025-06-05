import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from './ListPage';
import WritePage from './WritePage';

const PostRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<ListPage />} />
        {/* <Route path="/post" element={<ListPage />} /> */}
        <Route path="/write" element={<WritePage />} />
      </Routes>
  )
}

export default PostRouter