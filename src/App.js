import './App.css'
import { createContext, useState } from 'react'
import { MainPage } from 'pages/MainPage'
import { SingleBet } from 'pages/SingleBet'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export const BetContext = createContext()
function App() {
  const [context, setContext] = useState(null)
  return (
    <BetContext.Provider value={{ context, setContext }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />

          <Route path='/bet/:id' element={<SingleBet />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 Not Found</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </BetContext.Provider>
  )
}

export default App
