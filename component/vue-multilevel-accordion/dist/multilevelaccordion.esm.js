//

var script = {
  name: "multilevel-accordion-children",
  props: {
    tree: {
      type: Object
    },
    reference: {
      type: String,
      required: true
    },
    interleaveOffset: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    marginLeft: {
      type: Number,
      default: 0
    },
    marginRight: {
      type: Number,
      default: 0
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MultilevelAccordionChildren: __vue_component__
  },
  data: function data() {
    return {
      panelStyle: "",
      interleaved: ((this.interleaveOffset % 2) + this.position) % 2 == 0,
      expanded: false
    };
  },
  methods: {
    togglePanel: function togglePanel() {
      if (!this.expanded) {
        this.expand();
      } else {
        this.shrink();
      }
    },
    expand: function expand() {
      if (this.leaf) { return null; }
      if (!this.expanded) {
        var el = this.$refs[("panel-" + (this.reference))];
        this.panelStyle = "max-height: " + (el.scrollHeight) + "px;";
        this.expanded = true;
        // Inform to the parent the new height so it can re calculate its scroll height
        this.$emit("updateHeight", el.scrollHeight);
      }
    },
    shrink: function shrink() {
      if (this.leaf) { return null; }
      this.panelStyle = "max-height: 0px;";
      this.expanded = false;
    },
    updateHeight: function updateHeight(childrenHeight) {
      // Recalculate scroll height based on childrens height modification
      if (this.expanded) {
        var el = this.$refs[("panel-" + (this.reference))];
        this.panelStyle = "max-height: " + (el.scrollHeight + childrenHeight) + "px;";
        this.$emit("updateHeight", el.scrollHeight + childrenHeight);
      }
    }
  },
  computed: {
    leaf: function leaf() {
      // Override by user
      if (this.tree.leaf != undefined) { return this.tree.leaf; }
      if (this.tree.children == undefined) { return true; }
      return this.tree.children.length == 0;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
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
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "accordion-children" }, [
    _c("li", [
      _c(
        "div",
        {
          class: "" + (_vm.rtl ? "accordion-rtl" : "accordion"),
          on: {
            click: function($event) {
              return _vm.togglePanel()
            }
          }
        },
        [
          _vm._t("default", null, {
            tree: _vm.tree,
            interleaved: _vm.interleaved,
            expanded: _vm.expanded,
            level: _vm.level,
            leaf: _vm.leaf
          })
        ],
        2
      ),
      _vm._v(" "),
      !_vm.leaf
        ? _c(
            "div",
            {
              ref: "panel-" + _vm.reference,
              staticClass: "panel expandible panel-transition",
              style: _vm.panelStyle
            },
            [
              _c(
                "ul",
                {
                  style:
                    "margin-left: " +
                    _vm.marginLeft +
                    "rem; margin-right: " +
                    _vm.marginRight +
                    "rem;"
                },
                _vm._l(_vm.tree.children, function(child, index) {
                  return _c("multilevel-accordion-children", {
                    key: index,
                    ref: "childs-" + _vm.reference,
                    refInFor: true,
                    attrs: {
                      tree: child,
                      reference: _vm.reference + "-" + index,
                      position: index,
                      interleaveOffset: _vm.interleaveOffset + _vm.position + 1,
                      level: _vm.level + 1,
                      marginLeft: _vm.marginLeft,
                      marginRight: _vm.marginRight,
                      rtl: _vm.rtl
                    },
                    on: { updateHeight: _vm.updateHeight },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(_) {
                            return [
                              _vm._t("default", null, {
                                tree: _.tree,
                                interleaved: _.interleaved,
                                expanded: _.expanded,
                                level: _.level,
                                leaf: _.leaf
                              })
                            ]
                          }
                        }
                      ],
                      null,
                      true
                    )
                  })
                }),
                1
              )
            ]
          )
        : _vm._e()
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-77947cbc_0", { source: "\n.accordion[data-v-77947cbc] {\n  text-align: left;\n}\n.accordion-rtl[data-v-77947cbc] {\n  text-align: right;\n}\n.panel[data-v-77947cbc] {\n  max-height: 0;\n  overflow: hidden;\n}\n.panel-transition[data-v-77947cbc] {\n  transition: max-height 0.2s ease-out;\n}\n", map: {"version":3,"sources":["/home/abdelsalam/WebstormProjects/vue-multilevel-accordion/component/vue-multilevel-accordion/src/MultilevelAccordionChildren.vue"],"names":[],"mappings":";AAmJA;EACA,gBAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,aAAA;EACA,gBAAA;AACA;AAEA;EACA,oCAAA;AACA","file":"MultilevelAccordionChildren.vue","sourcesContent":["<template>\n  <div class=\"accordion-children\">\n    <li>\n      <!-- Upper Tab -->\n      <div\n        :class=\"`${rtl ? 'accordion-rtl':'accordion'}`\"\n        @click=\"togglePanel()\"\n      >\n        <slot\n          :tree=\"tree\"\n          :interleaved=\"interleaved\"\n          :expanded=\"expanded\"\n          :level=\"level\"\n          :leaf=\"leaf\"\n        ></slot>\n      </div>\n\n      <!-- Expandible Elements -->\n      <div\n        v-if=\"!leaf\"\n        class=\"panel expandible panel-transition\"\n        :ref=\"`panel-${reference}`\"\n        :style=\"panelStyle\"\n      >\n        <ul :style=\"`margin-left: ${marginLeft}rem; margin-right: ${marginRight}rem;`\">\n          <multilevel-accordion-children\n            v-for=\"(child, index) in tree.children\"\n            :key=\"index\"\n            :tree=\"child\"\n            :reference=\"`${reference}-${index}`\"\n            :ref=\"`childs-${reference}`\"\n            :position=\"index\"\n            :interleaveOffset=\"interleaveOffset + position + 1\"\n            :level=\"level + 1\"\n            :marginLeft=\"marginLeft\"\n            :marginRight=\"marginRight\"\n            :rtl=\"rtl\"\n            @updateHeight=\"updateHeight\"\n          >\n            <template slot-scope=\"_\">\n              <slot\n                :tree=\"_.tree\"\n                :interleaved=\"_.interleaved\"\n                :expanded=\"_.expanded\"\n                :level=\"_.level\"\n                :leaf=\"_.leaf\"\n              ></slot>\n            </template>\n          </multilevel-accordion-children>\n        </ul>\n      </div>\n    </li>\n  </div>\n</template>\n\n<script>\nimport MultilevelAccordionChildren from \"./MultilevelAccordionChildren.vue\";\n\nexport default {\n  name: \"multilevel-accordion-children\",\n  props: {\n    tree: {\n      type: Object\n    },\n    reference: {\n      type: String,\n      required: true\n    },\n    interleaveOffset: {\n      type: Number,\n      required: true\n    },\n    position: {\n      type: Number,\n      required: true\n    },\n    level: {\n      type: Number,\n      required: true\n    },\n    marginLeft: {\n      type: Number,\n      default: 0\n    },\n    marginRight: {\n      type: Number,\n      default: 0\n    },\n    rtl: {\n      type: Boolean,\n      default: false\n    }\n  },\n  components: {\n    MultilevelAccordionChildren\n  },\n  data() {\n    return {\n      panelStyle: \"\",\n      interleaved: ((this.interleaveOffset % 2) + this.position) % 2 == 0,\n      expanded: false\n    };\n  },\n  methods: {\n    togglePanel() {\n      if (!this.expanded) {\n        this.expand();\n      } else {\n        this.shrink();\n      }\n    },\n    expand() {\n      if (this.leaf) return null;\n      if (!this.expanded) {\n        let el = this.$refs[`panel-${this.reference}`];\n        this.panelStyle = `max-height: ${el.scrollHeight}px;`;\n        this.expanded = true;\n        // Inform to the parent the new height so it can re calculate its scroll height\n        this.$emit(\"updateHeight\", el.scrollHeight);\n      }\n    },\n    shrink() {\n      if (this.leaf) return null;\n      this.panelStyle = \"max-height: 0px;\";\n      this.expanded = false;\n    },\n    updateHeight(childrenHeight) {\n      // Recalculate scroll height based on childrens height modification\n      if (this.expanded) {\n        let el = this.$refs[`panel-${this.reference}`];\n        this.panelStyle = `max-height: ${el.scrollHeight + childrenHeight}px;`;\n        this.$emit(\"updateHeight\", el.scrollHeight + childrenHeight);\n      }\n    }\n  },\n  computed: {\n    leaf() {\n      // Override by user\n      if (this.tree.leaf != undefined) return this.tree.leaf;\n      if (this.tree.children == undefined) return true;\n      return this.tree.children.length == 0;\n    }\n  }\n};\n</script>\n\n<style scoped>\n.accordion {\n  text-align: left;\n}\n\n.accordion-rtl {\n  text-align: right;\n}\n\n.panel {\n  max-height: 0;\n  overflow: hidden;\n}\n\n.panel-transition {\n  transition: max-height 0.2s ease-out;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-77947cbc";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$1 = {
  props: {
    tree: {
      type: Object
    },
    marginLeft: {
      type: Number,
      default: 0
    },
    marginRight: {
      type: Number,
      default: 0
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MultilevelAccordionChildren: __vue_component__
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "accordion-root" }, [
    _c(
      "ul",
      { staticClass: "list-root" },
      _vm._l(_vm.tree.children, function(child, index) {
        return _c("multilevel-accordion-children", {
          key: index,
          attrs: {
            tree: child,
            position: index,
            interleaveOffset: 1,
            reference: "" + index,
            level: 0,
            marginLeft: _vm.marginLeft,
            marginRight: _vm.marginRight,
            rtl: _vm.rtl
          },
          scopedSlots: _vm._u(
            [
              {
                key: "default",
                fn: function(_) {
                  return [
                    _vm._t("default", null, {
                      tree: _.tree,
                      interleaved: _.interleaved,
                      expanded: _.expanded,
                      level: _.level,
                      leaf: _.leaf
                    })
                  ]
                }
              }
            ],
            null,
            true
          )
        })
      }),
      1
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('MultilevelAccordion', __vue_component__$1);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__$1;
export { install };
