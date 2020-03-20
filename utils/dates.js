/**
 * Parses date string and returns object with keys of day, month, and year,
 * values being number, else return null.
 *
 * @param {string} str in format of dd-mm-yyyy, where dd/mm/yyyy are integers
 * @returns {{day: number, month: number, year: number} | null}
 */
function parseDate(str) {
    if (!str || str.length !== 10 || typeof str !== "string") {
        return null;
    } else {
        let arr = str.split('-');
        let obj = {
            "day": arr[0],
            "month": arr[1],
            "year": arr[2]
        };
        return obj;
    }
}

/**
 * Checks if combination of day, month, and year are a valid
 * calendar day. Assumes year is >= 0CE.
 *
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns {boolean} true if arguments represents a valid calendar day,
 * else false
 */
module.exports.isValidDay = function(day, month, year) {
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 0) {
        return false;
    } else if ((month === 4 || month === 6 || month === 9 || month === 11) &&
        (day > 30)) {
        return false;
    } else if (month === 2 && year % 4 === 0 && day > 29) {
        return false;
    } else if (month === 2 && year % 4 !== 0 && day > 28) {
        return false;
    } else {
        return true;
    }
}

/**
 * Calculate the age, given date of creation, and day of calculation. Assumes
 * dates are >= 0CE.
 *
 * @param {string} dateCreation - in format of dd-mm-yyyy
 * @param {string} dateCalculate - in format of dd-mm-yyyy
 * @returns {number} the age. or -1 on errors
 */
module.exports.getAge = function(dateCreation, dateCalculate) {
    let dob = parseDate(dateCreation);
    let now = parseDate(dateCalculate);
    if (!isValidDay(dob.day, dob.month, dob.year) ||
        !isValidDay(now.day, now.month, now.year) || dob.year > now.year) {
        return -1;
    }
    let ans = now.year - dob.year;
    // check if born on leap year on feb 29
    if ((now.month < dob.month) ||
        (now.month === dob.month && now.day < dob.day)) {
        --ans;
    }
    return ans;
}