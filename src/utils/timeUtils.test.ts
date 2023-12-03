import {
  getDaysFromTheBeginningAndEndOfTheMonth,
  getListOfDaysFromTheBeginningOrEndOfTheMonth,
  getListOfDaysInMonth,
  mapDaysToStateStructure,
} from './timeUtils'

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}))

describe('getListOfDaysFromTheBeginningOrEndOfTheMonth', () => {
  it('should return a list of days from the beginning of the month', () => {
    expect(
      getListOfDaysFromTheBeginningOrEndOfTheMonth(
        'beginning',
        new Date('2023-11-01'),
        5,
      ),
    ).toEqual([1, 2, 3, 4, 5])
  })
  it('should return a list of days from the end of the month', () => {
    expect(
      getListOfDaysFromTheBeginningOrEndOfTheMonth(
        'end',
        new Date('2023-11-01'),
        5,
      ),
    ).toEqual([27, 28, 29, 30, 31])
  })

  it('should make list of days out of number', () => {
    expect(getListOfDaysInMonth(new Date('2023-11-01'))).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ])
  })

  it('should make list of days with days from previous and next month assuming that month starts on Monday', () => {
    expect(
      getDaysFromTheBeginningAndEndOfTheMonth(0, new Date('2024-01-01')),
    ).toEqual([
      ...mapDaysToStateStructure(
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        false,
        false,
        0,
        2024,
      ),
      ...mapDaysToStateStructure(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        false,
        true,
        1,
        2024,
      ),
    ])
  })

  it('should make list of days with days from previous and next month assuming that month starts on Wednesday', () => {
    expect(
      getDaysFromTheBeginningAndEndOfTheMonth(2, new Date('2023-11-01')),
    ).toEqual([
      ...mapDaysToStateStructure([30, 31], false, true, 9, 2023),
      ...mapDaysToStateStructure(
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
        false,
        false,
        10,
        2023,
      ),
      ...mapDaysToStateStructure(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        false,
        true,
        11,
        2023,
      ),
    ])
  })

  it('should make list of days with days from previous and next month assuming that month starts on Sunday', () => {
    expect(
      getDaysFromTheBeginningAndEndOfTheMonth(6, new Date('2024-09-01')),
    ).toEqual([
      ...mapDaysToStateStructure(
        [26, 27, 28, 29, 30, 31],
        false,
        true,
        7,
        2024,
      ),
      ...mapDaysToStateStructure(
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
        false,
        false,
        8,
        2024,
      ),
      ...mapDaysToStateStructure([1, 2, 3, 4, 5, 6], false, true, 9, 2024),
    ])
  })
})
