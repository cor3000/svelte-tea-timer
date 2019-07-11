

export const swipe = function (node) {
    let start;
    let end;

    const calcDelta = (start, end) => {
        const dx = end.touch.clientX - start.touch.clientX;
        const dy = end.touch.clientY - start.touch.clientY;
        const dur = end.time - start.time;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);

        return {
            dx, dy, dur, dist,
            speed: dist / dur,
            vx: dx / dist,
            vy: dy / dist 
        };
    };

    node.addEventListener('touchstart', e => {
        start = {time: e.timeStamp, touch: e.touches[0]};
    });
    node.addEventListener('touchmove', e => {
        end = {time: e.timeStamp, touch: e.touches[0]};
        const delta = calcDelta(start, end);
        if(delta.dur > 50) {
            node.dispatchEvent(new CustomEvent('dragging', {detail: delta}));
        }
    });


    node.addEventListener('touchend', e => {
        if(start && end) {
            const delta = calcDelta(start, end);
            if(delta.dur > 50 && delta.dur < 1000) {
                if(delta.vx < -0.8) {
                    node.dispatchEvent(new CustomEvent('swipeleft'));
                }
                if(delta.vx > 0.8) {
                    node.dispatchEvent(new CustomEvent('swiperight'));
                }
                if(delta.vy < -0.8) {
                    node.dispatchEvent(new CustomEvent('swipeup'));
                }
                if(delta.vy > 0.8) {
                    node.dispatchEvent(new CustomEvent('swipedown'));
                }
            }
        }
        start = null;
        end = null;
    });
}

