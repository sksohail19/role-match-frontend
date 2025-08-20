import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobContext from "../context/JobContext";

function Home() {
    const { job } = useContext(JobContext);

    // Search state
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [keywords, setKeywords] = useState("");
    const [remote, setRemote] = useState(false);

    // Infinite scroll state
    const [visibleCount, setVisibleCount] = useState(20); // show first 20
    const [displayedJobs, setDisplayedJobs] = useState([]);

    // Remove HTML Tags
    function stripHtmlTags(str) {
        if (!str) return "";
        return str.replace(/<[^>]*>/g, "").trim();
    }


    // Filter jobs
    const filteredJobs = Array.isArray(job)
        ? job.filter((jobItem) => {
            const companyMatch = company
                ? jobItem.CompanyName?.toLowerCase().includes(company.toLowerCase())
                : true;

            const locationMatch = location
                ? jobItem.Location?.toLowerCase().includes(location.toLowerCase())
                : true;

            const keywordMatch = keywords
                ? (
                    jobItem.Title?.toLowerCase() +
                    " " +
                    jobItem.Description?.toLowerCase()
                ).includes(keywords.toLowerCase())
                : true;

            const remoteMatch = remote
                ? jobItem.Location?.toLowerCase().includes("remote")
                : true;

            return companyMatch && locationMatch && keywordMatch && remoteMatch;
        })
        : [];

    // Update displayed jobs when filters change
    useEffect(() => {
        setDisplayedJobs(filteredJobs.slice(0, visibleCount));
    }, [filteredJobs, visibleCount]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                // load next jobs
                setVisibleCount((prev) => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setVisibleCount(20); // reset to first 20 after search
    };

    return (
        <div className="container my-4">
            {/* 🔍 Search Form */}
            <form className="row g-3" onSubmit={handleSearch}>
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

            {/* 📝 Jobs List */}
            <div className="container mt-4">
                <div className="row g-3">
                    {displayedJobs.length > 0 ? (
                        displayedJobs.map((jobItem, index) => (
                            <div
                                key={index}
                                className="col-12 col-md-6 col-lg-4 d-flex"
                            >
                                <div className="card shadow-sm border-1 rounded-4 flex-fill">
                                    <div className="card-body">
                                        {/* Title + Source */}
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h5 className="card-title mb-1 fw-bold">
                                                {jobItem.Title}
                                            </h5>
                                            <span className="badge bg-light text-primary border">
                                                {jobItem.source}
                                            </span>
                                        </div>

                                        {/* Company + Location + Date */}
                                        <div className="text-muted small mb-2">
                                            <i className="bi bi-building"></i>{" "}
                                            {jobItem.CompanyName} &nbsp; | &nbsp;
                                            <i className="bi bi-geo-alt"></i>{" "}
                                            {jobItem.Location} <br />
                                            <i className="bi bi-clock"></i>{" "}
                                            Posted At: {jobItem.CreatedDate}
                                        </div>

                                        {/* Experience + Salary */}
                                        <div className="row mb-3">
                                            <div className="col">
                                                <small className="text-muted d-block">
                                                    Experience
                                                </small>
                                                <span className="fw-bold">
                                                    {jobItem.Experience}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <small className="text-muted d-block">
                                                    Salary
                                                </small>
                                                <span className="fw-bold">
                                                    {jobItem.Salary}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="card-text small">
                                            <p className="card-text small">
                                                {stripHtmlTags(jobItem.Description).slice(0, 150)}...
                                            </p>
                                        </p>


                                        {/* Actions */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link
                                                to={`/viewdetails/${jobItem._id}`}
                                                className="text-decoration-none"
                                            >
                                                View Details
                                            </Link>
                                            <a
                                                href={jobItem.URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm"
                                            >
                                                Apply Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">
                            No jobs found matching your filters.
                        </p>
                    )}
                </div>

                {/* Loader */}
                {displayedJobs.length < filteredJobs.length && (
                    <p className="text-center mt-3 text-muted">
                        Loading more jobs...
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
