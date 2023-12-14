import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import countriesCopy from '../data.json'
const countriesList = countriesCopy
ReactDOM.createRoot(document.getElementById('root')).render(<App countries={countriesList} />)