import Sidenav from "./Sidenav";

const VueSideNav = {
    install(Vue, options) {
        this.bus = new Vue;

        Vue.component(Sidenav.name, Sidenav);

        Vue.prototype.$sidenav = {
            get bus(){
              return VueSideNav.bus
            },
            toggle(name){
                VueSideNav.bus.$emit('toggle', name)
            }
        }
    }
};

export default VueSideNav;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSideNav)
}

