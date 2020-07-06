<template>
    <div>
        <!--Backdrop-->
        <div class="vs--backdrop" @click="close()" v-if="isOpen"></div>
        <!--\Backdrop-->

        <!--Sidenav-->
        <transition :name="'vs--slide-' + position">
            <div class="vs--sidenav" v-if="isOpen" :class="'vs--' + position" :style="'width:' + width + 'px'">
                <slot></slot>
            </div>
        </transition>
        <!--\Sidenav-->
    </div>
</template>

<script>
    export default {
        name: 'sidenav',
        props: {
            name: {
                type: String,
                required: true
            },
            position: {
                type: String,
                validator: val => ['right', 'left'].includes(val),
                default: 'left'
            },
            width: {
                type: [Number, String],
                default: 400,
            },
        },
        data: function () {
            return {
                isOpen: false
            }
        },
        beforeMount() {
            this.$sidenav.bus.$on('toggle', this.toggle)
        },
        beforeDestroy() {
            this.$sidenav.bus.$off('toggle');
        },
        methods: {
            toggle(name) {
                if (name !== this.name) {
                    return;
                }

                this.isOpen ? this.close() : this.open()
            },
            open() {
                this.$emit('before-open');

                document.body.style.overflow = "hidden";
                this.isOpen = true
            },
            close() {
                this.$emit('before-close');

                document.body.style.overflow = null;
                this.isOpen = false;
            }
        }
    }
</script>

<style scoped>
    .vs--sidenav {
        z-index: 9999;
        position: fixed;
        bottom: 0;
        top: 0;
        background: white;
        max-with: 100%
    }

    .vs--backdrop {
        z-index: 9998;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        visibility: visible;
        pointer-events: all;
        background: rgba(0, 0, 0, 0.5);
    }

    .vs--right {
        right: 0;
    }

    .vs--left {
        left: 0;
    }

    .vs--slide-left-enter-active,
    .vs--slide-right-enter-active {
        transition: all .3s ease;
    }

    .vs--slide-left-leave-active,
    .vs--slide-right-leave-active {
        transition: all .2s ease-in;
    }

    .vs--slide-left-enter,
    .vs--slide-left-leave-to {
        transform: translateX(-100%);
    }

    .vs--slide-right-enter,
    .vs--slide-right-leave-to {
        transform: translateX(100%);
    }
</style>
