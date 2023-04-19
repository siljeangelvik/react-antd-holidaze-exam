const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

export function formatDate(date: Date | string) {
    const dateObj = new Date(date);
    return DATE_FORMATTER.format(dateObj);
}
