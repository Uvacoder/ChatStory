<template>
  <aside
    class="bg-white node-list h-full w-full absolute z-50 lg:relative md:w-72 p-5 overflow-auto scroll transition"
    :class="{ hide: !show }"
  >
    <div class="flex items-center space-x-4 justify-between mb-2">
      <h4 class="text-xl">Nodes</h4>
      <div class="flex-grow"></div>
      <ui-icon name="x" class="lg:hidden" @click="show = false"></ui-icon>
    </div>
    <ui-input v-model="searchQuery" block placeholder="Search" class="flex-1">
      <template #prepend>
        <ui-icon name="search"></ui-icon>
      </template>
    </ui-input>
    <div class="nodes mt-6 gap-2 grid grid-cols-2">
      <div
        v-for="node in nodes"
        :key="node.id"
        :data-node="node.id"
        style="cursor: grab"
        draggable="true"
        class="py-5 hover:bg-gray-100 rounded-xl select-none transition text-center bg-gray-50"
        @dragstart="dragHandler"
      >
        <ui-icon size="30" :class="node.textColor" :name="node.icon"></ui-icon>
        <p class="mt-2">{{ node.title }}</p>
      </div>
    </div>
  </aside>
</template>
<script>
import { ref, computed } from 'vue';
import emitter from 'tiny-emitter/instance';
import { nodes as nodesObj } from '@/utils/shared';

export default {
  setup() {
    const nodesArry = Object.keys(nodesObj).map((id) => {
      const { icon, title, description, textColor } = nodesObj[id];

      return {
        id,
        icon,
        title,
        description,
        textColor,
      };
    });

    const searchQuery = ref('');
    const show = ref(false);

    const nodes = computed(() => {
      return nodesArry.filter(
        ({ title, id }) =>
          title.toLowerCase().includes(searchQuery.value.toLowerCase()) && id !== 'start'
      );
    });

    function dragHandler({ dataTransfer, target }) {
      dataTransfer.setData('node', target.dataset.node);
      show.value = false;
    }

    emitter.on('show-nodes', () => {
      show.value = true;
    });

    return {
      show,
      nodes,
      dragHandler,
      searchQuery,
    };
  },
};
</script>
<style scoped>
.node-list.hide {
  transform: translateX(-100%);
}

@screen lg {
  .node-list {
    transform: none !important;
  }
}
</style>
