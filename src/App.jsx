// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LangwaLanding from './components/LangwaLanding';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LangwaLanding />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
