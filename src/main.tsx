import React from 'react';
import { createRoot } from 'react-dom/client';
import 'katex/dist/katex.min.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/app.css';
import './styles/content.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);
