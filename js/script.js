const form = document.getElementById("complaintForm");
const tableBody = document.querySelector("#complaintsTable tbody");

function loadComplaints() {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  tableBody.innerHTML = "";

  complaints.forEach((c) => {
    const row = document.createElement("tr");

    [c.name, c.department, c.title, c.description, c.status, c.createdAt || "-"].forEach((text) => {      
      // || "-" this is inorder to handle oder saved complaints without any date
      const cell = document.createElement("td");
      cell.textContent = text;
      if (i === 4) {
        cell.classList.add(text === "Pending" ? "pending" : "resolved");
      }
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.addEventListener("click", () => toggleStatus(c.id));
    actionCell.appendChild(toggleBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteComplaint(c.id));
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}


const formError = document.getElementById("formError");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const department = form.department.value.trim();
  const title = form.title.value.trim();
  const description = form.description.value.trim();

  if(!name || !department || !title || !description) {
    formError.textContent = "Please fill in all fields.";
    return;
  }

  if (description.length <10){
    formError.textContent = "Description must be at least 10 characters.";
    return;
  }

  formError.textContent = "";

  const complaint ={
    id: Date.now(),
    name,
    department,
    title,
    description,
    status: "Pending",
    createdAt: new Date().toLocaleString(),
  };

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push(complaint);
  localStorage.setItem("complaints",JSON.stringify(complaints));

  form.reset();
  loadComplaints();
})

function toggleStatus(id) {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) return;
  complaint.status = complaint.status === "Pending" ? "Resolved" : "Pending";
  localStorage.setItem("complaints", JSON.stringify(complaints));
  loadComplaints();
}

function deleteComplaint(id) {
  if (!confirm("Delete this complaint?")) return;
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  const updated = complaints.filter((c) => c.id !== id );
  localStorage.setItem("complaints", JSON.stringify(updated));
  loadComplaints();
}

window.onload = loadComplaints;
