import Sidenav from "./Sidenav.vue";

const VueSidenav = {
    install(Vue, options) {
        this.bus = new Vue;

        Vue.component(Sidenav.name, Sidenav);

        Vue.prototype.$sidenav = {
            get bus(){
              return VueSidenav.bus
            },
            toggle(name){
                VueSidenav.bus.$emit('toggle', name)
            },
            open(name){
                VueSidenav.bus.$emit('open', name)
            },
            close(name){
                VueSidenav.bus.$emit('close', name)
            }
        }
    }
};

export default VueSidenav;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSidenav)
}

