import { createRoot } from 'react-dom/client';
import App from './app';

export * from './app'

createRoot(document.querySelector('#root')).render(<App />)
