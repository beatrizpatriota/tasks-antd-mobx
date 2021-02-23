import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context'
import Routes from './routes'

import 'antd/dist/antd.css'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </BrowserRouter>
)

export default App
