(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueVaptcha = factory());
}(this, (function () { 'use strict';

  var loadV2Script = function loadV2Script() {
    if (typeof window.vaptcha === 'function') {
      return Promise.resolve();
    } else {
      return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = 'https://v.vaptcha.com/v3.js';
        script.async = true;

        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            resolve();
            script.onload = script.onreadystatechange = null;
          }
        };

        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }
  };
  var optionsMerge = function optionsMerge(target, source) {
    Object.keys(source).map(function (val, i) {
      target[val] = target[val] ? target[val] : source[val];
    });
  };

  var script = {
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
    data: function data() {
      return {
        vaptcha: null
      };
    },
    mounted: function mounted() {
      var this$1 = this;
      var config = {
        container: this.$refs.vaptcha,
        style: this.vpStyle
      };
      Object.assign(config, this.$props);
      this.$vaptcha && optionsMerge(config, this.$vaptcha.options);
      loadV2Script().then(function () {
        window.vaptcha(config).then(function (obj) {
          obj.listen("pass", function () {
            this$1.$emit("input", obj.getToken());
          });
          obj.render();
          this$1.vaptcha = obj;
        });
      });
    },
    destroyed: function destroyed() {
      var ref = this;
      var vaptcha = ref.vaptcha;
      vaptcha && vaptcha.destroy();
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }

  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';

        if (css.media) {
          style.element.setAttribute('media', css.media);
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;

        if (nodes[index]) {
          style.element.removeChild(nodes[index]);
        }

        if (nodes.length) {
          style.element.insertBefore(textNode, nodes[index]);
        } else {
          style.element.appendChild(textNode);
        }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "vaptcha" }, [_vm._m(0)])
  };
  var __vue_staticRenderFns__ = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "vaptcha-init-main" }, [
        _c("div", { staticClass: "vaptcha-init-loading" }, [
          _c(
            "a",
            { attrs: { href: "https://www.vaptcha.com/", target: "_blank" } },
            [
              _c("img", {
                attrs: { src: "https://cdn.vaptcha.com/vaptcha-loading.gif" }
              })
            ]
          ),
          _vm._v(" "),
          _c("span", { staticClass: "vaptcha-text" }, [
            _vm._v("VAPTCHA启动中...")
          ])
        ])
      ])
    }
  ];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-5dd09e92_0", { source: ".vaptcha-init-main {\n  display: table;\n  width: 100%;\n  height: 100%;\n  min-height: 36px;\n  background-color: #eeeeee;\n}\n.vaptcha-init-main .vaptcha-init-loading {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n.vaptcha-init-main .vaptcha-init-loading a {\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n}\n.vaptcha-init-main .vaptcha-init-loading a img {\n  vertical-align: middle;\n}\n.vaptcha-init-main .vaptcha-init-loading .vaptcha-text {\n  font-family: sans-serif;\n  font-size: 12px;\n  color: #cccccc;\n  vertical-align: middle;\n}\n", map: {"version":3,"sources":["Vaptcha.vue"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,yBAAyB;AAC3B;AACA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,WAAW;EACX,YAAY;AACd;AACA;EACE,sBAAsB;AACxB;AACA;EACE,uBAAuB;EACvB,eAAe;EACf,cAAc;EACd,sBAAsB;AACxB","file":"Vaptcha.vue","sourcesContent":[".vaptcha-init-main {\n  display: table;\n  width: 100%;\n  height: 100%;\n  min-height: 36px;\n  background-color: #eeeeee;\n}\n.vaptcha-init-main .vaptcha-init-loading {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n.vaptcha-init-main .vaptcha-init-loading a {\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n}\n.vaptcha-init-main .vaptcha-init-loading a img {\n  vertical-align: middle;\n}\n.vaptcha-init-main .vaptcha-init-loading .vaptcha-text {\n  font-family: sans-serif;\n  font-size: 12px;\n  color: #cccccc;\n  vertical-align: middle;\n}\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var Vaptcha = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    )

  var getInvisibleVaptcha = function getInvisibleVaptcha(config) {
    return function () {
      return new Promise(function (resolve, reject) {
        var options = Object.assign({
          type: 'invisible'
        }, config);
        loadV2Script().then(function () {
          window.vaptcha(options).then(function (vaptchaObj) {
            resolve(vaptchaObj);
          });
        });
      });
    };
  };

  function index (options) {
    return {
      install: function install(Vue) {
        Vue.prototype.$vaptcha = {
          options: options,
          getInvisibleVaptcha: getInvisibleVaptcha(options)
        };
        Vue.component(Vaptcha.name, Vaptcha);
      }
    };
  }

  return index;

})));
