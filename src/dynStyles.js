export const palette = [
    '#205123',
    '#2e5628',
    '#3b5c2d',
    '#476133',
    '#52673a',
    '#566337',
    '#5a6034',
    '#5d5c32',
    '#594e28',
    '#534120',
    '#4c3319',
    '#442714'
];

const recipeColor = function (recipe, cssProp) {
    const color = recipe && recipe.color || palette[0];
    return {
        style: `${cssProp}: ${color}`
    }
};

export const recipeBg = function (recipe) {
    return recipeColor(recipe, 'background-color');
};
export const recipeFg = function (recipe) {
    return recipeColor(recipe, 'color');
};