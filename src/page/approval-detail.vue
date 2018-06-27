<template>
  <div style="min-height: 100%;">
    <menu-left routeIndex="9-2"></menu-left>
    <div class="approval-content">
      <div class="approval-header">动态 > 评论审批 > 未审批</div>
      <div class="approval-body">
        <div class="appro-content">
          <div>
            <div class="appro-content-title"><span>{{content.title}}</span><span>{{content.date}}</span></div>
            <p>{{content.mess}}</p>
            <img v-for="(item,index) in content.imgs" :key="index" :src="item.url">
          </div>
          <div class="hr"></div>
          <div class="approvals">
            <div class="appro-item" v-for="(ite,ind) in approvals" :key="ind">
              <img class="avatar" :src="ite.img">
              <div class="appro-info">
                <p><span>{{ite.nickname}}</span><span>手机号 ： {{ite.mobile}}</span></p>
                <p><span>{{ite.date}}</span></p>
                <p>{{ite.content}}</p>
              </div>
              <span class="pass button">通过</span>
              <span class="close button">关闭</span>
            </div>
          </div>
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
      content: {
        title: '智能计算，唤醒万物',
        date: '2018-12-12   23:23:33',
        mess: '便捷优雅 - 从PC时代的物理键盘鼠标到移动端时代手指，虽然输入设备极大精简，但是手指操作的准确性却大大不如键盘鼠标精确。为了适应这个变化，需要开发者在设计过程中充分利用手机特性，让用户便捷优雅的操控界面。\n' +
        '减少输入 - 由于手机键盘区域小且密集，输入困难的同时还易引起输入错误，因此在设计小程序页面时因尽量减少用户输入，利用现有接口或其他一些易于操作的选择控件来改善用户输入的体验。\n' +
        '例如下图中，在添加银行卡时，采用摄像头识别接口来帮助用户输入。除此之外微信团队还对外开放例如地理位置接口等多种微信小程序接口 ，充分利用这些接口将大大提高用户输入的效率和准确性，进而优化体验。\n' +
        '除了利用接口外，在不得不让用户进行手动输入时，应尽量让用户做选择而不是键盘输入。一方面，回忆易于记忆，让用户在有限的选项中做选择通常来说是容易于完全靠记忆输入；另一方面，仍然是考虑到手机键盘密集的单键输入极易造成输入错误。 例如图中，在用户搜索时提供搜索历史快捷选项将帮助用户快速进行搜索，而减少或避免不必要是键盘输入。\n' +
        '避免误操作 - 因为在手机上我们通过手指触摸屏幕来操控界面，手指的点击精确度远不如鼠标，因此在设计页面上需点击的控件时，需要充分考虑到其热区面积，避免由于可点击区域过小或过于密集而造成误操作。当简单的将原本在电脑屏幕上使用的界面不做任何适配直接移植到手机上时，往往就容易出现这样的问题。由于手机屏幕分辨率各不相同，因此最适宜点击像素尺寸也不完全一致，但换算成物理尺寸后大致是在7mm-9mm之间。在微信提供的标准组件库中，各种控件元素均已考虑到了页面点击效果以及不同屏幕的适配，因此再次推荐使用或模仿标准控件尺寸进行设计。\n' +
        '利用接口提升性能 - 微信设计中心已推出了一套网页标准控件库，包括 sketch设计控件库 和 Photoshop设计控件库，后续还将完善小程序组件，这些控件都已充分考虑了移动端页面的特点，能够保证其在移动端页面上的可用性和操作性能； 同时微信开发团队也在不断完善和扩充微信小程序接口，并提供微信公共库，利用这些资源不但能够为用户提供更加快捷的服务，而且对页面性能的提高有极大作用，无形之中提升了用户体验。\n' +
        '统一稳定 - 除了以上所提到的种种原则，建议接入微信的小程序还应该时刻注意不同页面间的统一性和延续性，在不同的页面尽量使用一致的控件和交互方式。\n' +
        '统一的页面体验和有延续性的界面元素都将帮助用最少的学习成本达成使用目标，减轻页面跳动所造成的不适感。正因如此，小程序可根据需要使用微信提供的标准控件，以达到统一稳定的目的。',
        imgs: [{
          url: 'http://imgsrc.baidu.com/imgad/pic/item/eaf81a4c510fd9f900630df72f2dd42a2834a43c.jpg'
        }, {
          url: 'http://imgsrc.baidu.com/imgad/pic/item/d439b6003af33a87589a973ccc5c10385343b525.jpg'
        }, {
          url: 'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=453c53fbfa1f3a294ec5dd8df14cd644/2cf5e0fe9925bc319508f3bd54df8db1cb1370ba.jpg'
        }]
      },
      approvals: [{
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 3,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！'
      }, {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 2,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！'
      }, {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 1,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
        replay: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵'
      }]
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
.approval-content {
  margin-left: 200px;
  margin-right: 20px;
  min-width: 1100px;
  padding-bottom: 20px;
  height: calc(100% - 20px);
  .approval-header {
    padding: 15px 20px;
    font-size: 12px;
    color: #888888;
    line-height: 16px;
  }
  .approval-body {
    min-width: 1100px;
    background: #ffffff;
    min-height: 90%;
    padding: 20px;
    .appro-content {
      box-sizing: border-box;
      border: 1px solid #D5D5D5;
      padding: 25px 20px 0px;
      font-size: 12px;
      color: #888888;
      line-height: 23px;
      .appro-content-title {
        span:first-child {
          font-size: 18px;
          color: #222222;
          font-weight: bold;
          margin-right: 20px;
        }
      }
      p {
        margin-top: 12px;
      }
      img {
        vertical-align: middle;
        margin-left: 10px;
        width: 90px;
        height: 60px;
        margin-top: 10px;
        &:nth-child(3) {
          margin-left: 0;
        }
      }
    }
    .hr {
      height: 2px;
      background: #D5D5D5;
      margin-top: 20px;
    }
    .approvals {
      .appro-item {
        padding: 20px 0;
        border-bottom: 1px dashed #d5d5d5;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 42px;
          vertical-align: top;
        }
        .appro-info {
          display: inline-block;
          margin-left: 15px;
          font-size: 12px;
          width: 90%;
          >p {
            margin-top: 10px;
            color: #222222;
            &:first-child {
              margin-top: 0;
              span:last-child {
                color: #888888;
                margin-left: 20px;
              }
            }
            &:nth-child(2) {
              color: #888888;
            }
          }
        }
        .button {
          display: inline-block;
          width: 80px;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          position: absolute;
          user-select: none;
          cursor: pointer;
        }
        .pass {
          border: 1px solid #FA505D;
          color: #FA505D;
          right: 120px;
        }
        .close {
          border: 1px solid #222222;
          color: #222222;
          right: 20px;
        }
      }
    }
  }
}
</style>
