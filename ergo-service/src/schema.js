const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Query {
        questions(searchValue: String): [Question]
        answers(questionId: String): [Answer]
        answer(answerId: String): [Answer]
    }
    type Question {
        question_id : ID!
        title: String!
        score: Int!
        is_answered: Boolean!
        accepted_answer_id: Int
        body: String!
    }
    type Answer {
        answer_id: ID!
        score: Int!
        is_accepted: Boolean!
        body: String
    }
`)