import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
//import Home from "./page/Home";
import ViewDetails from "./page/ViewDetails"
import Footer from "./component/Footer";
import JobNotes from "./context/JobNotes";

const Home = React.lazy(() => import("./page/Home"));

function App() {

  return (
    <JobNotes>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewdetails/:id" element={<ViewDetails />} />
        </Routes>
        <Footer />
      </Router>
    </JobNotes>
  );
}

export default App;
