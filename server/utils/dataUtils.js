//@ts-check
export const yearMonthDayDateFromString = (str) => {
    const [year, month, day] = str.split('-');

    return {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
    };
};

export const convertYearMonthDayToDate = (dateInfo) => {
    const { year, month, day } = dateInfo;

    return new Date(year, month - 1, day); //month index is 0-indexed
};