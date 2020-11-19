<template>
  <div class="flex-container" id="login" :style="{height: screenHeight+'px'}">
    
      <canvas id="canvas" :style="{height: screenHeight+'px'}"></canvas>
      <div v-if="this.cookies == null || this.cookies == ''">
        <login></login>
      </div>
      
      <div v-else>
        <div class="article">
        <el-row>
          <el-col :span="8">
            <div  class="web_title">
            沥青数据综合平台
            </div>
          </el-col>
          <el-col :span="10">
            <el-menu mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                  <router-link to="/home">首页</router-link>
                </el-menu-item>
                <!-- <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu> -->
                <el-menu-item index="3">
                  <router-link to="/shipinfo">船只信息</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link to="/shipinfo">港口信息</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link to="/shipinfo">关于我们</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link to="/shipinfo">用户协议</router-link>
                </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="4">
            <div class="user" v-if="this.cookies">登录</div>
            <div class="user" v-else>退出</div>
          </el-col>
        </el-row>
        <el-row>
          <router-view></router-view>
        </el-row>
      </div>
    </div>
    </div>
</template>>


<script>
import login from './login'
  export default {
    name: "homemenu",
    data() {
      return {
        activeIndex: '',
        cookies: "",
        screenHeight: window.innerHeight, // 屏幕高度
        msg: 'Welcome to Your Vue.js App111'
      };
    },
    components:{
      login
    },
    watch: {
      'screenHeight': function (val) { // 监听屏幕高度变化
        var oIframe = document.getElementById('login')
        oIframe.style.height = Number(val) + 'px' // '120'是页面布局调整，可去除
        console.log("xxxxxxxxxxx", val)
      }
    },
    mounted () {
      this.PRequest("/test", {}, resdata =>{
        console.log("ssssssssssssss", resdata);
      })
      this.getCookie();
      var _this = this
      window.onresize = function () { // 定义窗口大小变更通知事件
        _this.screenHeight = document.documentElement.clientHeight // 窗口高度
      }
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var w = canvas.width = window.innerWidth
      var h = canvas.height = window.innerHeight
      var hue = 217
      var stars = []
      var count = 0
      var maxStars = 1300 // 星星数量

      var canvas2 = document.createElement('canvas')
      var ctx2 = canvas2.getContext('2d')
      canvas2.width = 100
      canvas2.height = 100
      var half = canvas2.width / 2
      var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
      gradient2.addColorStop(0.025, '#CCC')
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
      gradient2.addColorStop(1, 'transparent')

      ctx2.fillStyle = gradient2
      ctx2.beginPath()
      ctx2.arc(half, half, half, 0, Math.PI * 2)
      ctx2.fill()

      // End cache

      function random (min, max) {
        if (arguments.length < 2) {
          max = min
          min = 0
        }

        if (min > max) {
          var hold = max
          max = min
          min = hold
        }

        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      function maxOrbit (x, y) {
        var max = Math.max(x, y)
        var diameter = Math.round(Math.sqrt(max * max + max * max))
        return diameter / 2
        // 星星移动范围，值越大范围越小，
      }

      var Star = function () {
        this.orbitRadius = random(maxOrbit(w, h))
        this.radius = random(60, this.orbitRadius) / 100
        // 星星大小
        this.orbitX = w / 2
        this.orbitY = h / 2
        this.timePassed = random(0, maxStars)
        this.speed = random(this.orbitRadius) / 500000
        // 星星移动速度
        this.alpha = random(2, 10) / 10

        count++
        stars[count] = this
      }

      Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX
        var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY
        var twinkle = random(10)

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05
        }

        ctx.globalAlpha = this.alpha
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius)
        this.timePassed += this.speed
      }

      for (var i = 0; i < maxStars; i++) {
        /* eslint-disable no-new */
        new Star()
      }

      function animation () {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 0.5 // 尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter'
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw()
        };

        window.requestAnimationFrame(animation)
      }

      animation()
    },
    created () {
      // this.$http.get('/api/users').then((response) => {
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    methods: {
      addClass (val) {
        document.getElementById(val).style.color = 'black'
        // document.getElementById('register').style.color = 'black'
      },
      deleteClass (val) {
        document.getElementById(val).style.color = ''
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getCookie(){
        let sessionStorage = window.sessionStorage;
        this.cookies = sessionStorage.getItem("cookie");
        console.log("ccccccccccccc", typeof(this.cookies), this.cookies)
      }
    }
  }
</script>