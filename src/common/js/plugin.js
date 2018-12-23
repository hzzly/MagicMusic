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


let Loading = {}
Loading.install = function (Vue) {
  let tpl;
  Vue.prototype.$showLoading = () => {
    if (document.getElementsByClassName('vue-loaing').length) {
      return;
    }
		let loadingTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
			template: '<div class="vue-loaing"></div>'
    });
    tpl = new loadingTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
		document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
  }
  Vue.prototype.$hideLoading = () => {
    if (document.getElementsByClassName('vue-loaing').length) {
      document.body.removeChild(tpl);
    }
	}
}

export {
  Toast,
  Loading
}
