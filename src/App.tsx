import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './components/auth/SignInPage';
import CompetitorTracker from './components/competitors/CompetitorTracker';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<CompetitorTracker />} />
      </Routes>
    </BrowserRouter>
  );
}