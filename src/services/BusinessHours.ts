/**
 * Hour in milliseconds.
 */
const hourInMilliseconds = 60 * 60 * 1000;

/**
 * Business hours service.
 */
export class BusinessHours {
 
  /**
   * Given two date times on the same day, return rounded down hours between the two.
   * @param startDate Start date.
   * @param endDate End date.
   * @returns number
   */
  static getHoursBetween = ( startDate: Date, endDate:Date ):number => {
    if ( ! BusinessHours.isSameDay( startDate, endDate ) ) {
      return 0;
    }

    if ( ! BusinessHours.isWorkday( startDate ) ) {
      return 0;
    }

    const diff = endDate.getTime() - startDate.getTime();
    return diff < 0 ? 0 : Math.floor( diff / hourInMilliseconds );
  };

  /**
   * Checks if a given day is a work day.
   * @param date Date to check.
   * @returns boolean
   */
  static isWorkday = ( date: Date):boolean => {
    return date.getDay() !== 0 && date.getDay() !== 6;
  };
 
  /**
   * Gets a count of whole days between two dates.
   * @param start Start date.
   * @param end End date.
   * @returns number
   */
  static getDaysBetween = (start: Date, end: Date):number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + 1);

    if ( startDate.getTime() >= endDate.getTime() ) {
      return 0;
    }

    let count = 0;
    while ( startDate < endDate ) {
      if (this.isWorkday( startDate )) {
        count++;
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    return count;
  };
 
  /**
   * Checks to see if two dates are on the same day.
   * @param firstDate 
   * @param secondDate 
   * @returns boolean
   */
  static isSameDay = ( firstDate:Date, secondDate:Date ):boolean => {
    return firstDate.getDate() === secondDate.getDate() 
     && firstDate.getMonth() === secondDate.getMonth()
     && firstDate.getFullYear() === secondDate.getFullYear();
  };
 
  /**
   * Get the opening date time for a given date.
   * @param date 
   * @returns date
   */
  static getOpeningDate = (date:Date):Date => {
    const opening = new Date(date);
    opening.setUTCHours(9, 0, 0, 0);
    return opening;
  };
 
  /**
   * Get closing date time for a given date.
   * @param date 
   * @returns 
   */
  static getClosingDate = (date:Date):Date => {
    const closing = new Date(date);
    closing.setUTCHours(17, 0, 0, 0);
    return closing;
  };
 
  /**
   * Return the date or opening date time, whichever is greater.
   * @param date 
   * @returns Date
   */
  static getEarliestStartDate = (date: Date):Date => {
    const earliest = Math.max( date.getTime(), BusinessHours.getOpeningDate(date).getTime() );
    return new Date( earliest );
  };
 
  /**
   * Return the date or closing date time, whichever is less.
   * @param date 
   * @returns Date
   */
  static getLatestEndDate = (date: Date):Date => {
    const latest = Math.min( date.getTime(), BusinessHours.getClosingDate(date).getTime() );
    return new Date( latest );
  };
 
  /**
  * Get number of business hours between two dates and times.
  * @param start 
  * @param end 
  */
  static getNumberOfBusinessHours = (start:string, end:string):number => {
    const endDate = new Date( end );
    const startDate = new Date( start );

    if ( isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ) {
      throw new Error( 'Invalid dates');
    }

    const earliestStartDate = BusinessHours.getEarliestStartDate( startDate );
    const latestEndDate = BusinessHours.getLatestEndDate( endDate );
 
    if (BusinessHours.isSameDay(startDate, endDate)) {
      return BusinessHours.getHoursBetween( earliestStartDate, latestEndDate );
    }
 
    const startDayHours = BusinessHours.getHoursBetween( earliestStartDate, BusinessHours.getClosingDate( startDate ) );
    const endDayHours = BusinessHours.getHoursBetween( BusinessHours.getOpeningDate( endDate ), latestEndDate );
    const daysBetween = BusinessHours.getDaysBetween( startDate, endDate );
 
    return startDayHours + endDayHours + ( daysBetween * 8 );
  };
    
}
