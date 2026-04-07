class LeaderboardManager {
    constructor(storageKey = 'httpQuizLeaderboard') {
        this.storageKey = storageKey;
        this.maxEntries = 10;
        this.defaultEntries = [
            { name: 'BackendBoss', score: 950, date: '2026-04-05', accuracy: 0.95 },
            { name: 'API_Wizard', score: 880, date: '2026-04-04', accuracy: 0.90 },
            { name: 'StatusCodePro', score: 820, date: '2026-04-03', accuracy: 0.85 },
            { name: 'DevOps_Dave', score: 760, date: '2026-04-02', accuracy: 0.80 },
            { name: 'Frontend_Fiona', score: 700, date: '2026-04-01', accuracy: 0.75 }
        ];
    }

    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) return JSON.parse(stored);
        } catch (e) {
            console.warn('Failed to load leaderboard:', e);
        }
        return [...this.defaultEntries];
    }

    save(entry) {
        const leaderboard = this.load();
        const newEntry = {
            name: entry.name || 'Anonymous',
            score: entry.score || 0,
            accuracy: entry.accuracy || 0,
            date: new Date().toISOString().split('T')[0]
        };
        leaderboard.push(newEntry);
        leaderboard.sort((a, b) => b.score - a.score);
        const trimmed = leaderboard.slice(0, this.maxEntries);
        const rank = trimmed.findIndex(e =>
            e.name === newEntry.name && e.score === newEntry.score && e.date === newEntry.date
        );

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
        } catch (e) {
            console.warn('Failed to save leaderboard:', e);
        }

        return rank;
    }

    qualifies(score) {
        const leaderboard = this.load();
        if (leaderboard.length < this.maxEntries) return true;
        return score > leaderboard[leaderboard.length - 1].score;
    }
}

class ScoringEngine {
    constructor() {
        this.basePoints = 50;
        this.timeMultiplier = 2;
        this.streakBonus = 5;
    }

    calculate(timeRemaining, streak) {
        const timeBonus = Math.max(0, timeRemaining * this.timeMultiplier);
        const streakBonus = streak * this.streakBonus;
        return this.basePoints + timeBonus + streakBonus;
    }

    getMaxScore(questionCount = 20) {
        const maxPerQuestion = this.basePoints + (15 * this.timeMultiplier);
        const maxStreakBonus = this.streakBonus * (questionCount - 1) * questionCount / 2;
        return (maxPerQuestion * questionCount) + maxStreakBonus;
    }

    getRating(score, maxScore) {
        const percentage = score / maxScore;
        if (percentage >= 0.95) return { badge: 'Legendary', color: '#00ff88' };
        if (percentage >= 0.85) return { badge: 'Expert', color: '#3742fa' };
        if (percentage >= 0.70) return { badge: 'Proficient', color: '#ffa502' };
        if (percentage >= 0.50) return { badge: 'Learning', color: '#ff4757' };
        return { badge: 'Beginner', color: '#a0a0b0' };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LeaderboardManager, ScoringEngine };
}
