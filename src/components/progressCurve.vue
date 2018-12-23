<template>
  <div class="progress-curve" ref="progressCurve" @click="progressClick">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
      <path :d="path" stroke="rgba(255, 255, 255, 0.4)" fill="none"></path>
      <path
        class="progress-bar"
        :d="path"
        stroke="#fff"
        fill="none"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      ></path>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.getPoint()
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.getPoint()
    })
  },
  data() {
    return {
      start: [0, 0],
      end: [0, 0],
      x: [0, 0],
      y: [0, 0],
      dashArray: Math.PI * 100
    }
  },
  computed: {
    path() {
      return `M${this.start[0]} ${this.start[1]} C ${this.x[0]} ${this.x[1]}, ${this.y[0]}  ${this.y[1]}, ${this.end[0]} ${this.end[1]}`
    },
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  },
  methods: {
    getPoint() {
      const clientWidth = document.body.clientWidth
      this.dashArray = Math.PI * (clientWidth/375*100)
      this.start = [clientWidth/10, clientWidth*0.13]
      this.end = [clientWidth-(clientWidth/10), clientWidth*0.13]
      this.x = [(clientWidth-(clientWidth/10))*0.4, -5]
      this.y = [(clientWidth-(clientWidth/10))*0.7, -5]
    },
    progressClick(e) {
      // const rect = this.$refs.progressCurve.getBoundingClientRect()
      // const offsetWidth = e.pageX - rect.left
      this.$toast('开发中，敬请期待...')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/function.scss";
.progress-curve {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: px2rem(40px);
  z-index: 110;
  svg {
    width: 100%;
    height: px2rem(100px);
    path {
      stroke-width: 2px;
      &.progress-bar {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: px2rem(40px);
          height: px2rem(40px);
          background: #000;
        }
      }
    }
  }
}
</style>