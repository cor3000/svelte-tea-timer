export const palette = [
    '#05702a',
    '#49a7b3',
    '#c2de58',
    '#fea700',
    '#ecd7bf',
    '#9c4900',
    '#69110a',
    '#7f8c07',
    '#d8d8d8'
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