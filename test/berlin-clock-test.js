'use strict'

import { expect as _expect } from 'chai'
import { BerlinClockConverter } from '../src/berlin-clock-converter.js'
import { it, describe } from 'mocha'
const expect = _expect

describe('BerlinClockConverter', function () {
  const parseTime = function (stringTime) {
    return new Date(Date.parse('Thu, 01 Jan 1970 ' + stringTime))
  }

  const berlinclockconverter = new BerlinClockConverter()
  const convertToBerlinTime = function (stringTime) {
    return berlinclockconverter.convert(parseTime(stringTime))
  }

  describe('Single Minutes Row', function () {
    const testCases = [
      { givenTime: '00:00:00', expectedBerlinTime: 'OOOO' },
      { givenTime: '23:59:59', expectedBerlinTime: 'YYYY' },
      { givenTime: '12:32:00', expectedBerlinTime: 'YYOO' },
      { givenTime: '12:34:00', expectedBerlinTime: 'YYYY' },
      { givenTime: '12:35:00', expectedBerlinTime: 'OOOO' }
    ]
    testCases.forEach(function (testCase) {
      it(
        'Time: ' + testCase.givenTime + ' => Row: ' + testCase.expectedBerlinTime,
        function () {
          const berlinTime = convertToBerlinTime(testCase.givenTime)
          expect(berlinTime.minutesRow).to.equal(testCase.expectedBerlinTime)
        }
      )
    })
  })

  describe('Five Minutes Row', function () {
    const testCases = [
      { givenTime: '00:00:00', expectedBerlinTime: 'OOOOOOOOOOO' },
      { givenTime: '23:59:59', expectedBerlinTime: 'YYRYYRYYRYY' },
      { givenTime: '12:04:00', expectedBerlinTime: 'OOOOOOOOOOO' },
      { givenTime: '12:23:00', expectedBerlinTime: 'YYRYOOOOOOO' },
      { givenTime: '12:35:00', expectedBerlinTime: 'YYRYYRYOOOO' }
    ]

    testCases.forEach(function (testCase) {
      it(
        'Time: ' + testCase.givenTime + ' => Row: ' + testCase.expectedBerlinTime,
        function () {
          const berlinTime = convertToBerlinTime(testCase.givenTime)
          expect(berlinTime.fiveMinutesRow).to.equal(testCase.expectedBerlinTime)
        }
      )
    })
  })

  describe('Single Hours Row', function () {
    const testCases = [
      { givenTime: '00:00:00', expectedBerlinTime: 'OOOO' },
      { givenTime: '23:59:59', expectedBerlinTime: 'RRRO' },
      { givenTime: '02:04:00', expectedBerlinTime: 'RROO' },
      { givenTime: '08:23:00', expectedBerlinTime: 'RRRO' },
      { givenTime: '14:35:00', expectedBerlinTime: 'RRRR' }
    ]
    testCases.forEach(function (testCase) {
      it(
        'Time: ' + testCase.givenTime + ' => Row: ' + testCase.expectedBerlinTime,
        function () {
          const berlinTime = convertToBerlinTime(testCase.givenTime)
          expect(berlinTime.hoursRow).to.equal(testCase.expectedBerlinTime)
        }
      )
    })
  })

  describe('Five Hours Row', function () {
    const testCases = [
      { givenTime: '00:00:00', expectedBerlinTime: 'OOOO' },
      { givenTime: '23:59:59', expectedBerlinTime: 'RRRR' },
      { givenTime: '02:04:00', expectedBerlinTime: 'OOOO' },
      { givenTime: '08:23:00', expectedBerlinTime: 'ROOO' },
      { givenTime: '16:35:00', expectedBerlinTime: 'RRRO' }
    ]
    testCases.forEach(function (testCase) {
      it(
        'Time: ' + testCase.givenTime + ' => Row: ' + testCase.expectedBerlinTime,
        function () {
          const berlinTime = convertToBerlinTime(testCase.givenTime)
          expect(berlinTime.fiveHoursRow).to.equal(testCase.expectedBerlinTime)
        }
      )
    })
  })

  describe('Seconds lamp', function () {
    it('The seconds lamp is illuminated on even seconds', function () {
      const berlinTime = convertToBerlinTime('00:00:00')
      expect(berlinTime.seconds).to.equal('Y')
    })
    it('The seconds lamp is of on odd seconds', function () {
      const berlinTime = convertToBerlinTime('23:59:59')
      expect(berlinTime.seconds).to.equal('O')
    })
  })

  describe('Entire Berlin Clock', function () {
    const testCases = [
      { givenTime: '00:00:00', expectedBerlinTime: 'YOOOOOOOOOOOOOOOOOOOOOOO' },
      { givenTime: '23:59:59', expectedBerlinTime: 'ORRRRRRROYYRYYRYYRYYYYYY' },
      { givenTime: '16:50:06', expectedBerlinTime: 'YRRROROOOYYRYYRYYRYOOOOO' },
      { givenTime: '11:37:01', expectedBerlinTime: 'ORROOROOOYYRYYRYOOOOYYOO' }
    ]
    testCases.forEach(function (testCase) {
      it(
        'Digital Time: ' +
          testCase.givenTime +
          ' => Berlin Time: ' +
          testCase.expectedBerlinTime,
        function () {
          const berlinTime = convertToBerlinTime(testCase.givenTime)
          expect(berlinTime.time).to.equal(testCase.expectedBerlinTime)
        }
      )
    })
  })
})
