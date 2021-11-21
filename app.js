const students = [{
        "name": "Adi Dzocaj",
        "image": "assets/images/students/adi-dzocaj.jpg",
    },
    {
        "name": "Alexander Bergquist",
        "image": "assets/images/students/alexander-bergquist.jpg",
    },
    {
        "name": "Alexander Kocman",
        "image": "assets/images/students/alexander-kocman.jpg",
    },
    {
        "name": "Benjamin Benson",
        "image": "assets/images/students/benjamin-benson.jpg",
    },
    {
        "name": "Benjamin Tsubarah",
        "image": "assets/images/students/benjamin-tsubarah.jpg",
    },
    {
        "name": "Calle Nilsson",
        "image": "assets/images/students/calle-nilsson.jpg",
    },
    {
        "name": "Chikage Takahashi Molander",
        "image": "assets/images/students/chikage-takahashi-molander.jpg",
    },
    {
        "name": "Daniel Be",
        "image": "assets/images/students/daniel-be.jpg",
    },
    {
        "name": "Daniel Carlsson",
        "image": "assets/images/students/daniel-carlsson.jpg",
    },
    {
        "name": "Elin Ahlgren",
        "image": "assets/images/students/elin-ahlgren.jpg",
    },
    {
        "name": "Emma Käck",
        "image": "assets/images/students/emma-kack.jpg",
    },
    {
        "name": "Eric Ståhl",
        "image": "assets/images/students/eric-stahl.jpg",
    },
    {
        "name": "Frans Gustavson Påsse",
        "image": "assets/images/students/frans-gustavson-passe.jpg",
    },
    {
        "name": "Glafira Veretennikova",
        "image": "assets/images/students/glafira-veretennikova.jpg",
    },
    {
        "name": "Gustaf Grönlund",
        "image": "assets/images/students/gustaf-gronlund.jpg",
    },
    {
        "name": "Hanna Håkanson",
        "image": "assets/images/students/hanna-hakanson.jpg",
    },
    {
        "name": "Heidi Sjöberg",
        "image": "assets/images/students/heidi-sjoberg.jpg",
    },
    {
        "name": "Hugo Carzborn",
        "image": "assets/images/students/hugo-carzborn.jpg",
    },
    {
        "name": "Jesper Kling",
        "image": "assets/images/students/jesper-kling.jpg",
    },
    {
        "name": "Johan Ranestam",
        "image": "assets/images/students/johan-ranestam.jpg",
    },
    {
        "name": "Johanna Bäckström",
        "image": "assets/images/students/johanna-backstrom.jpg",
    },
    {
        "name": "Johanna Jönsson",
        "image": "assets/images/students/johanna-jonsson.jpg",
    },
    {
        "name": "Jona Torsson",
        "image": "assets/images/students/jona-torsson.jpg",
    },
    {
        "name": "Josefine Ahlstedt",
        "image": "assets/images/students/josefine-ahlstedt.jpg",
    },
    {
        "name": "Julia Jespersdotter Högman",
        "image": "assets/images/students/julia-jespersdotter-hogman.jpg",
    },
    {
        "name": "Julia Nemell",
        "image": "assets/images/students/julia-nemell.jpg",
    },
    {
        "name": "Linus Lindberg",
        "image": "assets/images/students/linus-lindberg.jpg",
    },
    {
        "name": "Malin Olsson",
        "image": "assets/images/students/malin-olsson.jpg",
    },
    {
        "name": "Maria Haara-Lundhammar",
        "image": "assets/images/students/maria-haara-lundhammar.jpg",
    },
    {
        "name": "Maria Lövgren",
        "image": "assets/images/students/maria-lovgren.jpg",
    },
    {
        "name": "Nikola Dimitrijoski",
        "image": "assets/images/students/nikola-dimitrijoski.jpg",
    },
    {
        "name": "Paulina Kiendys",
        "image": "assets/images/students/paulina-kiendys.jpg",
    },
    {
        "name": "Raymond Lam",
        "image": "assets/images/students/raymond-lam.jpg",
    },
    {
        "name": "Robin Karlsson",
        "image": "assets/images/students/robin-karlsson.jpg",
    },
    {
        "name": "Sara Almqvist",
        "image": "assets/images/students/sara-almqvist.jpg",
    },
    {
        "name": "Tim Nilsson",
        "image": "assets/images/students/tim-nilsson.jpg",
    },
    {
        "name": "Tirapat Sukjit",
        "image": "assets/images/students/tirapat-sukjit.jpg",
    },
    {
        "name": "Tobias Silfverberg",
        "image": "assets/images/students/tobias-silfverberg.jpg",
    },
    {
        "name": "Wiktoria Dobrzewinska",
        "image": "assets/images/students/wiktoria-dobrzewinska.jpg",
    },
];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};


let next = document.querySelector("#next");
let again = document.querySelector("#again");
let studentImg = document.querySelector("#studentImg");
let imgWrapper = document.querySelector('#imgWrapper');
let answersTable = document.querySelector('#answersTable');
let final = document.querySelector('#final');
let answers = document.querySelectorAll('#answers > button');

