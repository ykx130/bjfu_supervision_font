<template>
  <card>
    <h1>课程表</h1>
     <Table stripe border :columns="columns" :data="data"></Table>
  </card>
</template>

<script>
  import { getLessons } from '../../service/api/dqs'
  import lesson_grid from './components/lesson_grid'
    export default {
    components:{ lesson_grid },
      data () {
        return {
          columns: [
            {
              title: '#',
              key: 'period',
              align: 'center'
            },
            {
              title: '星期一',
              key: 1,
              align: 'center',
              render: function(h, params){
                return h(lesson_grid, {
                  props:{someLesson: params.row[1]}
                })
              }
            },
            {
              title: '星期二',
              key: 2,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[2]}
                })
              }
            },
            {
              title: '星期三',
              key: 3,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[3]}
                })
              }
            },
            {
              title: '星期四',
              key: 4,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[4]}
                })
              }
            },
            {
              title: '星期五',
              key: 5,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[5]}
                })
              }
            },
            {
              title: '星期六',
              key: 6,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[6]}
                })
              }
            },
            {
              title: '星期日',
              key: 7,
              align: 'center',
              render: (h, params)=>{
                return h(lesson_grid, {
                  props:{someLesson: params.row[7]}
                })
              }
            }
          ],
          data: [
            {
              period: '1-2',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '3-4',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '5',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '6-7',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '8-9',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '10-11',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            },
            {
              period: '12',
              1: [],
              2: [],
              3: [],
              4: [],
              5: [],
              6: [],
              7: []
            }
          ],
          lessons: []
        }
      },
      methods:{
        /* 获取要拼接的周次 */
        getWeek: function (lesson, weekday, period){
          let allWeeks = new Array();  //所有周次
          let week = new Array(); //用来拼接的周次
          for (let eachCase in this.lessons[lesson].lesson_cases){
            if (this.lessons[lesson].lesson_cases[eachCase].lesson_weekday === weekday
              && this.lessons[lesson].lesson_cases[eachCase].lesson_time.indexOf(period) > -1)
            {
              allWeeks.push(this.lessons[lesson].lesson_cases[eachCase].lesson_week);
            }
          }
          if (allWeeks.length === 1) {
            week.push(allWeeks[0]);
            week.push(allWeeks[0]);  //推两个进去
          }
          if (allWeeks.length > 1) {
            week.push(allWeeks[0]);
            for (let index = 1; index < allWeeks.length; index++){
              if (allWeeks[index] - allWeeks[index - 1] !== 1) {
                week.push(allWeeks[index - 1]);
                week.push(allWeeks[index]);
              }
            }
            week.push(allWeeks[allWeeks.length - 1]);
          }
          return week;
        }
      },
      mounted: function () {
        getLessons().then((resp) => {
          this.lessons = resp.data.lessons;
          let flag = new Array(7);  //是否已填课程名
          for (let index = 0; index < 7; index++){
            flag[index] = new Array(7);  //flag[节次][星期]
            flag[index].fill(0);  //未填
          }
          for (let lesson in this.lessons) {
            for (let lesson_case in this.lessons[lesson].lesson_cases) {
              let weekday = this.lessons[lesson].lesson_cases[lesson_case].lesson_weekday;
              let time = this.lessons[lesson].lesson_cases[lesson_case].lesson_time;
              if (time.indexOf("0102") > -1) {
                if (flag[0][weekday] === 0) {
                  this.data[0][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[0][weekday][this.data[0][weekday].length - 1].week = this.getWeek(lesson, weekday, '0102');
                  flag[0][weekday] = 1;
                }
              }
              if (time.indexOf("0304") > -1) {
                if (flag[1][weekday] === 0) {
                  this.data[1][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[1][weekday][this.data[1][weekday].length - 1].week = this.getWeek(lesson, weekday, '0304');
                  flag[1][weekday] = 1;
                }
              }
              if (time.indexOf("05") > -1) {
                if (flag[2][weekday] === 0) {
                  this.data[2][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[2][weekday][this.data[2][weekday].length - 1].week = this.getWeek(lesson, weekday, '05');
                  flag[2][weekday] = 1;
                }
              }
              if (time.indexOf("0607") > -1) {
                if (flag[3][weekday] === 0) {
                  this.data[3][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[3][weekday][this.data[3][weekday].length - 1].week = this.getWeek(lesson, weekday, '0607');
                  flag[3][weekday] = 1;
                }
              }
              if (time.indexOf("0809") > -1) {
                if (flag[4][weekday] === 0) {
                  this.data[4][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[4][weekday][this.data[4][weekday].length - 1].week = this.getWeek(lesson, weekday, '0809');
                  flag[4][weekday] = 1;
                }
              }
              if (time.indexOf("1011") > -1) {
                if (flag[5][weekday] === 0) {
                  this.data[5][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[5][weekday][this.data[5][weekday].length - 1].week = this.getWeek(lesson, weekday, '1011');
                  flag[5][weekday] = 1;
                }
              }
              if (time.indexOf("12") > -1) {
                if (flag[6][weekday] === 0) {
                  this.data[6][weekday].push(JSON.parse(JSON.stringify(this.lessons[lesson])));
                  this.data[6][weekday][this.data[6][weekday].length - 1].week = this.getWeek(lesson, weekday, '12');
                  flag[6][weekday] = 1;
                }
              }
            }
            for (let index = 0; index < 7; index++) {
              flag[index].fill(0);
            }
          }
        });
      }
    }
</script>

<style scoped>

</style>

