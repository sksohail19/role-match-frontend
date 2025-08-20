import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

function ViewDetails() {
    const { id } = useParams();
    const [job, setJob] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://role-match-backend.onrender.com/api/job/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log(response);
            if (response.status === 200) {
                setJob(response.data);
            } else {
                console.error("Failed to fetch jobs");
            }
        } catch (error) {
            console.log("Unexpected Error Occurred: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body">
                    {/* Title + Source */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h3 className="fw-bold">{job.Title}</h3>
                        <span className="badge bg-light text-primary border">
                            {job.Source}
                        </span>
                    </div>

                    {/* Company + Location + Date */}
                    <p className="text-muted">
                        <i className="bi bi-building"></i> {job.CompanyName} <br />
                        <i className="bi bi-geo-alt"></i> {job.Location} <br />
                        <i className="bi bi-clock"></i> Posted: {job.CreatedDate}
                    </p>

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
                    <h5 className="fw-semibold mt-4">Job Description</h5>
                    <p className="card-text">{job.Description}</p>

                    {/* Skills */}
                    {job.Skills && job.Skills.length > 0 && (
                        <div className="mb-3">
                            <h6 className="fw-semibold">Required Skills:</h6>
                            {job.Skills.map((skill, i) => (
                                <span key={i} className="badge bg-light text-dark border me-1">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <Link to="/" className="btn btn-outline-secondary">
                            ← Back
                        </Link>
                        <a
                            href={job.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Apply Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewDetails
