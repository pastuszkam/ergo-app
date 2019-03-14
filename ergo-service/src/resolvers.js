const fetch = require('node-fetch');

const baseURL = "https://api.stackexchange.com/2.2";
const filterQuestionBody = "!9Z(-wwYGT"
const filterAnswerBody = "!9Z(-wzu0T";
const key = "uUuD19wZTf7qmLd964nd)Q((";
const site = "stackoverflow";

module.exports = {
    questions: (params) => {
        const { searchValue } = params
        return fetch(`${baseURL}/search/advanced?key=${key}&site=${site}&q=${searchValue}&filter=${filterQuestionBody}`)
        .then(response => response.json()
        .then(response => response.items));
    },
    answers: (params) => {
      const { questionId } = params
        return fetch(`${baseURL}/questions/${questionId}/answers?key=${key}&site=${site}&filter=${filterAnswerBody}`)
        .then(response => response.json()
        .then(response => response.items));
    },
    answer: (params) => {
      const { answerId } = params
        return fetch(`${baseURL}/answers/${answerId}?key=${key}&site=${site}&filter=${filterAnswerBody}`)
        .then(response => response.json()
        .then(response => response.items));
    }
};