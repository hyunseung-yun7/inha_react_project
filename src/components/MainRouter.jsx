import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import CartPage from './CartPage'
import LoginPage from './user/LoginPage'
import JoinPage from './user/JoinPage'

const MainRouter = () => {
  return (
    <Container>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
        </Routes>
    </Container>
  )
}

export default MainRouter
