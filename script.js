const form = document.getElementById("complaintForm");
const tableBody = document.querySelector("#complaintsTable tbody");

function loadComplaints() {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  tableBody.innerHTML = "";
  complaints.forEach((c, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.department}</td>
      <td>${c.title}</td>
      <td>${c.description}</td>
      <td>${c.status}</td>
      <td><button onclick="toggleStatus(${index})">Toggle</button></td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const complaint = {
    name: form.name.value,
    department: form.department.value,
    title: form.title.value,
    description: form.description.value,
    status: "Pending",
  };

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));

  form.reset();
  loadComplaints();
});

function toggleStatus(index) {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints[index].status = complaints[index].status === "Pending" ? "Resolved" : "Pending";
  localStorage.setItem("complaints", JSON.stringify(complaints));
  loadComplaints();
}

window.onload = loadComplaints;
