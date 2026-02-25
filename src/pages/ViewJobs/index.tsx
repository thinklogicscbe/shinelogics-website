import React, { useEffect, useState } from "react";
import {
  getAllWithCount,
  updateJobById,
  deleteJobById,
} from "../API/AdminUser";
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
  ModalBody,
  Input,
  TextArea,
  FormSection,
  FormGrid,
  Label,
  ModalFooter,
  PrimaryBtn,
  SecondaryBtn,
  CloseBtn,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!formData) return;
    const { name, value } = e.target;

    if (name.startsWith("summary.")) {
      const field = name.split(".")[1];

      setFormData({
        ...formData,
        summary: {
          ...formData.summary,
          [field]: field === "numberOfPositions" ? Number(value) : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((s) => s.trim()),
    });
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
              .map((job) => (
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
                      onChange={(e) =>
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
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </PaginationWrapper>

      {editingJob && formData && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <div>
                <h2>Edit Job</h2>
                <p>Update job details</p>
              </div>
              <CloseBtn onClick={() => setEditingJob(null)}>
                <MdClose />
              </CloseBtn>
            </ModalHeader>

            {/* 🔥 IMPORTANT FIX */}
            <form
              onSubmit={handleUpdate}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* SCROLL AREA */}
              <ModalBody>
                <FormSection>
                  <Label>Job Title</Label>
                  <Input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection>
                  <Label>Short Description</Label>
                  <TextArea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection>
                  <Label>Full Description</Label>
                  <TextArea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormGrid>
                  <FormSection>
                    <Label>Location</Label>
                    <Input
                      name="summary.location"
                      value={formData.summary.location}
                      onChange={handleChange}
                    />
                  </FormSection>

                  <FormSection>
                    <Label>Job Type</Label>
                    <Input
                      name="summary.jobType"
                      value={formData.summary.jobType}
                      onChange={handleChange}
                    />
                  </FormSection>

                  <FormSection>
                    <Label>Positions</Label>
                    <Input
                      type="number"
                      name="summary.numberOfPositions"
                      value={formData.summary.numberOfPositions}
                      onChange={handleChange}
                    />
                  </FormSection>

                  <FormSection>
                    <Label>Experience</Label>
                    <Input
                      name="summary.experience"
                      value={formData.summary.experience}
                      onChange={handleChange}
                    />
                  </FormSection>

                  <FormSection>
                    <Label>Date Posted</Label>
                    <Input
                      type="date"
                      name="summary.datePosted"
                      value={formData.summary.datePosted?.slice(0, 10)}
                      onChange={handleChange}
                    />
                  </FormSection>
                </FormGrid>

                <FormSection>
                  <Label>Requirements</Label>
                  <TextArea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection>
                  <Label>Qualifications</Label>
                  <TextArea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                  />
                </FormSection>

                <FormSection>
                  <Label>Skills (comma separated)</Label>
                  <Input
                    value={formData.skills.join(", ")}
                    onChange={handleSkillsChange}
                  />
                </FormSection>
              </ModalBody>

              {/* FIXED FOOTER */}
              <ModalFooter>
                <SecondaryBtn type="button" onClick={() => setEditingJob(null)}>
                  Cancel
                </SecondaryBtn>
                <PrimaryBtn type="submit">Save Changes</PrimaryBtn>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </PageWrapper>
  );
};

export default ViewJobs;
