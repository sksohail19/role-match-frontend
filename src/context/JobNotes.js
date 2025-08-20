import axios from "axios";
import JobContext from "./JobContext";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const JobNotes = (props) => {
    const [job, setJob] = useState([]);
    const [progress, setProgress] = useState(0); // progress state

    const fetch = async () => {
        try {
            setProgress(30); // start progress when API call begins

            const response = await axios.get("https://role-match-backend.onrender.com/api/job/all", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setJob(response.data);
                setProgress(100); // complete progress
            } else {
                console.error("Failed to fetch jobs");
                setProgress(100); // still end progress
            }
        } catch (error) {
            console.log("Unexpected Error Occurred: ", error);
            setProgress(100);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            {/* 🔵 Loading Bar at the top */}
            <LoadingBar
                color="#0d6efd"
                height={3} // Bootstrap primary blue
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            {/* Context Provider */}
            <JobContext.Provider value={{ job, setJob, fetch }}>
                {props.children}
            </JobContext.Provider>
        </>
    );
};

export default JobNotes;
