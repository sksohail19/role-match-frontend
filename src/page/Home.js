import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import JobContext from '../context/JobContext';


function Home() {
    const { job, setJob, fetch } = useContext(JobContext);

    return (
        <>
            <div className="container">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="companyname" class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="companyname" />
                    </div>
                    <div class="col-md-6">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control" id="llocation" />
                    </div>
                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" placeholder="React, Angular, Vue" />
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Remote
                            </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </form>

                <div class="card shadow-sm border-0 rounded-3 mb-3" style={{maxWidth: "400px"}}>
                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title mb-1 fw-bold">${job.Title}</h5>
                            <span class="badge bg-light text-primary border">${job.source}</span>
                        </div>


                        <div class="text-muted small mb-2">
                            <i class="bi bi-building"></i> ${job.CompanyName}
                            <i class="bi bi-geo-alt"></i> ${job.Location} <br />
                            <i class="bi bi-clock"></i> ${job.CreatedDate}
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <small class="text-muted d-block">Experience</small>
                                <span class="fw-bold">${job.Experience}</span>
                            </div>
                            <div class="col">
                                <small class="text-muted d-block">Salary</small>
                                <span class="fw-bold">${job.Salary}</span>
                            </div>
                        </div>


                        <p class="card-text small">
                            ${job.Description}
                        </p>



                        <div class="d-flex justify-content-between align-items-center">
                            <Link to="/view-details" class="text-decoration-none">View Details</Link>
                            <a href="${job.Link}" class="btn btn-primary btn-sm">Apply Now</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
