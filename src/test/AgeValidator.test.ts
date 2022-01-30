import { AgeValidator } from '../services/AgeValidator';

describe('AgeValidator', () => {
  beforeAll(() => {
    jest
      .spyOn( Date, 'now' )
      .mockImplementation( () => 1643575554273 );
  });

  test('should get age from MM-DD-YYYY format', () => {
    expect(AgeValidator.getAge( '03-01-1985' )).toBe(36);
  });
  
  test('should get age from ISO 8601 format', () => {
    expect(AgeValidator.getAge( '2011-10-05T14:48:00.000Z' )).toBe(10);
  });

  test('should return 0 for a future date', () => {
    expect(AgeValidator.getAge( '2030-10-05T14:48:00.000Z' )).toBe(0);
  });

  test('should throw an error for an invalid date', () => {
    expect(() => AgeValidator.getAge( 'bad date' )).toThrowError('Invalid date');
  });

  test('should return false for birth dates less than 21 years ago', () => {
    expect(AgeValidator.validateDrinkingAge( '2013-10-05T14:48:00.000Z' )).toBeFalsy();
  });

  test('should return true for birth dates more than 21 years ago', () => {
    expect(AgeValidator.validateDrinkingAge( '1980-10-05T14:48:00.000Z' )).toBeTruthy();
  });
});