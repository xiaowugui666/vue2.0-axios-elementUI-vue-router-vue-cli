<template>
    <div class="experience-setting plate">
      <div class="plate-top">小程序体验设置</div>
      <el-button @click="setWechat()" class="add-experience-users" type="success" size="small">添加</el-button>
      <div class="experience-setting-table">
        <el-table
          :data="experienceUsersList"
          border
          show-overflow-tooltip>
          <el-table-column
            prop="wechat_id"
            label="用户微信号">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="添加时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click="deleteWechat(scope.row.id, scope.row.wechat_id)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging-box" v-if="experienceUsersList.length>0">
          <el-pagination
            background
            prev-text="< 上一页"
            :page-size="1"
            next-text="下一页 >"
            :current-page="page+1"
            @current-change="changePage"
            layout="prev, pager, next"
            :total="totalPage">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import {mpaExperience} from '@/axios/api'
export default {
  data () {
    return {
      dialogVisible: false,
      experienceUsersList: [],
      totalPage: 1,
      page: 0
    }
  },
  created () {
    this.getMpaExperience()
  },
  methods: {
    // 获取体验用户列表
    getMpaExperience () {
      mpaExperience('get', {page: this.page}).then(res => {
        this.totalPage = parseInt(res.headers.page_count)
        this.experienceUsersList = res.data
      })
    },
    // 添加体验用户
    setWechat () {
      this.$prompt('微信号：', '添加体验用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
        inputErrorMessage: '微信号格式错误！'
      }).then(({ value }) => {
        // 添加小程序体验者
        mpaExperience('post', {wechat_id: value}).then(res => {
          // this.experienceUsersList.unshift(obj)
          this.page = 0
          this.getMpaExperience()
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      })
    },
    // 是否删除这个体验账号
    deleteWechat (id, wid) {
      this.$confirm(`确认删除此账号的体验权限？`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        mpaExperience('delete', {id: id, wechat_id: wid}).then(res => {
          this.page = 0
          this.getMpaExperience()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    // 分页
    changePage (val) {
      this.page = val - 1
      this.getMpaExperience()
    }
  }
}
</script>

<style scoped lang="less">
  .plate {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    color: @fMain;
    font-size: 12px;
    .plate-top {
      font-size: 14px;
      border-bottom: 2px solid #f5f5f5;
      padding-bottom: 20px;
      padding-left: 5px;
      &::before {
        content: '';
        display: block;
        float: left;
        width: 3px;
        height: 14px;
        margin-top: 3px;
        margin-right: 10px;
        background: @mainC;
      }
    }
  }
  .experience-setting {
    .add-experience-users {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .experience-setting-table {
      .el-table {
        font-size: 12px;
        text-align: center;
        color: #666;
        .profit {
          color: #DE5B67;
        }
        .loss {
          color: #6BA725;
        }
      }
      .paging-box {
        padding-top: 30px;
        padding-bottom: 10px;
      }
    }
  }
</style>
