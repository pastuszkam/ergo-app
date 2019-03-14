import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { ResultsListComponent } from './results-list.component';
import { SearchService } from '../services/search.service';
import { Question } from '../models/models.interface';


const fakeQuestion: Question = {
    question_id: 123,
    title: 'asd',
    score: 123,
    is_answered: true,
    body: 'asdasd'
};

const fakeResponse = { data: { questions: [fakeQuestion] }};

describe('ResultsListComponent: ', () => {

    let component: ResultsListComponent;
    let fixture: ComponentFixture<ResultsListComponent>;
    let searchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ResultsListComponent],
            providers: [
                { provide: SearchService, useValue: jasmine.createSpyObj('searchService', ['getData', 'getAnswer', 'getAnswers']) }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ResultsListComponent);
        component = fixture.componentInstance;
        searchService = TestBed.get(SearchService);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('onKeyDown method: ', () => {

        const correctEvent = {keyCode: 13, target: {value: 3} };
        const incorrectEvent = {keyCode: 113};

        it('should call getData method only when enter was pressed', () => {
            searchService.getData.and.returnValue(of(fakeResponse));

            component.onKeyDown(correctEvent);
            component.onKeyDown(incorrectEvent);

            expect(searchService.getData).toHaveBeenCalledTimes(1);
        });

        it('should call getData method and receive correct response', () => {
            searchService.getData.and.returnValue(of(fakeResponse));

            component.onKeyDown(correctEvent);

            expect(searchService.getData).toHaveBeenCalled();
            expect(component.results[0]).toBe(fakeQuestion);
        });

        it('should handle exception from getData method', () => {
            searchService.getData.and.returnValue(throwError({code: 1000}));
            spyOn(console, 'log');

            component.onKeyDown(correctEvent);

            expect(searchService.getData).toHaveBeenCalled();
            expect(console.log).toHaveBeenCalled();
        });
    });

    describe('onSelectedQuestion method: ', () => {

        const fakeIdOfAcceptedAnswer = 123;
        const fakeQuestionId = 123;
        const fakeTabId = 123;

        it('should call getAnswer method if question has accepted answer', () => {
            searchService.getAnswer.and.returnValue(of(fakeResponse));

            component.onSelectedQuestion(fakeIdOfAcceptedAnswer, fakeQuestionId, fakeTabId);

            expect(searchService.getAnswer).toHaveBeenCalled();
        });

        it('should call getAnswers method if question doesnt have accepted answer', () => {
            searchService.getAnswers.and.returnValue(of(fakeResponse));

            component.onSelectedQuestion(null, fakeQuestionId, fakeTabId);

            expect(searchService.getAnswers).toHaveBeenCalled();
        });
    });
});

