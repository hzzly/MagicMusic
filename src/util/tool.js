import store from '../vuex/store'

export function toast(str) {
    store.dispatch('setShowAlertMsg', true)
    store.dispatch('setAlertMsg', str)
    setTimeout(() => {
        store.dispatch('setShowAlertMsg', false); 
    },1500);
}