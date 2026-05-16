import greetings from './greetings.js';
import daily from './daily.js';
import shopping from './shopping.js';
import travel from './travel.js';
import emergency from './emergency.js';
import weather from './weather.js';
import work from './work.js';
import school from './school.js';
import social from './social.js';

export async function loadSentences() {
    return [
        ...greetings,
        ...daily,
        ...shopping,
        ...travel,
        ...emergency,
        ...weather,
        ...work,
        ...school,
        ...social,
    ];
}
