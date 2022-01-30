/**
 * Age validation service.
 */
export class AgeValidator {

  /**
   * Get an age from a given date of birth.
   * @param dateOfBirth Date of birth.
   * @returns 
   */
  static getAge = ( dateOfBirth:string ):number => {
    const dateOfBirthDate = new Date( dateOfBirth );

    if ( isNaN(dateOfBirthDate.getTime()) ) {
      throw new Error( 'Invalid date');
    }

    const dateDiff = Date.now() - dateOfBirthDate.getTime();
    const date = new Date(dateDiff);
    const age = date.getUTCFullYear() - 1970;
    return age > 0 ? age : 0;
  };
  
  /**
   * Check that a given date of borth is of drinking age.
   * @param dateOfBirth Date of birth.
   * @returns boolean
   */
  static validateDrinkingAge = (dateOfBirth:string):boolean => {
    return AgeValidator.getAge(dateOfBirth) >= 21;
  };
  
}
