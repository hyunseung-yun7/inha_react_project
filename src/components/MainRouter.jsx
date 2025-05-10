import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import CartPage from './CartPage'
import LoginPage from './LoginPage'

const MainRouter = () => {
  return (
    <Container>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Container>
  )
}

export default MainRouter
