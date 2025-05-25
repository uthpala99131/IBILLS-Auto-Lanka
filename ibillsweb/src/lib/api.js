const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getJobCards = async () => {
  const response = await fetch(`${API_URL}/jobcards`);
  if (!response.ok) {
    throw new Error('Failed to fetch job cards');
  }
  return response.json();
};

export const getJobCard = async (id) => {
  const response = await fetch(`${API_URL}/jobcards/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job card');
  }
  return response.json();
};

export const createJobCard = async (jobCardData) => {
  const response = await fetch(`${API_URL}/jobcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobCardData),
  });
  if (!response.ok) {
    throw new Error('Failed to create job card');
  }
  return response.json();
};

export const updateJobCard = async (id, jobCardData) => {
  const response = await fetch(`${API_URL}/jobcards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobCardData),
  });
  if (!response.ok) {
    throw new Error('Failed to update job card');
  }
  return response.json();
};

export const deleteJobCard = async (id) => {
  const response = await fetch(`${API_URL}/jobcards/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete job card');
  }
  return response.json();
};

export const getJobCardAnalytics = async () => {
  const response = await fetch(`${API_URL}/jobcards/analytics/data`);
  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }
  return response.json();
};