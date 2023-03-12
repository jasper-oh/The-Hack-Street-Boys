// Define the keywords for each job type
const jobKeywords = {
    Select : [],
    programmer: ['Java', 'Python', 'C', 'HTML', 'CSS', 'JavaScript', 'NodeJS', 'Git', 'Github', 'MySQL', 'Agile', 'OOP', 'TDD', ],
    teacher: ['Teaching', 'Education', 'Classroom', 'Lesson', 'Curriculum', 'Student', 'Assessment', 'Grading', 'Pedagogy'],
    softskill_keywords : ['Achieved', 'Adapted', 'Analyzed', 'Collaborated', 'Created', 'Demonstrated', 'Developed', 'Executed', 'Improved', 'Initiated', 'Managed', 'Negotiated', 'Organized', 'Presented', 'Resolved', 'Strategized', 'Supervised', 'Trained', 'Utilized', 'Volunteered']
};

// Get the keys of the JSON object
const keys = Object.keys(jobKeywords);

// const selectElement = document.getElementById('my-select');

// Get the select element from the DOM
const select = document.getElementById("mySelect");

// Loop through the keys and create an option element for each key
for (let i = 0; i < keys.length - 1; i++) {
  const option = document.createElement("option");
  option.value = keys[i];
  option.text = keys[i];
  select.appendChild(option);
}