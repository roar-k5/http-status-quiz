class GameUI {
    constructor() {
        this.screens = {
            start: document.getElementById('startScreen'),
            game: document.getElementById('gameScreen'),
            results: document.getElementById('resultsScreen')
        };
        this.elements = {
            currentQ: document.getElementById('currentQ'),
            totalQ: document.getElementById('totalQ'),
            timer: document.getElementById('timer'),
            score: document.getElementById('score'),
            streak: document.getElementById('streak'),
            progressBar: document.getElementById('progressBar'),
            scenarioText: document.getElementById('scenarioText'),
            optionsGrid: document.getElementById('optionsGrid'),
            feedback: document.getElementById('feedback'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            feedbackTitle: document.getElementById('feedbackTitle'),
            feedbackText: document.getElementById('feedbackText'),
            finalScore: document.getElementById('finalScore'),
            resultMessage: document.getElementById('resultMessage'),
            correctAnswers: document.getElementById('correctAnswers'),
            accuracy: document.getElementById('accuracy'),
            maxStreak: document.getElementById('maxStreak'),
            leaderboardList: document.getElementById('leaderboardList')
        };
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    updateTimer(time, maxTime) {
        this.elements.timer.textContent = time;
        const percentage = (time / maxTime) * 100;
        this.elements.timer.style.color = percentage > 50 ? 'var(--accent-yellow)' : 'var(--accent-red)';
    }

    updateProgress(percentage) {
        this.elements.progressBar.style.width = percentage + '%';
    }

    updateStats({ current, total, score, streak }) {
        this.elements.currentQ.textContent = current;
        this.elements.totalQ.textContent = total;
        this.elements.score.textContent = score;
        this.elements.streak.textContent = streak;
    }

    showQuestion(question) {
        this.elements.scenarioText.textContent = question.scenario;
        this.elements.optionsGrid.innerHTML = '';
        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <div class="status-code">${option.code}</div>
                <div class="status-name">${option.name}</div>
            `;
            btn.onclick = () => game.selectAnswer(option.code, btn);
            this.elements.optionsGrid.appendChild(btn);
        });
    }

    highlightOptions(correctCode, selectedCode, isCorrect) {
        const buttons = this.elements.optionsGrid.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            const code = btn.querySelector('.status-code').textContent;
            btn.disabled = true;
            if (code === correctCode) {
                btn.classList.add('correct');
            } else if (code === selectedCode && !isCorrect) {
                btn.classList.add('wrong');
            }
        });
    }

    showFeedback(isCorrect, question, isTimeout = false) {
        const fb = this.elements.feedback;
        fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
        this.elements.feedbackIcon.textContent = isCorrect ? 'OK' : 'NO';
        this.elements.feedbackTitle.textContent = isCorrect ? 'Correct!' : (isTimeout ? 'Time\'s Up!' : 'Wrong!');

        if (isCorrect) {
            const points = game.scoring.calculate(game.state.timer, Math.max(0, game.state.streak - 1));
            this.elements.feedbackText.textContent = `+${points} points!`;
        } else {
            this.elements.feedbackText.textContent = `Correct answer: ${question.correct.code} ${question.correct.name}. ${question.explanation}`;
        }
    }

    hideFeedback() {
        this.elements.feedback.classList.remove('show');
    }

    showResults({ score, correctCount, accuracy, maxStreak, rating, qualifies }) {
        this.showScreen('results');
        this.elements.finalScore.textContent = score;
        this.elements.resultMessage.innerHTML = `<span style="color: ${rating.color}">${rating.badge}</span>`;
        this.elements.correctAnswers.textContent = correctCount;
        this.elements.accuracy.textContent = Math.round(accuracy * 100) + '%';
        this.elements.maxStreak.textContent = maxStreak;

        const saveBtn = document.getElementById('saveScoreButton');
        const nameInput = document.getElementById('playerName');

        if (saveBtn) {
            saveBtn.style.display = qualifies ? 'inline-flex' : 'none';
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save to Leaderboard';
        }

        if (nameInput) {
            nameInput.style.display = qualifies ? 'block' : 'none';
            nameInput.value = '';
        }
    }

    renderLeaderboard(entries, currentEntry = null) {
        this.elements.leaderboardList.innerHTML = '';
        entries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            if (currentEntry && entry.name === currentEntry.name && entry.score === currentEntry.score) {
                li.classList.add('current-player');
            }
            li.innerHTML = `
                <div class="rank ${index < 3 ? 'top' : ''}">#${index + 1}</div>
                <div class="player-name">${entry.name}</div>
                <div class="player-score">${entry.score}</div>
            `;
            this.elements.leaderboardList.appendChild(li);
        });
    }
}
