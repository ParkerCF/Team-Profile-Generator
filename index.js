const employee = require('./lib/Employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");

const render = require("./lib/htmlRenderer");
console.log('Team generator. Please follow prompts to build your team.');

const teamMembers = [];
const idArray = [];


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
