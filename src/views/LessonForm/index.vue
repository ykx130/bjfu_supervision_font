<template>
  <card>
    <h1>课程表</h1>
     <Table stripe border :columns="columns" :data="data"></Table>
  </card>
</template>

<script>
  import { getLessons } from '../../service/api/dqs'
    export default {
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
              align: 'center'
            },
            {
              title: '星期二',
              key: 2,
              align: 'center'
            },
            {
              title: '星期三',
              key: 3,
              align: 'center'
            },
            {
              title: '星期四',
              key: 4,
              align: 'center'
            },
            {
              title: '星期五',
              key: 5,
              align: 'center'
            },
            {
              title: '星期六',
              key: 6,
              align: 'center'
            },
            {
              title: '星期日',
              key: 7,
              align: 'center'
            }
          ],
          data: [],
          lessons: []
        }
      },
      mounted: function () {
        getLessons().then((resp) => {
          this.lessons = resp.data.lessons;
          this.data = [
            {
              period: '1-2',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '3-4',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '5',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '6-7',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '8-9',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '10-11',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            },
            {
              period: '12',
              1: '',
              2: '',
              3: '',
              4: '',
              5: '',
              6: '',
              7: ''
            }
          ];
          let flag = new Array(7);  //是否已填课程名
          for (let index = 0; index < 7; index++){
            flag[index] = new Array(7);  //flag[节次][星期]
            flag[index].fill(0);  //未填
          }
          for (let lesson in this.lessons) {
            let weeks = new Array(7); //用来拼接的周次
            let allWeek = new Array(7);  //所有周次
            for (let period = 0; period < 7; period++){
              weeks[period] = new Array(7);
              allWeek[period] = new Array(7);
              for (let day = 0; day < 7; day++){
                weeks[period][day] = new Array();  //weeks[节次][星期][第几周……]
                allWeek[period][day] = new Array();  //allWeek[节次][星期][第几周……]
              }
            }
            for (let lesson_case in this.lessons[lesson].lesson_cases){
              /* 拆分字符串获取节次 */
              let weekday = this.lessons[lesson].lesson_cases[lesson_case].lesson_weekday;
              let arr = [];  //节次
              let source = this.lessons[lesson].lesson_cases[lesson_case].lesson_time;
              for (let index = 0, len = source.length / 2; index < len; index++) {
                let subStr = source.substr(0, 2);
                arr.push(parseInt(subStr,10));
                source = source.replace(subStr, "");
              }
              /* 填写课程信息 */
              if (arr.indexOf(1) > -1 && arr.indexOf(2) > -1) {
                if (flag[0][weekday] === 0){
                  this.data[0][weekday] += this.lessons[lesson].lesson_name;
                  this.data[0][weekday] += ",";
                  this.data[0][weekday] += this.lessons[lesson].lesson_class;
                  this.data[0][weekday] += "班,";
                  flag[0][weekday] = 1;
                }
                /* 获取要拼接的周次 */
                allWeek[0][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[0][weekday].length === 1){
                  weeks[0][weekday].push(allWeek[0][weekday][0]);
                }
                if (allWeek[0][weekday].length > 1){
                  if (allWeek[0][weekday][allWeek[0][weekday].length - 1] - allWeek[0][weekday][allWeek[0][weekday].length - 2] !== 1){
                    weeks[0][weekday].push(allWeek[0][weekday][allWeek[0][weekday].length - 2]);
                    weeks[0][weekday].push(allWeek[0][weekday][allWeek[0][weekday].length - 1]);
                  }
                }
              }
              if (arr.indexOf(3) > -1 && arr.indexOf(4) > -1) {
                if (flag[1][weekday] === 0){
                  this.data[1][weekday] += this.lessons[lesson].lesson_name;
                  this.data[1][weekday] += ",";
                  this.data[1][weekday] += this.lessons[lesson].lesson_class;
                  this.data[1][weekday] += "班,";
                  flag[1][weekday] = 1;
                }
                allWeek[1][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[1][weekday].length === 1){
                  weeks[1][weekday].push(allWeek[1][weekday][0]);
                }
                if (allWeek[1][weekday].length > 1){
                  if (allWeek[1][weekday][allWeek[1][weekday].length - 1] - allWeek[1][weekday][allWeek[1][weekday].length - 2] !== 1){
                    weeks[1][weekday].push(allWeek[1][weekday][allWeek[1][weekday].length - 2]);
                    weeks[1][weekday].push(allWeek[1][weekday][allWeek[1][weekday].length - 1]);
                  }
                }
              }
              if (arr.indexOf(5) > -1) {
                if (flag[2][weekday] === 0){
                  this.data[2][weekday] += this.lessons[lesson].lesson_name;
                  this.data[2][weekday] += ",";
                  this.data[2][weekday] += this.lessons[lesson].lesson_class;
                  this.data[2][weekday] += "班,";
                  flag[2][weekday] = 1;
                }
                allWeek[2][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[2][weekday].length === 1){
                  weeks[2][weekday].push(allWeek[2][weekday][0]);
                }
                if (allWeek[2][weekday].length > 1){
                  if (allWeek[2][weekday][allWeek[2][weekday].length - 1] - allWeek[2][weekday][allWeek[2][weekday].length - 2] !== 1){
                    weeks[2][weekday].push(allWeek[2][weekday][allWeek[2][weekday].length - 2]);
                    weeks[2][weekday].push(allWeek[2][weekday][allWeek[2][weekday].length - 1]);
                  }
                }
              }
              if (arr.indexOf(6) > -1 && arr.indexOf(7) > -1) {
                if (flag[3][weekday] === 0){
                  this.data[3][weekday] += this.lessons[lesson].lesson_name;
                  this.data[3][weekday] += ",";
                  this.data[3][weekday] += this.lessons[lesson].lesson_class;
                  this.data[3][weekday] += "班,";
                  flag[3][weekday] = 1;
                }
                allWeek[3][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[3][weekday].length === 1){
                  weeks[3][weekday].push(allWeek[3][weekday][0]);
                }
                if (allWeek[3][weekday].length > 1){
                  if (allWeek[3][weekday][allWeek[3][weekday].length - 1] - allWeek[3][weekday][allWeek[3][weekday].length - 2] !== 1){
                    weeks[3][weekday].push(allWeek[3][weekday][allWeek[3][weekday].length - 2]);
                    weeks[3][weekday].push(allWeek[3][weekday][allWeek[3][weekday].length - 1]);
                  }
                }
              }
               if (arr.indexOf(8) > -1 && arr.indexOf(9) > -1) {
                if (flag[4][weekday] === 0){
                  this.data[4][weekday] += this.lessons[lesson].lesson_name;
                  this.data[4][weekday] += ",";
                  this.data[4][weekday] += this.lessons[lesson].lesson_class;
                  this.data[4][weekday] += "班,";
                  flag[4][weekday] = 1;
                }
                allWeek[4][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[4][weekday].length === 1){
                  weeks[4][weekday].push(allWeek[4][weekday][0]);
                }
                if (allWeek[4][weekday].length > 1){
                  if (allWeek[4][weekday][allWeek[4][weekday].length - 1] - allWeek[4][weekday][allWeek[4][weekday].length - 2] !== 1){
                    weeks[4][weekday].push(allWeek[4][weekday][allWeek[4][weekday].length - 2]);
                    weeks[4][weekday].push(allWeek[4][weekday][allWeek[4][weekday].length - 1]);
                  }
                }
              }
               if (arr.indexOf(10) > -1 && arr.indexOf(11) > -1) {
                if (flag[5][weekday] === 0){
                  this.data[5][weekday] += this.lessons[lesson].lesson_name;
                  this.data[5][weekday] += ",";
                  this.data[5][weekday] += this.lessons[lesson].lesson_class;
                  this.data[5][weekday] += "班,";
                  flag[5][weekday] = 1;
                }
                allWeek[5][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[5][weekday].length === 1){
                  weeks[5][weekday].push(allWeek[5][weekday][0]);
                }
                if (allWeek[5][weekday].length > 1){
                  if (allWeek[5][weekday][allWeek[5][weekday].length - 1] - allWeek[5][weekday][allWeek[5][weekday].length - 2] !== 1){
                    weeks[5][weekday].push(allWeek[5][weekday][allWeek[5][weekday].length - 2]);
                    weeks[5][weekday].push(allWeek[5][weekday][allWeek[5][weekday].length - 1]);
                  }
                }
              }
               if (arr.indexOf(12) > -1) {
                if (flag[6][weekday] === 0){
                  this.data[6][weekday] += this.lessons[lesson].lesson_name;
                  this.data[6][weekday] += ",";
                  this.data[6][weekday] += this.lessons[lesson].lesson_class;
                  this.data[6][weekday] += "班,";
                  flag[6][weekday] = 1;
                }
                allWeek[6][weekday].push(this.lessons[lesson].lesson_cases[lesson_case].lesson_week);
                if (allWeek[6][weekday].length === 1){
                  weeks[6][weekday].push(allWeek[6][weekday][0]);
                }
                if (allWeek[6][weekday].length > 1){
                  if (allWeek[6][weekday][allWeek[6][weekday].length - 1] - allWeek[6][weekday][allWeek[6][weekday].length - 2] !== 1){
                    weeks[6][weekday].push(allWeek[6][weekday][allWeek[6][weekday].length - 2]);
                    weeks[6][weekday].push(allWeek[6][weekday][allWeek[6][weekday].length - 1]);
                  }
                }
              }
            }
            /* 填周次信息 */
            for (let period = 0; period < 7; period++){
              for (let day = 0; day < 7; day++){
                if (flag[period][day] === 1){  //仅在有课程的时间段填写信息
                  weeks[period][day].push(allWeek[period][day][allWeek[period][day].length - 1]);
                  for (let index = 0; index < weeks[period][day].length - 1; index += 2){
                    if (weeks[period][day][index] === weeks[period][day][index + 1]){
                      this.data[period][day] += weeks[period][day][index];
                      if (index === weeks[period][day].length - 2){
                        this.data[period][day] += "周\n";
                      }
                      else{
                        this.data[period][day] += ",";
                      }
                    }
                    else{
                      this.data[period][day] += weeks[period][day][index];
                      this.data[period][day] += "-";
                      this.data[period][day] += weeks[period][day][index + 1];
                      if (index === weeks[period][day].length - 2){
                        this.data[period][day] += "周\n";
                      }
                      else{
                        this.data[period][day] += ",";
                      }
                    }
                  }
                }
              }
            }
            for (let period = 0; period < 7; period++){
              for (let day = 0; day < 7; day++) {
                weeks[period][day] = [];
                allWeek[period][day] = [];
              }
            }
            for (let index = 0; index < 7; index++){
              flag[index].fill(0);
            }
          }
        });
      }
    }
</script>

<style scoped>

</style>

