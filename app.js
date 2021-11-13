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

let currentStudent = 5;

let next = document.querySelector(".next");
let studentImg = document.querySelector(".studentImg");
let imgWrapper = document.querySelector('.imgWrapper')
let answers = document.querySelectorAll('.answer > button');
let links = students.map(student => student.img);
let names = students.map(student => student.name);
let namesShuffled = names.sort(() => Math.random() - 0.5);

let index = 0;
let score = 0;

let newAnswers = (arr) => {
    let namesAnswers = [];
    namesAnswers.push(studentImg.dataset.name);
    console.log(namesAnswers);
    for (let i = 0; i < answers.length; i++) {
        if (arr[i] !== studentImg.dataset.name) {
            namesAnswers.push(arr[i]);
        }
    }
    namesAnswers.sort(() => Math.random() - 0.5);
    return namesAnswers;
}

let newStudent = () => {
    studentImg.setAttribute('src', links[index]);
    studentImg.setAttribute('data-name', names[index]);

    let namesAnswers = newAnswers(namesShuffled);
    console.log(namesAnswers);

    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = namesAnswers[i];
    }

}

newStudent();


answers.forEach(button => {
    button.addEventListener('click', e => {
        if (e.target.innerText == studentImg.dataset.name) {
            score++;
        }
        answers.forEach(button => {
            button.classList.remove('btn-light');
            button.classList.add('btn-danger')
            if (button.innerText == studentImg.dataset.name) {
                button.classList.remove('btn-danger');
                button.classList.add('btn-success');
            }
        });
    })
})

next.addEventListener('click', e => {

    answers.forEach(button => {
        button.classList.add('btn-light')
        button.classList.remove('btn-danger')
        button.classList.remove('btn-success')
    })

    index++;

    if (index < links.length) {
        newStudent();
        // studentImg.setAttribute('src', links[index]);
        // studentImg.setAttribute('data-name', names[index]);
    } else {
        imgWrapper.innerText = `You guessed right ${score} times`;
        studentImg.style.display = 'none'
    }
})




// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let shuffled = [...arr].sort(() => Math.random() - 0.5)
// let namesNew = [...names].sort(() => Math.random() - 0.5)

// // function shuffle(array) {
// //     array.sort(() => Math.random() - 0.5);
// // }

// // shuffle(arr);
// console.log(arr);
// console.log(shuffled);
// console.log(names);
// console.log(namesNew)