function useCheckMediaProperty(media) {
    const placeholderUrl = 'https://cdn.pixabay.com/photo/2016/10/22/18/52/beach-1761410_1280.jpg';

    if (media && media.length > 0) {
        return media;
    } else {
        return placeholderUrl;
    }
}

export default useCheckMediaProperty;
