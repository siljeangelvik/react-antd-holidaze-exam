export const getDatesBetween = (startDate, endDate) => {
    const dates = [];

    // Strip hours, minutes, seconds etc
    let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
    );

    while (currentDate <= endDate) {
        dates.push(currentDate);

        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1, // Will increase month if over range
        );
    }

    return dates;
};

// Usage
// const dates = getDatesBetween(new Date(), new Date());
// console.log(dates);