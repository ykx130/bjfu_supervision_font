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
          var flag = new Array(7);  //是否已填课程名
          flag.fill(0);  //未填
          for (var lesson in this.lessons) {
            for(var lesson_case in this.lessons[lesson].lesson_cases){
              var weekday = this.lessons[lesson].lesson_cases[lesson_case].lesson_weekday;
              let arr = [];  //节次
              let source = this.lessons[lesson].lesson_cases[lesson_case].lesson_time;
              for (let index = 0, len = source.length / 2; index < len; index++) {
                let subStr = source.substr(0, 2);
                arr.push(parseInt(subStr,10));
                source = source.replace(subStr, "");
              }
              if (weekday === 2){
                console.log(weekday);
                console.log(arr);
              }

              if (arr.indexOf(1) > -1 && arr.indexOf(2) > -1 && flag[0] === 0) {
                this.data[0][weekday] += this.lessons[lesson].lesson_name;
                this.data[0][weekday] += " ";
                flag[0] = 1;
              }
              if (arr.indexOf(3) > -1 && arr.indexOf(4) > -1 && flag[1] === 0) {
                this.data[1][weekday] += this.lessons[lesson].lesson_name;
                this.data[1][weekday] += " ";
                flag[1] = 1;
              }
              if (arr.indexOf(5) > -1 && flag[2] === 0) {
                this.data[2][weekday] += this.lessons[lesson].lesson_name;
                this.data[2][weekday] += " ";
                flag[2] = 1;
              }
              if (arr.indexOf(6) > -1 && arr.indexOf(7) > -1 && flag[3] === 0) {
                this.data[3][weekday] += this.lessons[lesson].lesson_name;
                this.data[3][weekday] += " ";
                flag[3] = 1;
              }
               if (arr.indexOf(8) > -1 && arr.indexOf(9) > -1 && flag[4] === 0) {
                this.data[4][weekday] += this.lessons[lesson].lesson_name;
                this.data[4][weekday] += " ";
                flag[4] = 1;
              }
               if (arr.indexOf(10) > -1 && arr.indexOf(11) > -1 && flag[5] === 0) {
                this.data[5][weekday] += this.lessons[lesson].lesson_name;
                this.data[5][weekday] += " ";
                flag[5] = 1;
              }
               if (arr.indexOf(12) > -1 && flag[6] === 0) {
                this.data[6][weekday] += this.lessons[lesson].lesson_name;
                this.data[6][weekday] += " ";
                flag[6] = 1;
              }
            }
            flag.fill(0);
          }
          console.log(this.lessons);
          console.log(this.data[3]);
          console.log(this.data[4]);
        });
      }
    }
</script>

<style scoped>

</style>
