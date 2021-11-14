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
    }, {
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

let next = document.querySelector(".next");
let studentImg = document.querySelector(".studentImg");
let imgWrapper = document.querySelector('.imgWrapper');
let final = document.querySelector('.final');
let answers = document.querySelectorAll('.answers > button');
let studentsNew = [...students].sort(() => Math.random() - 0.5);
let links = studentsNew.map(student => student.img);
let names = studentsNew.map(student => student.name);
console.log('names are', names)

let index = 0;
let score = 0;
let userAnswers = [];
// we need to check if answer is given to avoid score bug
let answerGiven = false;


let newStudent = () => {
    // generate new picture
    studentImg.setAttribute('src', links[index]);
    // shuffle array of names to create random array of names
    let namesShuffled = [...names].sort(() => Math.random() - 0.5);
    // filter our new array to exclude name with the right answer
    namesShuffled = namesShuffled
    .filter(name => name !== names[index]);
    // add the right name to the begining of array
    namesShuffled.unshift(names[index]);
    // cut the 4 possible answers from the array and shuffle them
    let buttonsAnswers = namesShuffled.slice(0, answers.length)
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
    console.log('user answers', userAnswers)}
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
            button.classList.remove('btn-light');
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
    answerGiven = false;
    index++;

    if (index < students.length) {
        //  revert buton classes
        answers.forEach(button => {
            button.classList.add('btn-light');
            button.classList.remove('btn-danger');
            button.classList.remove('btn-success');
        });
        // creating new student 
        newStudent();
    } else {
        // game ended; showing the final page
        final.style.display = 'block';
        final.innerText = `Game ended! You guessed right ${score} times. Rigth answers were ${names.join(', ')}. Your answers were ${userAnswers.join(', ')}`;
        studentImg.style.display = 'none';
        answers.forEach(button => button.style.display = 'none');
        next.style.display = 'none';
    }
})