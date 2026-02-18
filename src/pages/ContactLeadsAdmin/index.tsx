import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Page,
  PageTitle,
  CardsGrid,
  LeadCard,
  LeadHeader,
  LeadName,
  LeadDate,
  LeadRow,
  LeadLabel,
  LeadValue,
} from "./style";

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

const ContactLeadsAdmin: React.FC = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact-leads");
        setLeads(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error("Failed to fetch contact leads", error);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return <Page>Loading contact leads...</Page>;
  }

  return (
    <Page>
      <PageTitle>Contact Leads</PageTitle>

      {leads.length === 0 ? (
        <p>No contact leads found.</p>
      ) : (
        <CardsGrid>
          {leads.map((lead) => (
            <LeadCard key={lead._id}>
              <LeadHeader>
                <LeadName>{lead.name}</LeadName>
                <LeadDate>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </LeadDate>
              </LeadHeader>

              <LeadRow>
                <LeadLabel>Email</LeadLabel>
                <LeadValue>{lead.email}</LeadValue>
              </LeadRow>

              <LeadRow>
                <LeadLabel>Phone</LeadLabel>
                <LeadValue>{lead.phone || "-"}</LeadValue>
              </LeadRow>

              <LeadRow>
                <LeadLabel>Company</LeadLabel>
                <LeadValue>{lead.company || "-"}</LeadValue>
              </LeadRow>

              <LeadRow>
                <LeadLabel>Service</LeadLabel>
                <LeadValue>{lead.serviceInterest}</LeadValue>
              </LeadRow>

              <LeadRow>
                <LeadLabel>Message</LeadLabel>
                <LeadValue>{lead.message || "-"}</LeadValue>
              </LeadRow>
            </LeadCard>
          ))}
        </CardsGrid>
      )}
    </Page>
  );
};

export default ContactLeadsAdmin;
