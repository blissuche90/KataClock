class BerlinClockConverter {
  convert (dateTime) {
    const berlinTime = {
      minutesRow: convertMinutes(dateTime.getMinutes()),
      fiveMinutesRow: fiveMinutesRow(dateTime.getMinutes()),
      hoursRow: convertHours(dateTime.getHours()),
      fiveHoursRow: fiveHoursRow(dateTime.getHours()),
      seconds: (dateTime.getSeconds() % 2) === 0 ? 'Y' : 'O'
    }
    berlinTime.time =
      berlinTime.seconds +
      berlinTime.fiveHoursRow +
      berlinTime.hoursRow +
      berlinTime.fiveMinutesRow +
      berlinTime.minutesRow
    return berlinTime
  }
}

const convertMinutes = function (minutes) {
  let reminder = minutes % 5
  return Array(4).fill()
    .map(() => reminder-- > 0 ? 'Y' : 'O')
    .join('')
}

const convertHours = function (hours) {
  let reminder = hours % 5
  return Array(4).fill()
    .map(() => reminder-- > 0 ? 'R' : 'O')
    .join('')
}

const fiveMinutesRow = function (minutes) {
  let blocks = Math.floor(minutes / 5)
  return Array(11).fill()
    .map((_, index) => {
      return (blocks-- > 0)
        ? (((index + 1) % 3) === 0 ? 'R' : 'Y')
        : 'O'
    })
    .join('')
}
const fiveHoursRow = function (hours) {
  let blocks = Math.floor(hours / 5)
  return Array(4).fill()
    .map(() => (blocks-- > 0) ? 'R' : 'O')
    .join('')
}

export { BerlinClockConverter }
