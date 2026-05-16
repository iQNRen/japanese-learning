import numbers from './numbers.js';
import colors from './colors.js';
import animals from './animals.js';
import food from './food.js';
import family from './family.js';
import body from './body.js';
import daily from './daily.js';
import time from './time.js';
import weather from './weather.js';
import travel from './travel.js';
import school from './school.js';
import work from './work.js';
import clothing from './clothing.js';
import house from './house.js';
import transport from './transport.js';
import emotions from './emotions.js';
import nature from './nature.js';
import shopping from './shopping.js';
import adjectives from './adjectives.js';
import verbs from './verbs.js';

export async function loadWords() {
    return [
        ...numbers,
        ...colors,
        ...animals,
        ...food,
        ...family,
        ...body,
        ...daily,
        ...time,
        ...weather,
        ...travel,
        ...school,
        ...work,
        ...clothing,
        ...house,
        ...transport,
        ...emotions,
        ...nature,
        ...shopping,
        ...adjectives,
        ...verbs,
    ];
}
