import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Th, Td, Tr } from "./style";
import { viewProfiles } from "../API/form";
import { getAllJobs } from "../API/AdminUser"; // Import the getAllJobs function
import {
  TableContainer as MuiTableContainer,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  TableFooter,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const ViewProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await viewProfiles();
        if (response.success) {
          // Sort profiles by createdAt in descending order (most recent first)
          const sortedProfiles = response.result.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setProfiles(sortedProfiles);
          setFilteredProfiles(sortedProfiles); // Initially, show all profiles
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        if (response.success) {
          setJobTitles(response.result.map((job: any) => job.jobTitle)); // Extract job titles correctly
        }
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };

    fetchProfiles();
    fetchJobs();
  }, []);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const selectedTitle = event.target.value;
    setSelectedJobTitle(selectedTitle);

    if (selectedTitle) {
      setFilteredProfiles(
        profiles.filter((profile) => profile.jobId?.jobTitle === selectedTitle)
      );
    } else {
      setFilteredProfiles(profiles); // Show all profiles when no filter is applied
    }
  };

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#333" }}>
        Job Applications
        </Typography>

        <FormControl style={{ width: "300px" }}>
          <Select
            value={selectedJobTitle}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">All Jobs</MenuItem>
            {jobTitles.map((title, index) => (
              <MenuItem key={index} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Table Container */}
      <MuiTableContainer
        component={Paper}
        style={{
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
        <Table style={{ minWidth: "1000px" }}>
          <Thead>
            <Tr style={{ backgroundColor: "#1976d2" }}>
              <Th
                style={{ color: "#fff", textAlign: "center", padding: "15px" }}
              >
                S.no
              </Th>
              <Th style={{ color: "#fff", padding: "15px" }}>First Name</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Last Name</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>DOB</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Gender</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Email</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Phone</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Job Title</Th>
              <Th style={{ color: "#fff", padding: "15px" }}>Resume</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProfiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((profile, index) => (
                <Tr key={profile._id}>
                  <Td style={{ textAlign: "center", fontWeight: "500" }}>
                    {page * rowsPerPage + index + 1}
                  </Td>
                  <Td>{profile.firstName}</Td>
                  <Td>{profile.lastName}</Td>
                  <Td>{new Date(profile.dob).toLocaleDateString("en-GB")}</Td>
                  <Td>{profile.gender}</Td>
                  <Td>{profile.email}</Td>
                  <Td>{profile.phone}</Td>
                  <Td>{profile.jobId?.jobTitle || "-"}</Td>
                  <Td style={{ textAlign: "center" }}>
                    {profile.resume || profile.resumeUrl ? (
                      <a
                        href={profile.resume || profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <IconButton color="primary">
                          <DownloadIcon />
                        </IconButton>
                      </a>
                    ) : (
                      <span style={{ color: "#888" }}>N/A</span>
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <TableFooter>
            <Tr>
              <Td colSpan={8} style={{ textAlign: "right", padding: "10px" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={filteredProfiles.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </Td>
            </Tr>
          </TableFooter>
        </Table>
      </MuiTableContainer>
    </div>
  );
};

export default ViewProfile;
