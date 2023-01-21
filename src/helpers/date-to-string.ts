// a function helper to convert unix time to string.

/**
 * Takes in the unixTime as a number, and returns the date in YYYY-MM-DD, HH:MM
 * format.
 * @param unixTime 
 * @returns The date in (YYYY-MM-DD, HH:MM) format.
 */
function convertDateToString(unixTime: number): string {
    const date: Date = new Date(unixTime * 1000);
    const minutes: number = date.getMinutes();

    return (
        date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" +
        date.getDate() + ", " +
        date.getHours() + ":" +
        (
            minutes / 10 < 1   ? (minutes % 10 == 0 ? "00" : "0" + minutes)
                                : minutes
        )
    );
}

export default convertDateToString;