class HTTPQuizGame {
    constructor(questions, ui, leaderboard, scoring) {
        this.questions = questions;
        this.ui = ui;
        this.leaderboard = leaderboard;
        this.scoring = scoring;
        this.state = {
            currentQuestion: 0, score: 0, streak: 0, maxStreak: 0,
            correctCount: 0, timer: 15, answered: false,
            shuffledQuestions: [], timerInterval: null
        };
        this.TIME_LIMIT = 15;
        this.QUESTIONS_PER_GAME = 20;
    }

    start() {
        this.resetState();
        this.state.shuffledQuestions = this.shuffleArray([...this.questions]).slice(0, this.QUESTIONS_PER_GAME);
        this.ui.showScreen('game');
        this.loadQuestion();
    }

    resetState() {
        this.state = {
            currentQuestion: 0, score: 0, streak: 0, maxStreak: 0,
            correctCount: 0, timer: this.TIME_LIMIT, answered: false,
            shuffledQuestions: this.state.shuffledQuestions || [], timerInterval: null
        };
    }

    loadQuestion() {
        this.state.answered = false;
        this.state.timer = this.TIME_LIMIT;
        const question = this.state.shuffledQuestions[this.state.currentQuestion];
        const progress = ((this.state.currentQuestion + 1) / this.QUESTIONS_PER_GAME) * 100;
        this.ui.updateTimer(this.state.timer, this.TIME_LIMIT);
        this.ui.updateProgress(progress);
        this.ui.updateStats({
            current: this.state.currentQuestion + 1, total: this.QUESTIONS_PER_GAME,
            score: this.state.score, streak: this.state.streak
        });
        this.ui.showQuestion(question);
        this.startTimer();
    }

    startTimer() {
        this.clearTimer();
        this.state.timerInterval = setInterval(() => {
            this.state.timer--;
            this.ui.updateTimer(this.state.timer, this.TIME_LIMIT);
            if (this.state.timer <= 0) this.handleTimeUp();
        }, 1000);
    }

    clearTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    selectAnswer(selectedCode, btnElement) {
        if (this.state.answered) return;
        this.state.answered = true;
        this.clearTimer();
        const question = this.state.shuffledQuestions[this.state.currentQuestion];
        const isCorrect = selectedCode === question.correct.code;
        this.ui.highlightOptions(question.correct.code, selectedCode, isCorrect);
        if (isCorrect) this.handleCorrectAnswer();
        else this.handleWrongAnswer();
        setTimeout(() => this.ui.showFeedback(isCorrect, question), 500);
    }

    handleCorrectAnswer() {
        const points = this.scoring.calculate(this.state.timer, this.state.streak);
        this.state.score += points;
        this.state.streak++;
        this.state.correctCount++;
        if (this.state.streak > this.state.maxStreak) this.state.maxStreak = this.state.streak;
    }

    handleWrongAnswer() {
        this.state.streak = 0;
    }

    handleTimeUp() {
        if (this.state.answered) return;
        this.state.answered = true;
        this.state.streak = 0;
        const question = this.state.shuffledQuestions[this.state.currentQuestion];
        this.ui.highlightOptions(question.correct.code, null, false);
        setTimeout(() => this.ui.showFeedback(false, question, true), 500);
    }

    nextQuestion() {
        this.ui.hideFeedback();
        this.state.currentQuestion++;
        if (this.state.currentQuestion >= this.QUESTIONS_PER_GAME) this.endGame();
        else this.loadQuestion();
    }

    endGame() {
        const accuracy = this.state.correctCount / this.QUESTIONS_PER_GAME;
        const maxScore = this.scoring.getMaxScore(this.QUESTIONS_PER_GAME);
        const rating = this.scoring.getRating(this.state.score, maxScore);
        this.ui.showResults({
            score: this.state.score, correctCount: this.state.correctCount,
            accuracy: accuracy, maxStreak: this.state.maxStreak,
            rating: rating, qualifies: this.leaderboard.qualifies(this.state.score)
        });
        this.ui.renderLeaderboard(this.leaderboard.load());
    }

    saveScore(playerName) {
        const entry = {
            name: playerName, score: this.state.score,
            accuracy: this.state.correctCount / this.QUESTIONS_PER_GAME
        };
        const rank = this.leaderboard.save(entry);
        this.ui.renderLeaderboard(this.leaderboard.load(), entry);
        return rank;
    }

    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}