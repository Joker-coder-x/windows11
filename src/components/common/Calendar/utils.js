import solarLunar from 'solarlunar';

function getMonthMaxDay (month, year) {
  var date = new Date(),
      year = year === undefined ? date.getFullYear() : year,
      month = month === undefined ? date.getMonth() : month;

  return new Date(year, month + 1, 0).getDate();
}

function getMonthAllDateInfo (year, month) {
  var date = new Date(),
      year = year === undefined ? date.getFullYear() : year,
      month = month === undefined ? date.getMonth() : month,
      curMonthDay = getMonthMaxDay(month, year),
      allDateInfo = [];

  var _d = new Date(year, month);
  for (var i = 1; i <= curMonthDay; i ++) {
    _d.setDate(i);
    const lunarData = solarLunar.solar2lunar(year, month + 1, i);
    allDateInfo.push({
      day: i,
      month: month,
      year: year,
      weekday: _d.getDay(),
      dayCn: lunarData['term'] || lunarData['dayCn'],
      otherInfo: solarLunar.solar2lunar(year, month + 1, i)
    });
  }

  return allDateInfo;
}

export function genRangeDateList (year, month, totalDays = 42) {
  var _d = new Date(),
      year = year === undefined ? _d.getFullYear() : year,
      month = month === undefined ? _d.getMonth() : month,
      date = new Date(year, month, 1),
      curDay = date.getDay(),
      prevMonthDays = curDay - 1 < 0 ? 6 : curDay - 1,
      curMonthDay = getMonthMaxDay(month, year),
      nextMonthDays = totalDays - (curMonthDay + prevMonthDays),
      rangeDateList = [].concat(
        prevMonthDays === 0 ? [] : getMonthAllDateInfo(year, month - 1).slice(prevMonthDays * -1),
        getMonthAllDateInfo(year, month),
        nextMonthDays === 0 ? [] : getMonthAllDateInfo(year, month + 1).slice(0, nextMonthDays)
      );

  return rangeDateList;
}