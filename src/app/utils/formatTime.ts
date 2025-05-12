export const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
        days > 0 ? `${days} д` : null,
        hours > 0 ? `${hours} ч` : null,
        minutes > 0 ? `${minutes} м` : null,
        `${secs} с`
    ]
        .filter(Boolean)
        .join(' ');
};
