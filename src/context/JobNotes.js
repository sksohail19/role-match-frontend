import axios from "axios";
import JobContext from "./JobContext";
import { useEffect, useState } from "react";

const JobNotes = (props) => {
    const [job, setJob] = useState([]);
    
    const fetch = async () => {
        try {
            const response = await axios.get("https://role-match-backend.onrender.com/api/jobs/all", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setJob(response.data);
            } else {
                console.error("Failed to fetch jobs");
            }
        } catch(error) {
            console.log("Unexpected Error Occurred: ", error);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <JobContext.Provider value={{job, setJob, fetch}}>
            {props.children}
        </JobContext.Provider>
    )
}

export default JobNotes