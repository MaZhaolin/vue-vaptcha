<template>
  <div ref="vaptcha">
    <div class="vaptcha-init-main">
      <div class="vaptcha-init-loading">
        <a href="https://www.vaptcha.com/" target="_blank">
          <img src="https://cdn.vaptcha.com/vaptcha-loading.gif">
        </a>
        <span class="vaptcha-text">VAPTCHA启动中...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { loadV2Script, optionsMerge } from "./util";

export default {
  name: "Vaptcha",
  props: {
    vid: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "click"
    },
    scene: {
      type: String,
      default: ""
    },
    vpStyle: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    lang: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      vaptcha: null
    };
  },
  mounted() {
    const config = {
      container: this.$refs.vaptcha,
      style: this.vpStyle
    };
    Object.assign(config, this.$props);
    this.$vaptcha && optionsMerge(config, this.$vaptcha.options);
    loadV2Script().then(() => {
      window.vaptcha(config).then(obj => {
        obj.listen("pass", () => {
          this.$emit("input", obj.getToken());
        });
        obj.render();
        this.vaptcha = obj;
      });
    });
  },
  destroyed() {
    const { vaptcha } = this;
    vaptcha && vaptcha.destroy();
  }
};
</script>

<style lang="less">
.vaptcha-init-main {
  display: table;
  width: 100%;
  height: 100%;
  min-height: 36px;
  background-color: #eeeeee;
  .vaptcha-init-loading {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    a {
      display: inline-block;
      width: 18px;
      height: 18px;
      img {
        vertical-align: middle;
      }
    }
    .vaptcha-text {
      font-family: sans-serif;
      font-size: 12px;
      color: #cccccc;
      vertical-align: middle;
    }
  }
}
</style>