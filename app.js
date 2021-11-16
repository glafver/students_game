const students = [{
        name: "Kitty",
        img: "img/1.jpg",
    }, {
        name: "Mussy",
        img: "img/2.jpg",
    }, {
        name: "Betty",
        img: "img/3.jpg",
    }, {
        name: "Jessy",
        img: "img/4.jpg",
    }, {
        name: "Pippi",
        img: "img/5.jpg",
    },
     {
        name: "Catti",
        img: "img/6.jpg",
    }, {
        name: "Lizzy",
        img: "img/7.jpg",
    }, {
        name: "Dolly",
        img: "img/8.jpg",
    }, {
        name: "Molly",
        img: "img/9.jpg",
    }, {
        name: "Polly",
        img: "img/10.jpg",
    }
];

let next = document.querySelector("#next");
let again = document.querySelector("#again");
let studentImg = document.querySelector("#studentImg");
let imgWrapper = document.querySelector('#imgWrapper');
let answersTable = document.querySelector('#answersTable');
let final = document.querySelector('#final');
let answers = document.querySelectorAll('#answers > button');

let studentsNew = [...students].sort(() => Math.random() - 0.5);;
let links = studentsNew.map(student => student.img);;
let names = studentsNew.map(student => student.name);;
let index = 0;;
let score = 0;;
let highscore = false;
let userAnswers = [];;
// we need to check if answer is given to avoid score bug
let answerGiven = false;;

let newStudent = () => {
    // generate new picture
    studentImg.setAttribute('src', links[index]);
    // shuffle array of names to create random array of names
    let namesShuffled = [...names].sort(() => Math.random() - 0.5);
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
}

// create my first page
newStudent();

// listener for the buttons with answers

answers.forEach(button => {
    button.addEventListener('click', e => {
        if (answerGiven == false){
            userAnswers.push(e.target.innerText);
            console.log('users answer is', e.target.innerText)}
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
    })
});


// listener for the 'next' button
next.addEventListener('click', e => {
    // prevent avoiding to give an answer
    if (answerGiven == false) {
        alert('You need to choose the answer!');
    } else {
           answerGiven = false;
    index++;

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
        answersTable.parentElement.classList.toggle('d-none');
        for (let i = 0; i < names.length; i ++) {
            let tdClass = userAnswers[i] == names[i] ? 'right' : 'wrong';
            answersTable.innerHTML += 
            `<tr>
            <td><img src="${links[i]}"></td>
            <td class="${tdClass}">${userAnswers[i]}</td>
            <td>${names[i]}</td>
            </tr>`
        };
        // setting a highscore        
        final.classList.toggle('d-none');
        final.innerHTML += 
            `<p>Game ended! You guessed right ${score}/${names.length} times.</p>`
        // highscore logic
        if (highscore) {
            if (score > highscore) {
                highscore = score;
                final.innerHTML += `<p>Good job! Your new highscore is ${highscore}/${names.length}. </p>`;
            } else {
                final.innerHTML += 
                `<p>Sorry, no new highscore. Your previous best result was ${highscore}/${names.length}.</p>`;
            } 
        } else {
            highscore = score;
            final.innerHTML += `<p>Good job! Your new highscore is ${highscore}/${names.length}. </p>`;
        };
        // hiding unnessesary elements
        answers.forEach(button => button.style.display = 'none');
        studentImg.classList.toggle('d-none');
        next.classList.toggle('d-none');
        again.classList.toggle('d-none');
    } 
    }

})

// starting a new game
again.addEventListener('click', e => {
    
    studentsNew = [...students].sort(() => Math.random() - 0.5);
    links = studentsNew.map(student => student.img);
    names = studentsNew.map(student => student.name);
    index = 0;
    score = 0;
    userAnswers = [];
    answerGiven = false;

    studentImg.classList.toggle('d-none');
    again.classList.toggle('d-none');
    next.classList.toggle('d-none');
    answersTable.parentElement.classList.toggle('d-none');
    final.classList.toggle('d-none');
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

