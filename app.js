const students = [{
        name: "Kitty",
        img: "img/1.jpg",
    },
    {
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
    },

];

let next = document.querySelector(".next");
let studentImg = document.querySelector(".studentImg");
let imgWrapper = document.querySelector('.imgWrapper');
let final = document.querySelector('.final');
let answers = document.querySelectorAll('.answers > button');
let links = students.map(student => student.img);
let names = students.map(student => student.name);

let index = 0;
let score = 0;

// function to create labels for buttons with answers
let newAnswers = (arr) => {
    // create empty array
    let namesAnswers = [];
    // fill it with the correct answer
    namesAnswers.push(names[index]);
    console.log(namesAnswers);
    // fill it with the rest of names
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== names[index]) {
            namesAnswers.push(arr[i]);
        }
    }
    // cut array to have just 4 potential answers ans then shuffle it
    return namesAnswers.slice(0, 4).sort(() => Math.random() - 0.5);
}

let newStudent = () => {
    // generate new picture
    studentImg.setAttribute('src', links[index]);
    // shuffle array of names to create random array of names
    let namesShuffled = [...names].sort(() => Math.random() - 0.5);
    // call for my function with random names
    let buttonsAnswers = newAnswers(namesShuffled);
    console.log(buttonsAnswers);
    // set names to buttons
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = buttonsAnswers[i];
    }

}

// create my first page
newStudent();

// listener for the buttons with answers
answers.forEach(button => {
    button.addEventListener('click', e => {
        if (e.target.innerText == names[index]) {
            // if user anwered correctly - upgrade the score
            score++;
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
})

// listener for the 'next' button
next.addEventListener('click', e => {

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
        final.innerText = `Game ended! You guessed right ${score} times`;
        studentImg.style.display = 'none';
        answers.forEach(button => button.style.display = 'none');
        next.style.display = 'none';
    }
})