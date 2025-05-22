import { useState } from 'react'
import AppRouter from '../routes'
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <>
     <RouterProvider router={AppRouter} />
      {/* <Chatbot/> Thêm chatbot vào ứng dụng */}
    </>
  )
}

export default App
