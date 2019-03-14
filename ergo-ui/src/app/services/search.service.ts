import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


import { Answer, Question } from '../models/models.interface';

interface Response  {
    answer?: Answer[];
    answers?: Answer[];
    questions?: Question[];
}

@Injectable()
export class SearchService {

    constructor(private apollo: Apollo) {}

    public getData(searchValue: string) {
        return this.apollo.watchQuery<Response>({
            query: gql`
            {
                questions(searchValue:"${searchValue}") {
                    score,
                    title,
                    question_id,
                    is_answered,
                    accepted_answer_id
                    body
                }
            }
            `
        }).valueChanges;
    }

    public getAnswers(questionId: number) {
        return this.apollo.watchQuery<Response>({
            query: gql`
            {
                answers(questionId:"${questionId}") {
                    answer_id,
                    is_accepted,
                    body
                }
            }
            `
        }).valueChanges;
    }

    public getAnswer(answerId: number) {
        return this.apollo.watchQuery<Response>({
            query: gql`
            {
                answer(answerId:"${answerId}") {
                    answer_id,
                    body,
                    is_accepted
                }
            }
            `
        }).valueChanges;
    }
}
