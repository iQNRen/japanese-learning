/**
 * quiz.js - Handles the quiz logic and UI
 */

export class QuizManager {
    constructor(speechEngine) {
        this.speech = speechEngine;
        this.currentMode = '';
        this.currentIndex = 0;
        this.score = 0;
        this.questions = [];
    }

    init() {
        this._showPanel('quiz-setup');
    }

    startQuiz(mode) {
        this.currentMode = mode;
        this.currentIndex = 0;
        this.score = 0;

        const words = window.wordManager.allWords;
        if (!words || words.length === 0) {
            alert('单词数据尚未加载，请稍后再试');
            return;
        }

        if (mode === 'jp-en') {
            this.questions = words.map(w => ({q: w.jp, a: w.en, type: 'jp-en', kana: w.kana}));
        } else if (mode === 'en-jp') {
            this.questions = words.map(w => ({q: w.en, a: w.jp, type: 'en-jp', kana: w.kana}));
        } else if (mode === 'roma-jp') {
            this.questions = words.map(w => ({q: w.kana, a: w.jp, type: 'roma-jp', kana: w.kana}));
        } else if (mode === 'jp-cn') {
            this.questions = words.map(w => ({q: w.jp, a: w.cn, type: 'jp-cn', kana: w.kana}));
        }

        this.questions = this.questions.sort(() => Math.random() - 0.5).slice(0, 20);
        this._showPanel('quiz-active');
        this.loadQuestion();
    }

    startMemTest() {
        this.currentMode = 'mem';
        this.currentIndex = 0;
        this.score = 0;

        const words = window.wordManager.allWords;
        if (!words || words.length === 0) {
            alert('单词数据尚未加载，请稍后再试');
            return;
        }

        this.questions = [...words]
            .sort(() => Math.random() - 0.5)
            .slice(0, 50)
            .map(w => ({q: w.jp, a: w.en, type: 'mem', kana: w.kana}));

        this._showPanel('quiz-active');
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResult();
            return;
        }

        const q = this.questions[this.currentIndex];
        document.getElementById('quiz-progress').innerText = `进度: ${this.currentIndex + 1} / ${this.questions.length}`;
        document.getElementById('quiz-q-text').innerText = q.q;

        if (this.currentMode === 'mem') {
            this.speech.speak(q.kana);
        }

        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';

        let pool = [];
        if (this.currentMode === 'jp-en' || this.currentMode === 'mem') pool = window.wordManager.allWords.map(w => w.en);
        else if (this.currentMode === 'en-jp') pool = window.wordManager.allWords.map(w => w.jp);
        else if (this.currentMode === 'roma-jp') pool = window.wordManager.allWords.map(w => w.jp);
        else if (this.currentMode === 'jp-cn') pool = window.wordManager.allWords.map(w => w.cn);

        let options = [q.a];
        let wrongOptions = [];
        let attempts = 0;
        while (wrongOptions.length < 3 && attempts < 200) {
            let rand = pool[Math.floor(Math.random() * pool.length)];
            if (rand !== q.a && !wrongOptions.includes(rand)) {
                wrongOptions.push(rand);
            }
            attempts++;
        }
        options = [...options, ...wrongOptions].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => this.handleAnswer(opt, q.a, btn);
            optionsContainer.appendChild(btn);
        });
    }

    handleAnswer(selected, correct, btn) {
        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(b => b.disabled = true);

        if (selected === correct) {
            btn.classList.add('correct');
            this.score++;
        } else {
            btn.classList.add('wrong');
            allButtons.forEach(b => {
                if (b.innerText === correct) b.classList.add('correct');
            });
        }

        setTimeout(() => {
            this.currentIndex++;
            this.loadQuestion();
        }, 1000);
    }

    showResult() {
        this._showPanel('quiz-result');
        const scorePercent = Math.round((this.score / this.questions.length) * 100);
        document.getElementById('result-score').innerText = `${this.score} / ${this.questions.length} (${scorePercent}%)`;
    }

    exitQuiz() {
        this._showPanel('quiz-setup');
    }

    _showPanel(id) {
        const panels = ['quiz-setup', 'quiz-active', 'quiz-result'];
        panels.forEach(pId => {
            const el = document.getElementById(pId);
            if (el) el.style.display = (pId === id) ? 'block' : 'none';
        });
    }
}
