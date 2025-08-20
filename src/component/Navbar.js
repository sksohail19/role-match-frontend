import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex flex-column">
                <Link className="navbar-brand" to="/">Role Match</Link>
                <p>Find your right role</p>
            </div>
        </nav>

    )
}

export default Navbar