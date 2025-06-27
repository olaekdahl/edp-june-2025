import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import { AboutUs, QuickBio, ContactUs, FourOhFour } from './AboutUs';
import { PeoplePicker } from './PeoplePicker';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <Link to="/peoplePicker">People Picker</Link>
            <Link to="/aboutUs">About</Link>
            <Link to="/contactUs">Contact Us</Link>
            <Link to="/bio">Bio</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PeoplePicker />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/peoplePicker" element={<PeoplePicker />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/bio" element={<QuickBio />} />
            <Route path="*" element={<FourOhFour />} />
          </Routes>
        </main>
        <footer>
          <section>
            Copyright &copy; 2025 The best cohort
          </section>
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
