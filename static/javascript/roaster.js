// Define the keywords for each job type////
// const jobKeywords = {
//     programmer: ['Java', 'Python', 'C', 'HTML', 'CSS', 'JavaScript', 'NodeJS', 'Git', 'Github', 'MySQL', 'Agile', 'OOP', 'TDD', ],
//     teacher: ['Teaching', 'Education', 'Classroom', 'Lesson', 'Curriculum', 'Student', 'Assessment', 'Grading', 'Pedagogy'],
//     softskill_keywords : ['Achieved', 'Adapted', 'Analyzed', 'Collaborated', 'Created', 'Demonstrated', 'Developed', 'Executed', 'Improved', 'Initiated', 'Managed', 'Negotiated', 'Organized', 'Presented', 'Resolved', 'Strategized', 'Supervised', 'Trained', 'Utilized', 'Volunteered']
//   };
$("#pdf-file-input").slideUp(2);
// Get the input element
const input = document.getElementById("pdf-file-input");

// Listen for the file to be selected
input.addEventListener("change", function () {
  var emb = document.getElementById("output");
  emb.src = URL.createObjectURL(input.files[0]);
  // Get the selected file
  const file = input.files[0];

  // Create a new file reader
  const reader = new FileReader();

  // Set up the file reader to read the contents of the file as an ArrayBuffer
  reader.readAsArrayBuffer(file);

  // Once the file has been loaded, parse it with pdf.js
  reader.onload = function () {
    // Load the PDF file
    pdfjsLib.getDocument(reader.result).promise.then(function (pdf) {
      // Get the first page
      pdf.getPage(1).then(function (page) {
        // Get the text content of the page
        page.getTextContent().then(function (textContent) {
          // Combine the text items into a single string
          const text = textContent.items
            .map(function (item) {
              return item.str;
            })
            .join("");

          // Display the text on the console
          console.log(text);
          resumeText = text;
          console.log(rateResume(text, jobType));
          //
          // return(text);
        });
      });
    });
  };
});

// Define a function to rate a resume for a given job type
function rateResume(resumeText, jobType) {
  // Convert the resume text to lowercase and split into individual words
  const words = resumeText.toLowerCase().split(/\W+/);

//   if (words < 100) {
//     $("#techDesc").append("Your resume has too few words!");
//   }

  // Count the number of keywords found in the resume for the given job type
  const numKeywords = jobKeywords[jobType].reduce((count, keyword) => {
    if (words.includes(keyword.toLowerCase())) {
      return count + 1;
    }
    return count;
  }, 0);

  const numSoftwords = jobKeywords["softskill_keywords"].reduce(
    (count, keyword) => {
      if (words.includes(keyword.toLowerCase())) {
        return count + 1;
      }

      return count;
    },
    0
  );

  // Calculate the rating as a percentage of the total number of keywords for the job type
  const rating = Math.round((numKeywords / jobKeywords[jobType].length) * 100);

  softskill_rating = Math.round(
    (numSoftwords / jobKeywords["softskill_keywords"].length) * 100 * 3
  );
  if (softskill_rating > 100) {
    softskill_rating = 100;
  }
  // technical skills bar
  const score1 = rating; // replace with your soft score
  const bar1 = document.querySelector(".bar1");
  const barHeight1 = Math.min(100, Math.max(0, score1)) + "%";
  bar1.style.height = barHeight1;

  if (score1 > 70) {
    bar1.classList.add("green");
    $("#techDesc").text("Congratulations! Your resume is a great fit for the job posted in this field. You have an impressive range of technical skills that make you stand out from other candidates. Your attention to detail and ability to showcase your achievements make you a great contender for this job");
  } else if (score1 >= 40) {
    bar1.classList.add("yellow");
    $("#techDesc").text("Consider developing your technical skills further to make your resume more competitive. Research the specific technical skills required for the job and identify areas where you can improve. Taking additional courses or certifications can also help enhance your expertise");
  } else {
    bar1.classList.add("red");
    $("#techDesc").text("Consider highlighting your technical skills and expertise in the specific tools, technologies, or programming languages that are relevant to the job. Taking additional courses or certifications can also help enhance your technical knowledge. With effort and dedication, you can make your resume more competitive in the job market");
  }
  $(".bar-container1").show();

  // soft skill bar
  const score2 = softskill_rating; // replace with your soft score
  const bar2 = document.querySelector(".bar2");
  const barHeight2 = Math.min(100, Math.max(0, score2)) + "%";
  bar2.style.height = barHeight2;

  if (score2 > 70) {
    bar2.classList.add("green");
    $("#softDesc").text("Your excellent communication skills are a valuable asset in almost every job. Keep highlighting these skills to stand out in the job market and demonstrate your ability to work effectively with others");
  } else if (score2 >= 40) {
    bar2.classList.add("yellow");
    $("#softDesc").text("Your resume shows potential, but it may not yet stand out from other candidates. Consider highlighting your achievements and emphasizing your strengths to make your resume more appealing to potential employers. Keep in mind that there are many resources available to help you improve your resume. Good luck!");
  } else {
    bar2.classList.add("red");
    $("#softDesc").text("Consider emphasizing your soft skills, such as teamwork, communication, and problem-solving, which are valued by employers. Providing specific examples of how you have utilized these skills can make your resume stand out.");
  }
  $(".bar-container2").show();
  // Return the rating
  return [rating, softskill_rating];
}

const selectElement = document.getElementById("mySelect");

selectElement.addEventListener("change", function () {
  $("#pdf-file-input").slideDown(400);
  //   $("#mySelect").slideUp(0);

  const selectedOption = selectElement.value;
  console.log(selectedOption);
  jobType = selectedOption;
});

// Example usage
var resumeText = "";
var jobType = "";

////////////////////////////////////////NOORS CODE BELOW IDK WHAT IT DOES////////////////////////////////////////

// if (resumeText != "text" && job)
// const rating = rateResume(resumeText, jobType);
//   console.log(`Rating: ${rating}%`);
//   console.log(rateResume(resumeText, jobType))

// // Listen for the file to be selected
// input.addEventListener('change', function() {

//     console.log(input.files[0]);
//     var embed = document.getElementById('output');
//     embed.src = URL.createObjectURL(event.target.files[0]);

//   // Get the selected file
//   const file = input.files[0];

//   // Create a new file reader
//   const reader = new FileReader();

//   // Set up the file reader to read the contents of the file as an ArrayBuffer
//   reader.readAsArrayBuffer(file);

//   // Once the file has been loaded, parse it with pdf.js
//   reader.onload = function() {
//     // Load the PDF file
//     pdfjsLib.getDocument(reader.result).promise.then(function(pdf) {
//       // Get the first page
//       pdf.getPage(1).then(function(page) {
//         // Get the text content of the page
//         page.getTextContent().then(function(textContent) {
//           // Combine the text items into a single string
//           const text = textContent.items.map(function(item) {
//             return item.str;
//           }).join('');

//           // Display the text on the console
//           console.log(text);
//         });
//       });
//     });
//   };
// });
