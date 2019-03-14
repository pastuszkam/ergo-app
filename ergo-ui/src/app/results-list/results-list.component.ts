import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Answer, Question } from '../models/models.interface';

@Component({
    selector: 'app-results-list',
    templateUrl: './results-list.component.html'
})

export class ResultsListComponent {

    public loading: boolean;
    public results: Question [] = [];
    public answers: {tabId?: Answer[]} = {};

    constructor(private searchService: SearchService) {}

    onKeyDown(event: any): void {
        if (event.keyCode === 13) {
            this.answers = {};
            this.loading = true;
            this.searchService.getData(event.target.value).subscribe((res) => {
                this.loading = false;
                this.results = res.data.questions;
            }, err => {
                console.log(err);
            });
        }
    }

    onSelectedQuestion(acceptedAnswerId: number, questionId: number, tabId: number): void {
        this.loading = true;
        if (acceptedAnswerId) {
            this.searchService.getAnswer(acceptedAnswerId).subscribe((res) => {
                this.answers[tabId] = res.data.answer;
                this.loading = false;
            });
        } else {
            this.searchService.getAnswers(questionId).subscribe((res) => {
                this.answers[tabId] = res.data.answers;
                this.loading = false;
            });
        }
    }

}


