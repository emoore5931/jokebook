"use strict";
const randomJokeRef = document.getElementById("randomJoke");
const categorySelectionRef = document.getElementById("categorySelection");
const jokesListRef = document.getElementById("jokes");
const newJokeSubmitBttnRef = document.getElementById("submitJoke");
const setupInputRef = document.getElementById("setup");
const deliveryInputRef = document.getElementById("delivery");
const categoryInputRef = document.getElementById("category");


fetch("/jokebook/joke/random")
    .then((joke) => {
        return joke.json();
    })
    .then((joke) => {
        randomJokeRef.textContent = `${joke.setup} ${joke.delivery}`;
    });

fetch("/jokebook/categories")
    .then((categories) => {
        return categories.json();
    })
    .then((categories) => {
        categories.forEach((category) => {
            const listOption = document.createElement("option");
            listOption.value = category.id;
            listOption.textContent = category.type;
            listOption.addEventListener("click", getJokes);
            categorySelectionRef.appendChild(listOption);

            const submitOption = document.createElement("option");
            submitOption.value = category.id;
            submitOption.textContent = category.type;
            categoryInputRef.appendChild(submitOption);
        });
    });

newJokeSubmitBttnRef.addEventListener("click", (event) => {
    const setup = setupInputRef.value.trim();
    const delivery = deliveryInputRef.value.trim();
    const categoryId = categoryInputRef.value;

    fetch("/jokebook/joke/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ setup, delivery, categoryId })
    }).then((response) => {
        if (response.ok) {
            setupInputRef.value = "";
            deliveryInputRef.value = "";
            alert("Joke added successfully! Check above the submission form to see the joke added.");
        } else {
            alert("Failed to add joke.");
        }
        getJokesInCategory(categoryId);
    });
});

function getJokes(event) {
    const categoryId = event.target.value;
    getJokesInCategory(categoryId);
}

function getJokesInCategory(categoryId) {
    fetch(`/jokebook/joke?category=${categoryId}`)
    .then((jokes) => {
        return jokes.json();
    })
    .then((jokes) => {
        jokesListRef.innerHTML = "";
        jokes.forEach((joke) => {
            const jokeElement = document.createElement("li");
            jokeElement.textContent = `${joke.setup} ${joke.delivery}`;
            jokesListRef.appendChild(jokeElement);
        });
    });
}