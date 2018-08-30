let last_moon_class = 5;
let last_aftermoon = 10;

function addPreZero(num){
  return ('000000000'+num).slice(-2);
}

export function splitLessonString(s_str) {
  let flag = 0;
  let res = [];
  for (flag; flag< s_str.length; flag = flag+2){
      res.push(s_str.slice(flag, flag+2))
  }
  return res
}
export function transTimeToSelectedData(lesson_time_str) {
  let lesson_times_single = splitLessonString(lesson_time_str).map((item)=>{return parseInt(item)}) //处理单节
  return lesson_times_single.map((item)=>{
    return {
      label: `第${item}节`,
      value: addPreZero(item)
    }
  })
}
