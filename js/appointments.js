const appointmentForm = document.getElementById('appointmentForm');
const appointmentMsg = document.getElementById('appointmentMsg');
const appointmentsTableBody = document.querySelector('#appointmentsTable tbody');

async function loadAppointments(patientId) {
  appointmentsTableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
  try {
    const appointments = await getAppointments(patientId);
    renderAppointments(appointments);
  } catch (err) {
    appointmentsTableBody.innerHTML = `<tr><td colspan="6" class="error">Could not load appointments: ${err.message}</td></tr>`;
  }
}

function renderAppointments(appointments) {
  appointmentsTableBody.innerHTML = '';
  if (appointments.length === 0) {
    appointmentsTableBody.innerHTML = '<tr><td colspan="6">No appointments found.</td></tr>';
    return;
  }
  appointments.forEach(a => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${a.id}</td>
      <td>${a.patientId}</td>
      <td>${a.doctorName}</td>
      <td>${new Date(a.appointmentTime).toLocaleString()}</td>
      <td>${a.status}</td>
      <td><button class="secondary" data-id="${a.id}">Cancel</button></td>
    `;
    const cancelBtn = row.querySelector('button');
    if (a.status === 'CANCELLED') {
      cancelBtn.disabled = true;
    } else {
      cancelBtn.addEventListener('click', () => handleCancel(a.id));
    }
    appointmentsTableBody.appendChild(row);
  });
}

async function handleCancel(id) {
  if (!confirm(`Cancel appointment ${id}?`)) return;
  try {
    await cancelAppointment(id);
    loadAppointments();
  } catch (err) {
    showMessage(appointmentMsg, err.message, true);
  }
}

appointmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    patientId: Number(document.getElementById('patientId').value),
    doctorName: document.getElementById('doctorName').value,
    department: document.getElementById('department').value,
    appointmentTime: document.getElementById('appointmentTime').value,
    reason: document.getElementById('reason').value
  };
  try {
    await createAppointment(payload);
    showMessage(appointmentMsg, 'Appointment booked successfully.', false);
    appointmentForm.reset();
    loadAppointments();
  } catch (err) {
    showMessage(appointmentMsg, err.message, true);
  }
});

document.getElementById('filterBtn').addEventListener('click', () => {
  const id = document.getElementById('filterPatientId').value;
  loadAppointments(id || undefined);
});

document.getElementById('refreshAppointments').addEventListener('click', () => {
  document.getElementById('filterPatientId').value = '';
  loadAppointments();
});

loadAppointments();
