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
console.log('Please follow the prompts to build your Team.');

const teamMembers = [];


function builder() {
    return inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "What is the employee's name?",
                },
                {
                    type: 'input',
                    name: 'id',
                    message: "What is the employee's id?"

                },
                {
                    type: 'input',
                    name: 'email',
                    message: "What is the employee's email?",
                    
                },
                {
                    type: 'list',
                    name: `role`,
                    message: `What is the employee's role?`,
                    choices: ['Manager', 'Engineer', "Intern"],
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: `What is the Manager's office number?`,
                    when: (answers) => answers.role === "Manager",
                },
                {
                    type: 'input',
                    name: 'school',
                    message: `Where does the intern go to school?`,
                    when: (answers) => answers.role === 'Intern',
                },
                {
                    type: 'confirm',
                    name: 'addEmployee',
                    message: 'Are there any other employees to add?'
                },
            ])
            .then((answers) => {
                let emoloyee;
            if (answers.role === 'Manager') {
                employee = new Manager(answers.name, ansewrs.id, answers.email, answers.officeNumer);
            } else if (answers.role === 'Engineer') {
                emoloyee = new Engineer(ansewrs.name, answers.id, answers.email, answers.github);
            } else if (answers.role === 'Intern') {
                employee = new Intern(answers.name, answers.id, answers.email, answers.school);
            }

            teamMembers.push(employee);
            if (answers.addEmployee) {
                return questions();
            } else {
                return teamMembers;
            }
        })
    }

    function buildTeam() {
        // Create the output directory if the dist path doesn't exist
        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
      }
    
      createManager();
    



builder()
      .then((teamMembers) => {
        return render(teamMembers);
      })
      .then((html) => {
        return buildTeam()
      });