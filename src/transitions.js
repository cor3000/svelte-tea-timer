const dirs = {
    top: 'translateY(-',
    bottom: 'translateY(',
    left: 'translateX(-',
    right: 'translateX(',
};
export const fly = function (node, { from = 'top', ...opts }) {
    return {
        ...opts,
        tick: (t, u) => {
            node.style.setProperty('transform', `${dirs[from]}${u * 100.0}%)`);
            node.style.setProperty('opacity', `${t}`);
        }
    }
}
