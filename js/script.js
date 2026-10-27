const form = document.getElementById("complaintForm");
const tableBody = document.querySelector("#complaintsTable tbody");

function loadComplaints() {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  tableBody.innerHTML = "";

  complaints.forEach((c, index) => {
    const row = document.createElement("tr");

    [c.name, c.department, c.title, c.description, c.status].forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.addEventListener("click", () => toggleStatus(index));
    actionCell.appendChild(toggleBtn);
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
    name,
    department,
    title,
    description,
    status: "Pending",
  };

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push(complaint);
  localStorage.setItem("complaints",JSON.stringify(complaints));

  form.reset();
  loadComplaints();
})

function toggleStatus(index) {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints[index].status = complaints[index].status === "Pending" ? "Resolved" : "Pending";
  localStorage.setItem("complaints", JSON.stringify(complaints));
  loadComplaints();
}

window.onload = loadComplaints;
