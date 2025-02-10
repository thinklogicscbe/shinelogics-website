import React, { useEffect, useState} from "react";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
} from "./style"; // Import styled components
import { viewProfiles } from "../API/form";
import {
  TableContainer as MuiTableContainer,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  TableFooter,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const ViewProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default 5 rows per page


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await viewProfiles();
        if (response.success) {
          setProfiles(response.result);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        style={{ fontWeight: "bold", color: "#333", marginBottom: "20px" }}
      >
        Resumes
      </Typography>

      <MuiTableContainer 
        component={Paper} 
        style={{ 
          borderRadius: "10px", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
          overflowX: "auto", // Allow horizontal scroll for small screens
        }}
      >
        <Table style={{ minWidth: "1200px" }}> {/* Increased Table Width */}
          <Thead>
            <Tr style={{ backgroundColor: "#1976d2" }}>
              <Th style={{ color: "#fff", textAlign: "center", padding: "12px", fontSize: "16px", width: "5%" }}>S.no</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "15%" }}>First Name</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "15%" }}>Last Name</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "10%" }}>DOB</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "10%" }}>Gender</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "20%" }}>Email</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "15%" }}>Phone</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "15%" }}>Job Title</Th>
              <Th style={{ color: "#fff", padding: "12px", fontSize: "16px", width: "10%" }}>Resume</Th>
            </Tr>
          </Thead>
          <Tbody>
            {profiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate Data
              .map((profile, index) => (
                <Tr key={profile._id}>
                  <Td style={{ textAlign: "center", fontWeight: "500" }}>{page * rowsPerPage + index + 1}</Td>
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
                        style={{ textDecoration: "none" }}
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
          {/* Pagination inside Table Footer */}
          <TableFooter>
            <Tr>
              <Td colSpan={8} style={{ textAlign: "right", padding: "10px" }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={profiles.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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
