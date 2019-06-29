export const createTimer = function (seconds, update, finish) {
    let startMillis;
    let duration;
    let requestId;

    const init = millis => {
        if (requestId) {
            cancelAnimationFrame(requestId);
            requestId = null;
        }
        startMillis = null;
        duration = millis;
    };

    const step = (timeStamp) => {
        if (startMillis === null) {
            return;
        }
        let remaining = (startMillis + duration) - timeStamp;
        if (remaining > 0) {
            update(remaining / 1000);
            requestId = requestAnimationFrame(step);
        } else {
            init(duration);
            finish();
        }
    };

    init(seconds * 1000);

    return {
        reset: seconds => init(seconds ? seconds * 1000 : duration),
        offset: seconds => (duration += seconds * 1000),
        isRunning: () => startMillis !== null,
        remaining: () =>
            Math.max(0, startMillis === null
                ? duration / 1000
                : (startMillis + duration - performance.now()) / 1000),
        start: () => {
            startMillis = performance.now();
            step(startMillis);
        }
    };
}
