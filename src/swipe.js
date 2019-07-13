
export const gesture = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down'
}

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
            speed: dist / dur * 1000,
            vx: dx / dist,
            vy: dy / dist,
            angle: Math.atan2(dy, dx) / Math.PI * 180
        };
    };

    const stop = (event, preventDefault) => {
        event.stopPropagation();
        if (preventDefault) {
            event.preventDefault()
        };
    }

    const dispatchSwipeEvent = (gesture, delta, event) => {
        node.dispatchEvent(new CustomEvent('swipe', { detail: { gesture, delta } }));
        stop(event);
    }

    node.addEventListener('touchstart', e => {
        start = { time: e.timeStamp, touch: e.touches[0] };
        end = null;
    }, { passive: true });
    node.addEventListener('touchmove', e => {
        stop(e);
        end = { time: e.timeStamp, touch: e.touches[0] };
    }, { passive: true });
    node.addEventListener('touchend', e => {
        if (start && end) {
            const delta = calcDelta(start, end);
            if (delta.dur > 50 && delta.dur < 1000 && delta.dist > 70.0) {
                if (delta.vx < -0.8) {
                    dispatchSwipeEvent(gesture.LEFT, delta, e);
                }
                if (delta.vx > 0.8) {
                    dispatchSwipeEvent(gesture.RIGHT, delta, e);
                }
                if (delta.vy < -0.8) {
                    dispatchSwipeEvent(gesture.UP, delta, e);
                }
                if (delta.vy > 0.8) {
                    dispatchSwipeEvent(gesture.DOWN, delta, e);
                }
            }
        }
        start = null;
        end = null;
    });
}

