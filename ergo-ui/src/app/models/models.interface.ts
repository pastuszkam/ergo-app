export interface Answer {
    answer_id: number;
    score: number;
    is_accepted: boolean;
    body?: string;
}

export interface Question {
    question_id: number;
    title: string;
    score: number;
    is_answered: boolean;
    accepted_answer_id?: number;
    body: string;
}
