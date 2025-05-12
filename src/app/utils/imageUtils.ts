export const isUrl = (str: string): boolean => {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
};

export const cleanImageUrl = (url: string) => {
    try {
        const u = new URL(url);
        u.searchParams.delete('edge');
        return u.toString();
    } catch (error) {
        console.error('Invalid URL:', error);
        return url; // Возвращаем исходный URL, если он некорректен
    }
};
