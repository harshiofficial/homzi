import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { fetchProfessionalLeads, updateProfessionalLead } from '../api/homziApi';
import { serviceCenters } from '../data/serviceCenters';

const StyledAdminLeads = styled.section`
  padding: 4rem 0;
  background: var(--background-light);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--text-dark);
    }

    .actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      select,
      button {
        padding: 0.75rem 1.5rem;
        border-radius: 999px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      select {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        color: #111827;
        min-width: 200px;
      }

      button.download {
        background: var(--primary-color);
        color: #fff;
      }

      button.clear {
        background: #f3f4f6;
        color: #111827;
      }

      select:hover,
      button:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
      }

      select:disabled,
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 4rem 0;
    color: #6b7280;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: #111827;
    }
  }

  .lead-table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background: #fff;
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.08);
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: top;
    }

    th {
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6b7280;
    }

    tbody tr:nth-child(even) {
      background: #fcfcfd;
    }

    .service-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      span {
        background: #eef2ff;
        color: #4338ca;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: capitalize;

      &.pending {
        background: #fef3c7;
        color: #92400e;
      }

      &.approved {
        background: #dcfce7;
        color: #166534;
      }

      &.rejected {
        background: #fee2e2;
        color: #991b1b;
      }
    }

    .lead-actions {
      display: flex;
      gap: 0.5rem;

      button {
        padding: 0.4rem 0.8rem;
        border-radius: 999px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &.approve {
          background: #22c55e;
          color: #fff;
        }

        &.reject {
          background: #f87171;
          color: #fff;
        }

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 15px rgba(15, 23, 42, 0.12);
        }
      }
    }

    .availability-select {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 0.65rem 0.75rem;
      font-size: 0.85rem;
      background: #f8fafc;
      color: #1f2937;
    }
  }
`;

const formatDate = (isoString) => new Date(isoString).toLocaleString();

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLeads = async (status = statusFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProfessionalLeads(status !== 'all' ? status : undefined);
      setLeads(response);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load professional leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [statusFilter]);

  const handleDownload = () => {
    if (leads.length === 0) return;
    const header = ['Full Name', 'Business Name', 'Email', 'Phone', 'Address', 'Experience', 'Services', 'Center', 'Availability', 'Bio', 'Submitted At'];
    const rows = leads.map((lead) => [
      lead.fullName,
      lead.businessName,
      lead.email,
      lead.phone,
      lead.address,
      lead.experience,
      (lead.services || []).join('; '),
      serviceCenters.find((c) => c.id === lead.centerId)?.name || '',
      lead.availability || '',
      lead.bio ? lead.bio.replace(/\n/g, ' ') : '',
      lead.submittedAt ? formatDate(lead.submittedAt) : ''
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((value) => `"${(value || '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'homzi-professional-leads.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateProfessionalLead(id, { status });
      loadLeads();
    } catch (err) {
      alert(err.message || 'Failed to update lead status');
    }
  };

  const handleAvailabilityChange = async (id, availability) => {
    try {
      await updateProfessionalLead(id, { availability });
      loadLeads();
    } catch (err) {
      alert(err.message || 'Failed to update availability');
    }
  };

  return (
    <StyledAdminLeads>
      <Container>
        <div className="header">
          <h1>Homzi Professional Leads</h1>
          <div className="actions">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="clear"
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All Leads</option>
            </select>
            <button className="clear" onClick={() => loadLeads(statusFilter)} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="download" onClick={handleDownload} disabled={leads.length === 0}>
              Download CSV
            </button>
          </div>
        </div>

        {error && (
          <div className="empty-state">
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        {!error && leads.length === 0 && !loading ? (
          <div className="empty-state">
            <h2>No submissions yet</h2>
            <p>Invite professionals to register on Homzi. New submissions will appear here automatically.</p>
          </div>
        ) : !error && (
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Services</th>
                <th>Experience</th>
                <th>Center</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={`${lead.email}-${index}`}>
                  <td>
                    <strong>{lead.fullName}</strong>
                    <div>{lead.address}</div>
                  </td>
                  <td>{lead.businessName || '—'}</td>
                  <td>
                    <div>{lead.email}</div>
                    <div>{lead.phone}</div>
                  </td>
                  <td>
                    <div className="service-tags">
                      {(lead.services || []).map((service) => (
                        <span key={service}>{service}</span>
                      ))}
                    </div>
                    {lead.otherServiceDescription && (
                      <div style={{ marginTop: '0.5rem', color: '#6b7280' }}>{lead.otherServiceDescription}</div>
                    )}
                  </td>
                  <td>{lead.experience || '—'} yrs</td>
                  <td>
                    {serviceCenters.find((center) => center.id === lead.centerId)?.name || '—'}
                    <div style={{ marginTop: '0.5rem' }}>
                      <select
                        value={lead.availability || 'Available Today'}
                        onChange={(e) => handleAvailabilityChange(lead.id, e.target.value)}
                      >
                        <option value="Available Today">Available Today</option>
                        <option value="Slots Filling Fast">Slots Filling Fast</option>
                        <option value="Next Day Slots">Next Day Slots</option>
                        <option value="Booked for the Week">Booked for the Week</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>{lead.status || 'pending'}</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="download"
                        style={{ padding: '0.4rem 0.8rem' }}
                        onClick={() => handleStatusChange(lead.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="clear"
                        style={{ padding: '0.4rem 0.8rem' }}
                        onClick={() => handleStatusChange(lead.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                  <td>{lead.submittedAt ? formatDate(lead.submittedAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </StyledAdminLeads>
  );
};

export default AdminLeads;
