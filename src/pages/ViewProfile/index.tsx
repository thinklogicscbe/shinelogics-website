import React, { useEffect, useState } from "react";
import { viewProfiles } from "../API/form";
import { getAllJobs } from "../API/AdminUser";

import {
  PageWrapper,
  HeaderRow,
  PageTitle,
  FilterWrapper,
  TableWrapper,
  StyledTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "./style";

import {
  Paper,
  IconButton,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

const ViewProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProfiles();
    fetchJobs();
  }, []);

  const fetchProfiles = async () => {
    const response = await viewProfiles();
    if (response.success) {
      const sorted = response.result.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
      setProfiles(sorted);
      setFilteredProfiles(sorted);
    }
  };

  const fetchJobs = async () => {
    const response = await getAllJobs();
    if (response.success) {
      setJobTitles(response.result.map((job: any) => job.jobTitle));
    }
  };

  const handleFilterChange = (value: string) => {
    setSelectedJobTitle(value);
    if (value) {
      setFilteredProfiles(
        profiles.filter(p => p.jobId?.jobTitle === value)
      );
    } else {
      setFilteredProfiles(profiles);
    }
    setPage(0);
  };

  return (
    <PageWrapper>
      {/* HEADER */}
      <HeaderRow>
        <PageTitle>Job Applications</PageTitle>

        <FilterWrapper>
          <FormControl fullWidth size="small">
            <Select
              value={selectedJobTitle}
              displayEmpty
              onChange={e => handleFilterChange(e.target.value)}
            >
              <MenuItem value="">All Jobs</MenuItem>
              {jobTitles.map((title, i) => (
                <MenuItem key={i} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterWrapper>
      </HeaderRow>

      {/* TABLE */}
      <Paper elevation={3}>
        <TableWrapper>
          <StyledTable>
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>DOB</Th>
                <Th>Gender</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Job Title</Th>
                <Th>Resume</Th>
              </Tr>
            </Thead>

            <Tbody>
              {filteredProfiles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((profile, index) => (
                  <Tr key={profile._id}>
                    <Td>{page * rowsPerPage + index + 1}</Td>
                    <Td>{profile.firstName}</Td>
                    <Td>{profile.lastName}</Td>
                    <Td>
                      {new Date(profile.dob).toLocaleDateString("en-GB")}
                    </Td>
                    <Td>{profile.gender}</Td>
                    <Td>{profile.email}</Td>
                    <Td>{profile.phone}</Td>
                    <Td>{profile.jobId?.jobTitle || "-"}</Td>
                    <Td>
                      {profile.resume || profile.resumeUrl ? (
                        <IconButton
                          component="a"
                          href={profile.resume || profile.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DownloadIcon />
                        </IconButton>
                      ) : (
                        "N/A"
                      )}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </StyledTable>
        </TableWrapper>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={filteredProfiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </PageWrapper>
  );
};

export default ViewProfile;
