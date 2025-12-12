const API_BASE_URL = process.env.REACT_APP_HOMZI_API_URL || 'http://localhost:4000';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson && data?.message ? data.message : response.statusText;
    throw new Error(message || 'Request failed');
  }

  return data;
};

export const submitProfessionalLead = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/professionals`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const fetchProfessionalLeads = async (status) => {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const response = await fetch(`${API_BASE_URL}/api/professionals${query}`);
  return handleResponse(response);
};

export const updateProfessionalLead = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/professionals/${id}`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};
