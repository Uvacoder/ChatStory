<template>
  <component
    v-bind="{ ...$attrs, mode }"
    :is="group ? 'transition-group' : 'transition'"
    :name="`slide-${direction}`"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'out-in',
    },
    direction: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value);
      },
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 300ms ease;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 300ms ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 300ms ease;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 300ms ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
