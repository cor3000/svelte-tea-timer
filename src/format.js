export const formatTime = duration => {
    duration = Math.abs(duration);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
        .toString()
        .padStart(2, "0");
    return minutes + ":" + seconds;
};

export const formatDecis = duration => {
    duration = Math.abs(duration);
    const decis = Math.floor(duration * 10) % 10;
    return "." + decis;
};
