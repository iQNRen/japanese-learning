/**
 * gojuon.js - Handles the Gojuon (Hiragana/Katakana) table rendering
 */

const gojuonData = [
    // Basic
    {jp: 'あ', kana: 'a'}, {jp: 'い', kana: 'i'}, {jp: 'う', kana: 'u'}, {jp: 'え', kana: 'e'}, {jp: 'お', kana: 'o'},
    {jp: 'か', kana: 'ka'}, {jp: 'き', kana: 'ki'}, {jp: 'く', kana: 'ku'}, {jp: 'け', kana: 'ke'}, {jp: 'こ', kana: 'ko'},
    {jp: 'さ', kana: 'sa'}, {jp: 'し', kana: 'shi'}, {jp: 'す', kana: 'su'}, {jp: 'せ', kana: 'se'}, {jp: 'そ', kana: 'so'},
    {jp: 'た', kana: 'ta'}, {jp: 'ち', kana: 'chi'}, {jp: 'つ', kana: 'tsu'}, {jp: 'て', kana: 'te'}, {jp: 'と', kana: 'to'},
    {jp: 'な', kana: 'na'}, {jp: 'に', kana: 'ni'}, {jp: 'ぬ', kana: 'nu'}, {jp: 'ね', kana: 'ne'}, {jp: 'の', kana: 'no'},
    {jp: 'は', kana: 'ha'}, {jp: 'ひ', kana: 'hi'}, {jp: 'ふ', kana: 'fu'}, {jp: 'へ', kana: 'he'}, {jp: 'ほ', kana: 'ho'},
    {jp: 'ま', kana: 'ma'}, {jp: 'み', kana: 'mi'}, {jp: 'む', kana: 'mu'}, {jp: 'め', kana: 'me'}, {jp: 'も', kana: 'mo'},
    {jp: 'や', kana: 'ya'}, {jp: '', kana: ''}, {jp: 'ゆ', kana: 'yu'}, {jp: '', kana: ''}, {jp: 'よ', kana: 'yo'},
    {jp: 'ら', kana: 'ra'}, {jp: 'り', kana: 'ri'}, {jp: 'る', kana: 'ru'}, {jp: 'れ', kana: 're'}, {jp: 'ろ', kana: 'ro'},
    {jp: 'わ', kana: 'wa'}, {jp: '', kana: ''}, {jp: '', kana: ''}, {jp: '', kana: ''}, {jp: 'を', kana: 'wo'},
    {jp: 'ん', kana: 'n'},
    // Dakuon
    {jp: 'が', kana: 'ga'}, {jp: 'ぎ', kana: 'gi'}, {jp: 'ぐ', kana: 'gu'}, {jp: 'げ', kana: 'ge'}, {jp: 'ご', kana: 'go'},
    {jp: 'ざ', kana: 'za'}, {jp: 'じ', kana: 'ji'}, {jp: 'ず', kana: 'zu'}, {jp: 'ぜ', kana: 'ze'}, {jp: 'ぞ', kana: 'zo'},
    {jp: 'だ', kana: 'da'}, {jp: 'ぢ', kana: 'ji'}, {jp: 'づ', kana: 'zu'}, {jp: 'で', kana: 'de'}, {jp: 'ど', kana: 'do'},
    {jp: 'ば', kana: 'ba'}, {jp: 'び', kana: 'bi'}, {jp: 'ぶ', kana: 'bu'}, {jp: 'べ', kana: 'be'}, {jp: 'ぼ', kana: 'bo'},
    {jp: 'ぱ', kana: 'pa'}, {jp: 'ぴ', kana: 'pi'}, {jp: 'ぷ', kana: 'pu'}, {jp: 'ぺ', kana: 'pe'}, {jp: 'ぽ', kana: 'po'},
    // Yoon
    {jp: 'きゃ', kana: 'kya'}, {jp: 'きゅ', kana: 'kyu'}, {jp: 'きょ', kana: 'kyo'},
    {jp: 'しゃ', kana: 'sha'}, {jp: 'しゅ', kana: 'shu'}, {jp: 'しょ', kana: 'sho'},
    {jp: 'ちゃ', kana: 'cha'}, {jp: 'ちゅ', kana: 'chu'}, {jp: 'ちょ', kana: 'cho'},
    {jp: 'にゃ', kana: 'nya'}, {jp: 'にゅ', kana: 'nyu'}, {jp: 'にょ', kana: 'nyo'},
    {jp: 'ひゃ', kana: 'hya'}, {jp: 'ひゅ', kana: 'hyu'}, {jp: 'ひょ', kana: 'hyo'},
    {jp: 'みゃ', kana: 'mya'}, {jp: 'みゅ', kana: 'myu'}, {jp: 'みょ', kana: 'myo'},
    {jp: 'りゃ', kana: 'rya'}, {jp: 'りゅ', kana: 'ryu'}, {jp: 'りょ', kana: 'ryo'},
];

