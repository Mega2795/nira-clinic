const patientForm = document.getElementById('patientForm');
const patientMsg = document.getElementById('patientMsg');
const patientsTableBody = document.querySelector('#patientsTable tbody');

async function loadPatients(nameFilter) {
  patientsTableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
  try {
    const patients = await getPatients(nameFilter);
    renderPatients(patients);
  } catch (err) {
    patientsTableBody.innerHTML = `<tr><td colspan="6" class="error">Could not load patients: ${err.message}</td></tr>`;
  }
}

function renderPatients(patients) {
  patientsTableBody.innerHTML = '';
  if (patients.length === 0) {
    patientsTableBody.innerHTML = '<tr><td colspan="6">No patients found.</td></tr>';
    return;
  }
  patients.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.firstName} ${p.lastName}</td>
      <td>${p.dateOfBirth}</td>
      <td>${p.email}</td>
      <td>${p.phoneNumber ?? ''}</td>
      <td><button class="secondary" data-id="${p.id}">Delete</button></td>
    `;
    row.querySelector('button').addEventListener('click', () => handleDelete(p.id));
    patientsTableBody.appendChild(row);
  });
}

async function handleDelete(id) {
  if (!confirm(`Delete patient ${id}? This cannot be undone.`)) return;
  try {
    await deletePatient(id);
    loadPatients();
  } catch (err) {
    showMessage(patientMsg, err.message, true);
  }
}

patientForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    dateOfBirth: document.getElementById('dateOfBirth').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    address: document.getElementById('address').value,
    bloodType: document.getElementById('bloodType').value,
    allergiesNotes: document.getElementById('allergiesNotes').value
  };
  try {
    await createPatient(payload);
    showMessage(patientMsg, 'Patient added successfully.', false);
    patientForm.reset();
    loadPatients();
  } catch (err) {
    showMessage(patientMsg, err.message, true);
  }
});

document.getElementById('searchBtn').addEventListener('click', () => {
  const name = document.getElementById('searchName').value.trim();
  loadPatients(name || undefined);
});

document.getElementById('refreshPatients').addEventListener('click', () => {
  document.getElementById('searchName').value = '';
  loadPatients();
});

loadPatients();
