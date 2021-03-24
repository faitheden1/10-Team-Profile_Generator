const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// addMember();
// startHtml();
// addHtml("hi")
// .then(function() {
// finishHtml();
// });
// initApp();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'list',
    name: 'title',
    message: 'What is your title?',
    choices: ['Manager', 'Engineer', 'Intern'],
  },

  {
    type: 'input',
    name: 'id',
    message: 'What is your id number?',
  },

  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
  },

  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number?',
    when: function (answers) {
      return answers.title === 'Manager';
    },
  },

  {
    type: 'input',
    name: 'GitHub',
    message: 'What is your GitHub info?',
    when: function (answers) {
      return answers.title === 'Engineer';
    },
  },

  {
    type: 'input',
    name: 'school',
    message: 'Where do you go to school?',
    when: function (answers) {
      return answers.title === 'Intern';
    },
  },

  {
    type: 'confirm',
    name: 'addEmployee',
    message: 'Would you like to add an employee?',
    default: true,
  },

  {
    type: 'confirm',
    name: 'addAnother',
    message: 'Do you want to add another employee?',
  },


];

var employees = [

];


const mainMenu = () => {
  console.log(employees)
  inquirer.prompt(questions).then((answers) => {

    if (answers.title === 'Manager') {
      var manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
      employees.push(manager)
    }

    if (answers.title === 'Engineer') {
      var engineer = new Engineer(answers.name, answers.id, answers.email, answers.GitHub)
      employees.push(engineer)
    }

    if (answers.title === 'Intern') {
      var intern = new Intern(answers.name, answers.id, answers.email, answers.school)
      employees.push(intern)
    }

    if (answers.addAnother === true) {
      mainMenu()
    } else {
      const finalHtml = render(employees)
      console.log(finalHtml)

      fs.writeFile("./output/team.html", finalHtml, (err) => {
        if (err) throw err
      })
    }
  });
}

mainMenu()






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

