import { BusinessHours } from '../services/BusinessHours';

describe('BusinessHours', () => {

  describe( 'getHoursBetween', () => {
    test('should return the number of hours between two dates on the same day', () => {
      const date1 = new Date( '2022-01-04T12:00:00.000Z' );
      const date2 = new Date( '2022-01-04T14:00:00.000Z' );
      expect(BusinessHours.getHoursBetween( date1, date2 )).toBe(2);
    });
        
    test('should return 0 when two dates on different days', () => {
      const date1 = new Date( '2022-01-01T12:00:00.000Z' );
      const date2 = new Date( '2022-01-02T14:00:00.000Z' );
      expect(BusinessHours.getHoursBetween( date1, date2 )).toBe(0);
    });
        
    test('should return 0 when date1 is greater than date2', () => {
      const date1 = new Date( '2022-01-02T12:00:00.000Z' );
      const date2 = new Date( '2022-01-01T14:00:00.000Z' );
      expect(BusinessHours.getHoursBetween( date1, date2 )).toBe(0);
    });
  } );

  describe( 'getDaysBetween', () => {
    test('should get whole days between 2 dates', () => {
      const date1 = new Date( '2022-01-03T12:00:00.000Z' );
      const date2 = new Date( '2022-01-07T14:00:00.000Z' );
      expect(BusinessHours.getDaysBetween( date1, date2 )).toBe(3);
    });
    
    test('should return 0 when no whole days exist between 2 dates', () => {
      const date1 = new Date( '2022-01-03T12:00:00.000Z' );
      const date2 = new Date( '2022-01-04T14:00:00.000Z' );
      expect(BusinessHours.getDaysBetween( date1, date2 )).toBe(0);
    });
    
    test('should return 0 when date1 is greater than date2', () => {
      const date1 = new Date( '2022-01-10T12:00:00.000Z' );
      const date2 = new Date( '2022-01-02T14:00:00.000Z' );
      expect(BusinessHours.getDaysBetween( date1, date2 )).toBe(0);
    });

    test('should not include weekend days', () => {
      const date1 = new Date( '2022-01-06T12:00:00.000Z' );
      const date2 = new Date( '2022-01-11T14:00:00.000Z' );
      expect(BusinessHours.getDaysBetween( date1, date2 )).toBe(2);
    });

    test('should not include weekend days across multiple weeks', () => {
      const date1 = new Date( '2022-01-02T12:00:00.000Z' );
      const date2 = new Date( '2022-01-24T14:00:00.000Z' );
      expect(BusinessHours.getDaysBetween( date1, date2 )).toBe(15);
    });
  } );

  describe( 'isSameDay', () => {
    test('should return true when dates are the same month, day, and year', () => {
      const date1 = new Date( '2022-01-02T12:00:00.000Z' );
      const date2 = new Date( '2022-01-02T14:00:00.000Z' );
      expect(BusinessHours.isSameDay( date1, date2 )).toBeTruthy();
    });
    
    test('should return false when dates on different days', () => {
      const date1 = new Date( '2022-01-10T12:00:00.000Z' );
      const date2 = new Date( '2022-01-02T14:00:00.000Z' );
      expect(BusinessHours.isSameDay( date1, date2 )).toBeFalsy();
    });
  } );

  describe( 'closing and opening times', () => {
    test('should get the opening date times for a given date', () => {
      const date = new Date( '2022-01-10T12:00:00.000Z' );
      expect(BusinessHours.getOpeningDate( date ).toISOString()).toBe('2022-01-10T09:00:00.000Z');
    });
    
    test('should get the closing date times for a given date', () => {
      const date = new Date( '2022-01-10T12:00:00.000Z' );
      expect(BusinessHours.getClosingDate( date ).toISOString()).toBe('2022-01-10T17:00:00.000Z');
    });

    test('should return the given date when later than opening', () => {
      const date = new Date( '2022-01-10T12:00:00.000Z' );
      expect(BusinessHours.getEarliestStartDate( date ).toISOString()).toBe('2022-01-10T12:00:00.000Z');
    });

    test('should return the opening date time', () => {
      const date = new Date( '2022-01-10T05:00:00.000Z' );
      expect(BusinessHours.getEarliestStartDate( date ).toISOString()).toBe('2022-01-10T09:00:00.000Z');
    });

    test('should return the given date when earlier than closing', () => {
      const date = new Date( '2022-01-10T15:00:00.000Z' );
      expect(BusinessHours.getLatestEndDate( date ).toISOString()).toBe('2022-01-10T15:00:00.000Z');
    });

    test('should return the closing date time', () => {
      const date = new Date( '2022-01-10T19:00:00.000Z' );
      expect(BusinessHours.getLatestEndDate( date ).toISOString()).toBe('2022-01-10T17:00:00.000Z');
    });
  } );

  describe( 'getBusinessHours', () => {
    test('should get the business hours on the same day', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-10T10:00:00.000Z', '2022-01-10T13:00:00.000Z' )).toBe(3);
    });

    test('should get the business hours within opening hours', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-10T05:00:00.000Z', '2022-01-10T19:00:00.000Z' )).toBe(8);
    });

    test('should get the business hours across two days', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-10T05:00:00.000Z', '2022-01-11T12:00:00.000Z' )).toBe(11);
    });

    test('should get the business hours across multiple days', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-10T05:00:00.000Z', '2022-01-14T12:00:00.000Z' )).toBe(35);
    });

    test('should get the business hours across weekends with no days between', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-07T05:00:00.000Z', '2022-01-10T12:00:00.000Z' )).toBe(11);
    });

    test('should get the business hours across weekends with extra days', () => {
      expect(BusinessHours.getNumberOfBusinessHours( '2022-01-06T05:00:00.000Z', '2022-01-10T12:00:00.000Z' )).toBe(19);
    });
  } );

});