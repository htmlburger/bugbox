import moment from 'moment';

/**
 * Get relative time from date
 * @param  {Date|String} date
 * @return {String}
 */
export const fromNow = (date) => {
	const dateObj = moment(date);

	if (dateObj.isValid()) {
		return dateObj.fromNow();
	} else {
		return date;
	}
};

