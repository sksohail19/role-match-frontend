import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import JobContext from "../context/JobContext";

function Home() {
  const { job } = useContext(JobContext);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [remote, setRemote] = useState(false);

  return (
    <>
      <div className="container my-4">
        {/* 🔍 Search Form */}
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="companyname" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyname"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Keywords
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="React, Angular, Vue"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                checked={remote}
                onChange={(e) => setRemote(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Remote
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>

        {/* 📝 Job Card */}
        {job && (
          <div
            className="card shadow-sm border-0 rounded-3 mb-3 mt-4"
            style={{ maxWidth: "400px" }}
          >
            <div className="card-body">
              {/* Title + Source */}
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title mb-1 fw-bold">{job.Title}</h5>
                <span className="badge bg-light text-primary border">
                  {job.Source}
                </span>
              </div>

              {/* Company + Location + Date */}
              <div className="text-muted small mb-2">
                <i className="bi bi-building"></i> {job.CompanyName} &nbsp; | &nbsp;
                <i className="bi bi-geo-alt"></i> {job.Location} <br />
                <i className="bi bi-clock"></i> {job.CreatedDate}
              </div>

              {/* Experience + Salary */}
              <div className="row mb-3">
                <div className="col">
                  <small className="text-muted d-block">Experience</small>
                  <span className="fw-bold">{job.Experience}</span>
                </div>
                <div className="col">
                  <small className="text-muted d-block">Salary</small>
                  <span className="fw-bold">{job.Salary}</span>
                </div>
              </div>

              {/* Description */}
              <p className="card-text small">{job.Description}</p>

              {/* Actions */}
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/viewdetails/:id" className="text-decoration-none">
                  View Details
                </Link>
                <a
                  href={job.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
