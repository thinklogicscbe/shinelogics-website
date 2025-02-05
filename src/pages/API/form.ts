const backendUrl = process.env.REACT_APP_BACKEND_URL;
const headers = {
    'Content-Type': 'application/json',
};

export const createForm = async (jobData: any) => {
    const response = await fetch(`${backendUrl}/form/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify(jobData),
    });
    return response.json();
};