let studentsNew = [...students];
shuffleArray(studentsNew);
let links = studentsNew.map(student => student.image);
let names = studentsNew.map(student => student.name);
let index = 0;
let score = 0;
let highscore = false;
let userAnswers = [];
// we need to check if answer is given to avoid score bug
let answerGiven = false;


let newStudent = () => {
    // generate new picture
    studentImg.setAttribute('src', links[index]);
    // shuffle array of names to create random array of names
    let namesShuffled = [...names];
    shuffleArray(namesShuffled);
    // filter our new array to exclude name with the right answer
    namesShuffled = namesShuffled.filter(name => name !== names[index]);
    // add the right name to the begining of array
    namesShuffled.unshift(names[index]);
    // cut the 4 possible answers from the array and shuffle them
    let buttonsAnswers = namesShuffled
        .slice(0, answers.length)
        .sort(() => Math.random() - 0.5);
    // set possible answers to Answer Buttons
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = buttonsAnswers[i];
    }
    console.log('right answer is', names[index])
    console.log(students);
    console.log(studentsNew);

}

// create my first page
newStudent();

// listener for the buttons with answers

answers.forEach(button => {
    button.addEventListener('click', e => {
        if (answerGiven == false) {
            userAnswers.push(e.target.innerText);
            console.log('users answer is', e.target.innerText);
        }
        // checking correct answer and if the answer is given
        if (e.target.innerText == names[index] && answerGiven == false) {
            // if user anwered correctly - upgrade the score
            score++;
            answerGiven = true;
            console.log('score', score);
        } else {
            answerGiven = true;
        }
        // show which buttons contained wrong and right answers
        answers.forEach(button => {
            button.classList.remove('btn-outline-dark');
            button.classList.add('btn-danger');
            if (button.innerText == names[index]) {
                button.classList.remove('btn-danger');
                button.classList.add('btn-success');
            }
        });
        next.classList.remove('d-none');
    })
});


// listener for the 'next' button
next.addEventListener('click', e => {
    index++;
    answerGiven = false;

    if (index < students.length) {
        //  revert buttons classes
        answers.forEach(button => {
            button.classList.add('btn-outline-dark');
            button.classList.remove('btn-danger');
            button.classList.remove('btn-success');
        });

        // creating new student 
        newStudent();

    } else {
        // game ended; showing the final page
        answersTable.parentElement.classList.remove('d-none');
        for (let i = 0; i < names.length; i++) {
            let tdClass = userAnswers[i] == names[i] ? 'text-success' : 'text-danger';
            answersTable.innerHTML +=
                `<tr>
            <td class= "tableData"><img class= "img-fluid" src="${links[i]}"></td>
            <td class="${tdClass} align-middle">${userAnswers[i]}</td>
            <td class="align-middle">${names[i]}</td>
            </tr>`
        };

        // setting a highscore        
        final.classList.remove('d-none');
        final.innerHTML +=
            `<p>Game ended! You guessed right ${score}/${names.length} times.</p>`

        // highscore logic
        if (highscore) {
            if (score > highscore && score < names.length) {
                highscore = score;
                final.innerHTML += `<p>Good jobbbb! Your new highscore is ${highscore}/${names.length}. </p>`;
            } else if (score == names.length) {
                highscore = score;
                final.innerHTML +=
                    `<p>You reached the end of game! ${highscore}/${names.length} is maximal points! Go and have a break.</p>`;
            } else {
                final.innerHTML +=
                    `<p>Sorry, no new highscore. Your previous best result was ${highscore}/${names.length}.</p>`;
            }
        } else if (score == names.length) {
            highscore = score;
            final.innerHTML +=
                `<p>You reached the end of game! ${highscore}/${names.length} is maximal points! Go and have a break.</p>`;
        } else {
            highscore = score;
            final.innerHTML += `<p>Good job! Your new highscore is ${highscore}/${names.length}. </p>`;
        };

        // hiding and showing elements
        answers.forEach(button => button.style.display = 'none');
        studentImg.classList.add('d-none');
        again.classList.remove('d-none');
    }
    // }
    next.classList.add('d-none');
})

// starting a new game
again.addEventListener('click', () => {

    shuffleArray(studentsNew);
    links = studentsNew.map(student => student.image);
    names = studentsNew.map(student => student.name);
    index = 0;
    score = 0;
    userAnswers = [];

    studentImg.classList.remove('d-none');
    again.classList.add('d-none');
    answersTable.parentElement.classList.add('d-none');
    final.classList.add('d-none');
    answers.forEach(button => button.style.display = 'block');

    final.innerHTML = '';
    answersTable.innerHTML = '';
    answers.forEach(button => {
        button.classList.add('btn-outline-dark');
        button.classList.remove('btn-danger');
        button.classList.remove('btn-success');
    });
    newStudent();
})