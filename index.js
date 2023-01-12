const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

console.log(
    '\nTeam generator. Please follow prompts to build your team.\n'
);

function appMenu() {
    function createManager () {
        console.log('Begin building your team');
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: "What is the manager's name?",
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "What is the manager's id?"

                },
                {
                    type: 'input',
                    name: 'managerEmail',
                    message: "What is the manager's email?",
                    },
                {
                    type: 'input',
                    name: 'managerOfficeNumber',
                    message: "What is the manager's office number?",
                },
            ])
            .then((answers) => {
                const manager = new Manager(
                    answers.managerName,
                    answers.managerId, 
                    answers.managerEmail,
                    answers.managerOfficeNumber
                );
                teamMembers.push(manager);
                idArray.push(answers.managerId);
                createTeam();
            });
    }

    function createTeam() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'memberChoice',
                    message: 'Which team member is next?',
                    choices: [
                        'Engineer',
                        'Intern',
                        "No more team members to add",
                    ],
                },
            ])
            .then((userChoice) => {
                switch (userChoice.memberChoice) {
                    case 'Engineer':
                        addEngineer();
                        break;
                    case 'Intern':
                        addIntern();
                        break;
                    default:
                        buildTeam();
                }
            });
    }

    function addEngineer() {
        inquirer
            .prompt([
                {
                    typoe: 'input',
                    name: 'engineerName',
                    message: "What is the name of the engineer?",
                },
                {
                    type: 'input',
                    name: 'engineerId',
                    message: "What is the id of the engineer?",
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: "What is the engineer's email address?",
                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: "what is the engineer's GitHub username?",
                },
            ])
            .then((answers) => {
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGitHub
                );
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
            });
    }

    function addIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: "What is the intern's name?",
                },
                {
                    type: 'input',
                    name: 'internId',
                    message: "What is the intern's id?",
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: "What is the intern's email?"

                },
                {
                    type: 'input',
                    name: 'internSchool',
                    message: "Where does the intern go to school?",
                },
            ])
            .then((answers) => {
                const intern = new Intern (
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                teamMembers.push(intern);
                idArray.push(answers.internId);
                createTeam();
            });
    }

    function buildTeam() {
        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
    }
    createManager();
}

appMenu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
