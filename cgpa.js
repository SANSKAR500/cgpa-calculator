document.addEventListener('DOMContentLoaded', (event) => {
    const tbody = document.getElementById('tbody');
    const addBtn = document.getElementById('add');
    const calcGpBtn = document.getElementById('calc-gp');
    const clearBtn = document.getElementById('clear');
    const courseCodeInput = document.getElementById('course-code');
    const unitLoadInput = document.getElementById('unit-load');
    const gradeSelect = document.getElementById('grade');

    // Mapping of letter grades to numerical values
    const gradeMapping = {
        'A': 5,
        'B': 4,
        'C': 3,
        'D': 2,
        'E': 1,
        'F': 0
    };

    addBtn.addEventListener('click', () => {
        const courseCode = courseCodeInput.value;
        const unitLoad = unitLoadInput.value;
        const grade = gradeSelect.value;

        if (courseCode && unitLoad && grade) {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = courseCode.toUpperCase();
            row.insertCell(1).textContent = unitLoad;
            row.insertCell(2).textContent = grade;
            courseCodeInput.value = '';
            unitLoadInput.value = '';
            gradeSelect.value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });

    calcGpBtn.addEventListener('click', () => {
        let totalUnits = 0;
        let totalPoints = 0;
        Array.from(tbody.rows).forEach(row => {
            const unitLoad = parseInt(row.cells[1].textContent);
            const gradeLetter = row.cells[2].textContent;
            const gradeValue = gradeMapping[gradeLetter];

            if (!isNaN(unitLoad) && gradeValue !== undefined) {
                totalUnits += unitLoad;
                totalPoints += unitLoad * gradeValue;
            }
        });

        // Check if totalUnits is greater than 0 to avoid division by zero
        if (totalUnits > 0) {
            const cgpa = totalPoints / totalUnits;
            alert('Your CGPA is: ' + cgpa.toFixed(2));
        } else {
            alert('Please enter valid unit loads and grades.');
        }
    });

    clearBtn.addEventListener('click', () => {
        tbody.innerHTML = '';
    });
});
