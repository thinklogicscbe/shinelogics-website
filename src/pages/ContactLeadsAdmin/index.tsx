import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdVisibility, MdClose } from "react-icons/md";

import {
  Page,
  PageTitle,
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableData,
  IconBtn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseBtn,
  DetailRow,
  DetailLabel,
  DetailValue,
} from "./style";

/* ================= API ================= */

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/contact-leads`;

/* ================= TYPES ================= */

interface ContactLead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest: string;
  message?: string;
  createdAt: string;
}

/* ================= COMPONENT ================= */

const ContactLeadsAdmin: React.FC = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewLead, setViewLead] = useState<ContactLead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API_URL);
      setLeads(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch leads", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchLeads();
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  if (loading) return <Page>Loading contact leads...</Page>;

  return (
    <Page>
      <PageTitle>Contact Leads</PageTitle>

      {leads.length === 0 ? (
        <p>No contact leads found.</p>
      ) : (
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Service</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>

            <tbody>
              {leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableData>{lead.name}</TableData>
                  <TableData>{lead.email}</TableData>
                  <TableData>{lead.phone || "-"}</TableData>
                  <TableData>{lead.serviceInterest}</TableData>
                  <TableData>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableData>
                  <TableData>
                    <IconBtn onClick={() => setViewLead(lead)}>
                      <MdVisibility />
                    </IconBtn>
                    <IconBtn danger onClick={() => handleDelete(lead._id)}>
                      <MdDelete />
                    </IconBtn>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {/* VIEW MODAL */}
      {viewLead && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <div>
                <h3>Contact Lead</h3>
                <span>Lead details</span>
              </div>

              <CloseBtn onClick={() => setViewLead(null)}>
                <MdClose />
              </CloseBtn>
            </ModalHeader>

            <ModalBody>
              <DetailRow>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{viewLead.name}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{viewLead.email}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{viewLead.phone || "-"}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Company</DetailLabel>
                <DetailValue>{viewLead.company || "-"}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Service</DetailLabel>
                <DetailValue>{viewLead.serviceInterest}</DetailValue>
              </DetailRow>

              <DetailRow full>
                <DetailLabel>Message</DetailLabel>
                <DetailValue>{viewLead.message || "-"}</DetailValue>
              </DetailRow>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Page>
  );
};

export default ContactLeadsAdmin;