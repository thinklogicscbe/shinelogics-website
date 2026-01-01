import React, { useEffect, useState } from "react";
import { getAllWithCount, updateJobById, deleteJobById } from "../API/AdminUser";
import { Select, MenuItem } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { MdDelete, MdEdit, MdClose } from "react-icons/md";

import {
  PageWrapper,
  JobListingsHeading,
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableData,
  IconBtn,
  PaginationWrapper,
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  Heading,
  BtnContainer,
  Btn,
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
  status: number;
  applicantCount: number;
}

const ViewJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Job | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const data = await getAllWithCount();
    setJobs(Array.isArray(data.result) ? data.result : []);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({ ...job });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;

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

    await updateJobById(editingJob._id, formData);
    setEditingJob(null);
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this job?")) return;
    await deleteJobById(id);
    fetchJobs();
  };

  const handleCloseJob = async (id: string) => {
    await updateJobById(id, { status: 0 });
    fetchJobs();
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateJobById(id, { status: Number(status) });
    fetchJobs();
  };

  return (
    <PageWrapper>
      <JobListingsHeading>Job Listings</JobListingsHeading>

      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Positions</TableHeader>
              <TableHeader>Experience</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Applicants</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>

          <tbody>
            {jobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(job => (
                <TableRow key={job._id}>
                  <TableData>{job.jobTitle}</TableData>
                  <TableData>{job.summary.location}</TableData>
                  <TableData>{job.summary.jobType}</TableData>
                  <TableData>{job.summary.numberOfPositions}</TableData>
                  <TableData>{job.summary.experience}</TableData>
                  <TableData>
                    {new Date(job.summary.datePosted).toLocaleDateString()}
                  </TableData>
                  <TableData>{job.applicantCount}</TableData>
                  <TableData>
                    <Select
                      size="small"
                      value={job.status}
                      onChange={e =>
                        handleStatusChange(job._id, e.target.value as string)
                      }
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                  </TableData>
                  <TableData>
                    <IconBtn onClick={() => handleEdit(job)}>
                      <MdEdit />
                    </IconBtn>
                    <IconBtn danger onClick={() => handleDelete(job._id)}>
                      <MdDelete />
                    </IconBtn>
                    <IconBtn onClick={() => handleCloseJob(job._id)}>
                      <MdClose />
                    </IconBtn>
                  </TableData>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationWrapper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </PaginationWrapper>

      {editingJob && formData && (
        <Modal>
          <ModalContent>
            <ModalHeader>Edit Job</ModalHeader>

            <form onSubmit={handleUpdate}>
              <Heading>Job Title</Heading>
              <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} />

              <Heading>Description</Heading>
              <Input name="jobDescription" value={formData.jobDescription} onChange={handleChange} />

              <Heading>Location</Heading>
              <Input name="summary.location" value={formData.summary.location} onChange={handleChange} />

              <BtnContainer>
                <Btn className="update" type="submit">Update</Btn>
                <Btn className="close" type="button" onClick={() => setEditingJob(null)}>Cancel</Btn>
              </BtnContainer>
            </form>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
};

export default ViewJobs;
