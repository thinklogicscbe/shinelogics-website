import React, { useState, useEffect } from "react";
import { getAllJobs, updateJobById, deleteJobById } from "../API/AdminUser";
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
    Button,
    ReadMoreButton,
    JobListingsHeading
} from "./style";

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
}

const ViewJobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState<Job | null>(null);



    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getAllJobs();
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

    const handleDelete = async (jobId: string) => {
        try {
            await deleteJobById(jobId);
            fetchJobs();
        } catch (error) {
            console.error("Error deleting job:", error);
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
                        <TableHeader>Skills</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <tbody>
                    {jobs.map((job) => (
                        <TableRow key={job._id}>
                            <TableData>{job.jobTitle}</TableData>
                            

                            <TableData>{job.summary.location}</TableData>
                            <TableData>{job.summary.jobType}</TableData>
                            <TableData>{job.summary.numberOfPositions}</TableData>
                            <TableData>{job.summary.qualifications}</TableData>
                            <TableData>{job.summary.experience}</TableData>
                            <TableData>{new Date(job.summary.datePosted).toLocaleDateString()}</TableData>
                            <TableData>{job.requirements}</TableData>
                            <TableData>{job.skills.join(", ")}</TableData>
                            <TableData>
                                <Button className="edit" onClick={() => handleEdit(job)}>
                                    Edit
                                </Button>
                                <Button className="delete" onClick={() => handleDelete(job._id)}>
                                    Delete
                                </Button>
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            {editingJob && formData && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>Edit Job</ModalHeader>
                        <form onSubmit={handleUpdate}>
                            <Input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                          
                            <Input type="text" name="summary.location" value={formData.summary.location} onChange={handleChange} />
                            <Input type="text" name="summary.jobType" value={formData.summary.jobType} onChange={handleChange} />
                            <Input type="number" name="summary.numberOfPositions" value={formData.summary.numberOfPositions} onChange={handleChange} />
                            <Input type="text" name="summary.qualifications" value={formData.summary.qualifications} onChange={handleChange} />
                            <Input type="text" name="summary.experience" value={formData.summary.experience} onChange={handleChange} />
                            <Input type="date" name="summary.datePosted" value={formData.summary.datePosted} onChange={handleChange} />
                            <Input type="text" name="requirements" value={formData.requirements} onChange={handleChange} />
                            <Input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} />
                            <Input type="text" name="skills" value={formData.skills.join(", ")} onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })} />
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
