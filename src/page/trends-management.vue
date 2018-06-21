<template>
  <div>
    <menu-left routeIndex="9-1"></menu-left>
    <div class="trends-content">
      <div class="trends-header">
        <div>
          <span>关键字</span>
          <input type="text" v-model="keyWord">
        </div>
        <div>
          <span>发布时间</span>
          <el-date-picker
            @change="changeTime"
            v-model="keyTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      keyTime: [],
      keyWord: ''
    }
  },
  methods: {
    changeTime (value) {
      console.log(value)
      console.log(1111)
    }
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style lang="less">
.trends-content{
  .el-date-editor .el-range__icon {
    display: none;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 230px;
  }
  .el-date-editor .el-range__close-icon {
    line-height: 23px;
  }
  .el-select .el-input .el-select__caret {
    line-height: 30px;
  }
  .el-date-editor .el-range-input{
    width: 43%;
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
    border-radius: 0;
  }
  .el-input--suffix .el-input__inner {
    padding:0 12px;
    font-size: 12px;
    color: @b3;
    line-height: 15px;
  }
  .el-date-editor .el-range-separator {
    line-height: 23px;
  }
}
</style>
<style scoped lang="less">
.trends-content {
  min-width: 1000px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
  .trends-header {
    min-width: 1000px;
    height: 55px;
    padding-top: 25px;
    background: #FFFFFF;
    >div {
      float: left;
    }
    span {
      font-size: 12px;
      color: #888888;
      margin-left: 20px;
      margin-right: 8px;
    }
    input {
      width: 246px;
      height: 30px;
      border: 1px solid #D5D5D5;
      border-radius: 2px;
      padding-left: 10px;
    }
  }
}
</style>
