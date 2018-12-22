let Toast = {};
Toast.install = function (Vue, options) {
  let opt = {
    defaultType: 'center', // 默认显示位置
    duration: '1500' // 持续时间
  }
  for (let property in options) {
    opt[property] = options[property]; // 使用 options 的配置
  }
  Vue.prototype.$toast = (tips, type) => {
      if (type) {
        opt.defaultType = type; // 如果有传type，位置则设为该type
      }
      if (document.getElementsByClassName('vue-toast').length) {
        // 如果toast还在，则不再执行
        return;
      }
      let toastTpl = Vue.extend({
        template: '<div class="vue-toast toast-' + opt.defaultType + '">' + tips + '</div>'
      });
      let tpl = new toastTpl().$mount().$el;
      console.log(tpl);
      document.body.appendChild(tpl);
      setTimeout(function () {
        document.body.removeChild(tpl);
      }, opt.duration)
    }
    ['bottom', 'center', 'top'].forEach(type => {
      Vue.prototype.$toast[type] = (tips) => {
        return Vue.prototype.$toast(tips, type)
      }
    })
}
export {
  Toast
}
