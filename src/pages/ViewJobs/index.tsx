import React, { useState, useEffect } from "react";
import { getAllWithCount, updateJobById, deleteJobById } from "../API/AdminUser";
import { Select, MenuItem } from "@mui/material";

import { MdDelete, MdEdit, MdClose } from "react-icons/md";


import {
    Modal,
    ModalContent,
    ModalHeader,
    Input,
    BtnContainer,
    Btn,
    Container,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableData,


    JobListingsHeading,
    Heading
} from "./style";
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination from Material UI


interface Job {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    shortDescription: string;
    summary: {
        location: string;
        jobType: string;
        numberOfPositions: number;
        qualifications: string;
        experience: string;
        datePosted: string;
    };
    requirements: string;
    qualifications: string;
    skills: string[];
    status: number;
    applicantCount: number;
}

const ViewJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState<Job | null>(null);
    const [expandedSkills, setExpandedSkills] = useState<{ [key: string]: boolean }>({});

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default 5 jobs per page

    useEffect(() => {
        fetchJobs();
    }, [page, rowsPerPage]); // Fetch jobs when page or rows per page changes

    const fetchJobs = async () => {
        try {
            const data = await getAllWithCount();
            setJobs(Array.isArray(data.result) ? data.result : []);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleEdit = (job: Job) => {
        setEditingJob(job);
        setFormData({ ...job });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (!formData) return;

        if (name.startsWith("summary.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                summary: { ...formData.summary, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingJob || !formData) return;
        try {
            await updateJobById(editingJob._id, formData);
            setEditingJob(null);
            fetchJobs();
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    const handleCloseJob = async (jobId: string) => {
        try {
            const updatedData = { status: 0 }; // Set status to 0 for closing the job

            await updateJobById(jobId, updatedData);
            fetchJobs(); // Refresh job list after update
        } catch (error) {
            console.error("Error closing job:", error);
        }
    };


    const handleDelete = async (jobId: string) => {
        try {
            await deleteJobById(jobId);
            fetchJobs();
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage); // Update the page state
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Update the rows per page state
        setPage(0); // Reset to the first page when rows per page changes
    };

    const handleStatusChange = async (jobId: string, newStatus: string) => {
        try {
            console.log(`Updating Job ID: ${jobId} to Status: ${newStatus}`);

            const updatedData = { status: parseInt(newStatus, 10) }; // Convert status to number if needed
            await updateJobById(jobId, updatedData); // Send API request to update status

            fetchJobs(); // Refresh the job list after update
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    };


    return (
        <Container>
            <JobListingsHeading>Job Listings</JobListingsHeading>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Location</TableHeader>
                        <TableHeader>Job Type</TableHeader>
                        <TableHeader>No. of Positions</TableHeader>
                        <TableHeader>Qualifications</TableHeader>
                        <TableHeader>Experience</TableHeader>
                        <TableHeader>Date Posted</TableHeader>
                        <TableHeader>Requirements</TableHeader>
                        {/* <TableHeader>Skills</TableHeader> */}
                        <TableHeader>Applicants</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <tbody>
                    {jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
                        <TableRow key={job._id}>
                            <TableData>{job.jobTitle}</TableData>
                            <TableData>{job.summary.location}</TableData>
                            <TableData>{job.summary.jobType}</TableData>
                            <TableData>{job.summary.numberOfPositions}</TableData>
                            <TableData>{job.summary.qualifications}</TableData>
                            <TableData>{job.summary.experience}</TableData>
                            <TableData>{new Date(job.summary.datePosted).toLocaleDateString()}</TableData>
                            <TableData>{job.requirements}</TableData>
                            {/* <TableData>
                                {expandedSkills[job._id]
                                    ? job.skills.join(", ")
                                    : job.skills.slice(0, 3).join(", ")}
                                {job.skills.length > 3 && (
                                    <button
                                        onClick={() =>
                                            setExpandedSkills((prev) => ({
                                                ...prev,
                                                [job._id]: !prev[job._id],
                                            }))
                                        }
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "blue",
                                            cursor: "pointer",
                                            marginLeft: "5px",
                                        }}
                                    >
                                        {expandedSkills[job._id] ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </TableData> */}
                            <TableData>{job.applicantCount}</TableData>
                            <TableData>
                                <Select
                                    value={job.status}
                                    onChange={(e) => handleStatusChange(job._id, e.target.value as string)}
                                    className="status-dropdown"
                                    displayEmpty
                                >
                                    <MenuItem value="1">Active</MenuItem>
                                    <MenuItem value="0">Inactive</MenuItem>
                                </Select>
                            </TableData>

                            <TableData>
                                <button
                                    onClick={() => handleEdit(job)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                    title="Edit"
                                >
                                    <MdEdit style={{ color: "blue", fontSize: "20px" }} />
                                </button>

                                <button
                                    onClick={() => handleDelete(job._id)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                    title="Delete"
                                >
                                    <MdDelete style={{ color: "red", fontSize: "20px" }} />
                                </button>
                                <button
                                    onClick={() => handleCloseJob(job._id)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                    title="Close"
                                >
                                    <MdClose style={{ color: "brown", fontSize: "20px" }} />
                                </button>




                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
                <tfoot>
                    <TableRow>
                        <TableData colSpan={10} style={{ textAlign: "right" }}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={jobs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableData>
                    </TableRow>
                </tfoot>
            </Table>

            {editingJob && formData && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>Edit Job</ModalHeader>
                        <form onSubmit={handleUpdate}>
                            <Heading>Job Title</Heading>
                            <Input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />

                            <Heading>Job Description</Heading>
                            <Input type="text" name="jobDescription" value={formData.jobDescription} onChange={handleChange} />

                            <Heading>Short Description</Heading>
                            <Input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />

                            <Heading>Location</Heading>
                            <Input type="text" name="summary.location" value={formData.summary.location} onChange={handleChange} />

                            <Heading>Job Type</Heading>
                            <Input type="text" name="summary.jobType" value={formData.summary.jobType} onChange={handleChange} />

                            <Heading>Number of Positions</Heading>
                            <Input type="number" name="summary.numberOfPositions" value={formData.summary.numberOfPositions} onChange={handleChange} />

                            <Heading>Qualifications</Heading>
                            <Input type="text" name="summary.qualifications" value={formData.summary.qualifications} onChange={handleChange} />

                            <Heading>Experience</Heading>
                            <Input type="text" name="summary.experience" value={formData.summary.experience} onChange={handleChange} />

                            <Heading>Requirements</Heading>
                            <Input type="text" name="requirements" value={formData.requirements} onChange={handleChange} />

                            <Heading>Skills</Heading>
                            <Input
                                type="text"
                                name="skills"
                                value={formData.skills.slice(0, 3).join(", ") + (formData.skills.length > 3 ? ", ..." : "")}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
                            />


                            <BtnContainer>
                                <Btn className="update" type="submit">Update</Btn>
                                <Btn className="close" onClick={() => setEditingJob(null)}>Cancel</Btn>
                            </BtnContainer>
                        </form>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default ViewJobs;
