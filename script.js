// Get table rows and Calculate Button
const tableRows = document.querySelectorAll("tbody tr");
const calculateBtn = document.querySelector(".calculate-btn");

// Add event listener to Calculate Button
calculateBtn.addEventListener("click", () => {
  // Initialize total marks and total weight
  let totalMarks = 0;
  let totalWeight = 0;
  let numFilledRows = 0;
  let firstMarks = 0;

  // Loop through each table row and calculate marks and weight
  tableRows.forEach((row) => {
    const grade = parseFloat(row.querySelector(".grade").value);
    const weight = parseFloat(row.querySelector(".weight").value);

    // Only calculate marks and weight if both fields are filled out
    if (!isNaN(grade) && !isNaN(weight)) {
      // Calculate marks and add it to total marks
      const marks = (grade / 100) * weight;
      totalMarks += marks;

      // Add weight to total weight
      totalWeight += weight;

      // Increment number of filled out rows
      numFilledRows++;

      // Save marks of first filled out row
      if (numFilledRows === 1) {
        firstMarks = marks;
      }

      // Display marks in table row
      row.querySelector(".mark").textContent = `${marks.toFixed(2)}%`;
    } else {
      // If one field is empty, display an empty string in the mark cell
      row.querySelector(".mark").textContent = "";
    }
  });

  // Calculate overall grade
  let overallGrade = 0;

  if (totalWeight > 0) {
    overallGrade = (totalMarks / totalWeight) * 100;
  } else if (numFilledRows > 0) {
    overallGrade = firstMarks * 100;
  }

  // Display overall grade
  const gradeResult = document.querySelector(".grade-result");
  gradeResult.textContent = `${overallGrade.toFixed(2)}%`;

  // Change color of gradeResult based on pass or fail
  if (overallGrade >= 50) {
    gradeResult.style.color = "green";
  } else {
    gradeResult.style.color = "red";
  }

  // Display Pass or Fail message
  const resultDiv = document.querySelector(".result");
  const resultText = overallGrade >= 50 ? "You Passed!" : "You Failed!";
  resultDiv.innerHTML = `<h2>Your Grade: <span class="grade-result">${overallGrade.toFixed(
    2
  )}%</span></h2><p>${resultText}</p>`;
});

let addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", () => {
  let table = document.querySelector("tbody");
  let newRow = document.createElement("tr");
  newRow.innerHTML = `<tr>
  <td>
    <input
      type="text"
      class="description"
      placeholder="Description"
    />
  </td>
  <td>
    <input type="number" class="grade" placeholder="Grade" />
  </td>
  <td>
    <input type="number" class="weight" placeholder="Weight" />
  </td>
  <td><span class="mark">0</span>%</td>
</tr>
<tr>`;
  table.appendChild(newRow);
});

let deleteBtn = document.querySelector(".delete-btn");

deleteBtn.addEventListener("click", () => {
  let table = document.querySelector("tbody");
  table.removeChild(table.lastChild);
});
