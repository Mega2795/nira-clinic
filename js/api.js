// Shared config and fetch helpers used by every page.
// Adjust these two URLs if your services run on different hosts/ports.
const PATIENT_API = 'http://localhost:8081/api/v1/patients';
const APPOINTMENT_API = 'http://localhost:8082/api/v1/appointments';

/**
 * Wraps fetch() and throws a readable Error using the backend's JSON error
 * message when a request fails, instead of a generic HTTP status error.
 */
async function apiRequest(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const err = await res.json();
      message = err.message || message;
    } catch (_) {
      // response wasn't JSON, fall back to the generic message
    }
    throw new Error(message);
  }
  if (res.status === 204) {
    return null; // no content, e.g. DELETE responses
  }
  return res.json();
}

function getPatients(nameFilter) {
  const url = nameFilter ? `${PATIENT_API}?name=${encodeURIComponent(nameFilter)}` : PATIENT_API;
  return apiRequest(url);
}

function createPatient(payload) {
  return apiRequest(PATIENT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

function deletePatient(id) {
  return apiRequest(`${PATIENT_API}/${id}`, { method: 'DELETE' });
}

function getAppointments(patientId) {
  const url = patientId ? `${APPOINTMENT_API}?patientId=${encodeURIComponent(patientId)}` : APPOINTMENT_API;
  return apiRequest(url);
}

function createAppointment(payload) {
  return apiRequest(APPOINTMENT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

function cancelAppointment(id) {
  return apiRequest(`${APPOINTMENT_API}/${id}`, { method: 'DELETE' });
}

function updateAppointmentStatus(id, status) {
  return apiRequest(`${APPOINTMENT_API}/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PATCH'
  });
}

/** Shows a message in the given element, styled as success or error. */
function showMessage(el, text, isError) {
  el.textContent = text;
  el.className = isError ? 'error' : 'success';
}
