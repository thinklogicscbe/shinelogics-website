
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Headers for requests
const headers = {
    'Content-Type': 'application/json',
};

// Job API

export const createJob = async (jobData: any) => {
    const response = await fetch(`${backendUrl}/jobs/details`, {
        method: 'POST',
        headers,
        body: JSON.stringify(jobData),
    });
    return response.json();
};

export const getAllJobs = async () => {
    const response = await fetch(`${backendUrl}/jobs/details`, { headers });
    return response.json();
};

export const getJobById = async (jobId: string) => {
    const response = await fetch(`${backendUrl}/jobs/details/${jobId}`, { headers });
    return response.json();
};

export const updateJobById = async (jobId: string, jobData: any) => {
    const response = await fetch(`${backendUrl}/jobs/details/${jobId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(jobData),
    });
    return response.json();
};

export const deleteJobById = async (jobId: string) => {
    const response = await fetch(`${backendUrl}/jobs/details/${jobId}`, {
        method: 'DELETE',
        headers,
    });
    return response.json();
};