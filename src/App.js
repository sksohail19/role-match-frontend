import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Footer from "./component/Footer";
import JobNotes from "./context/JobNotes";

function App() {

  return (
    <JobNotes>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </JobNotes>
  );
}

export default App;