/**
 * Speaks the given text and adds animation to the speaker element
 */
function speakWithAnimation(speakerEl, text) {
    speakerEl.classList.add('playing');
    setTimeout(() => speakerEl.classList.remove('playing'), 400);
    window.speechEngine.speak(text);
}

/**
 * Renders the Gojuon table into the DOM.
 */
export function renderGojuon() {
    const container = document.getElementById('gojuon-table');
    if (!container) return;
    container.innerHTML = '';

    const basicRows = [
        ['あ','い','う','え','お'],
        ['か','き','く','け','こ'],
        ['さ','し','す','せ','そ'],
        ['た','ち','つ','て','と'],
        ['な','に','ぬ','ね','の'],
        ['は','ひ','ふ','へ','ほ'],
        ['ま','み','む','め','も'],
        ['や','','ゆ','','よ'],
        ['ら','り','る','れ','ろ'],
        ['わ','','','','を'],
        ['','','','','ん']
    ];

    basicRows.forEach((rowChars, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'gojuon-row';
        const isVowelRow = rowIndex === 0;
        
        rowChars.forEach(char => {
            const cell = document.createElement('div');
            if (char === '') {
                cell.className = 'kana-cell empty';
            } else {
                const data = gojuonData.find(d => d.jp === char);
                if (data) {
                    cell.className = 'kana-cell';
                    
                    if (isVowelRow) {
                        // Vowel row gets special animated speaker
                        cell.innerHTML = `
                            <span class="kana-main">${data.jp}</span>
                            <span class="kana-sub">${data.kana}</span>
                            <span class="vowel-speaker" data-char="${data.jp}">🔊</span>
                        `;
                        
                        cell.onclick = () => {
                            window.speechEngine.speak(data.jp);
                        };
                        
                        const speakerEl = cell.querySelector('.vowel-speaker');
                        speakerEl.onclick = (e) => {
                            e.stopPropagation();
                            speakWithAnimation(speakerEl, data.jp);
                        };
                    } else {
                        // Other rows use regular speaker
                        cell.innerHTML = `
                            <span class="kana-main">${data.jp}</span>
                            <span class="kana-sub">${data.kana}</span>
                            <span class="speaker-icon">🔊</span>
                        `;
                        cell.onclick = () => {
                            cell.classList.add('playing');
                            setTimeout(() => cell.classList.remove('playing'), 600);
                            window.speechEngine.speak(data.jp);
                        };
                    }
                } else {
                    cell.className = 'kana-cell empty';
                }
            }
            rowDiv.appendChild(cell);
        });
        container.appendChild(rowDiv);
    });

    const dakuon = gojuonData.filter(d => ['が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ'].includes(d.jp));
    const yoon = gojuonData.filter(d => ['きゃ','きゅ','きょ','しゃ','しゅ','しょ','ちゃ','ちゅ','ちょ','にゃ','にゅ','にょ','ひゃ','ひゅ','ひょ','みゃ','みゅ','みょ','りゃ','りゅ','りょ'].includes(d.jp));

    const appendGroup = (group, label) => {
        if (group.length === 0) return;
        const title = document.createElement('div');
        title.className = 'group-title';
        title.innerText = label;
        title.style.fontSize = '0.9rem';
        title.style.fontWeight = '700';
        title.style.color = 'var(--secondary)';
        title.style.margin = '1rem 0 0.5rem 0';
        container.appendChild(title);

        for (let i = 0; i < group.length; i += 5) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'gojuon-row';
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                const item = group[i + j];
                if (item) {
                    cell.className = 'kana-cell';
                    cell.innerHTML = `
                        <span class="kana-main">${item.jp}</span>
                        <span class="kana-sub">${item.kana}</span>
                        <span class="speaker-icon">🔊</span>
                    `;
                    cell.onclick = () => {
                        cell.classList.add('playing');
                        setTimeout(() => cell.classList.remove('playing'), 600);
                        window.speechEngine.speak(item.jp);
                    };
                } else {
                    cell.className = 'kana-cell empty';
                }
                rowDiv.appendChild(cell);
            }
            container.appendChild(rowDiv);
        }
    };

    appendGroup(dakuon, '浊音/半浊音 (Dakuon/Handakuon)');
    appendGroup(yoon, '拗音 (Yoon)');
}
