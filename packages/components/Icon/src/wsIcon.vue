<template>
    <span class="ws-icon" :style="style">
      <slot></slot>
    </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { iconProps } from './wsIcon';

// 定义 props
const props = defineProps(iconProps);

// 计算样式
const style = computed(() => {
    return {
        ...(props.size ? { "font-size": props.size + 'px' } : {}),
        ...(props.color ? { color: props.color } : {})
    };
});


</script>
