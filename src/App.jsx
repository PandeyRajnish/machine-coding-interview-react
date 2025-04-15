import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TabForm from './pages/TabForm';
import About from './pages/About';
import PaginationPage from './pages/PaginationPage';
import InfiniteScroll from './pages/InfiniteScroll';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="tab-form" element={<TabForm />} />
          <Route path="pagination" element={<PaginationPage />} />
          <Route path="infinite-scroll" element={<InfiniteScroll />} />
        </Route>
      </Routes>
    </Router>
  );
}
