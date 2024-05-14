<template>
  <div class="pagination">
    <button class="btn_prev" @click="prevPage" :disabled="currentPage === 1">
      <
    </button>
    <template v-if="totalPages <= 6">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="['page_btn', {active: page === currentPage}]"
      >
        {{ page }}
      </button>
    </template>
    <template v-else>
      <template v-if="currentPage <= 3">
        <template v-for="n in Math.min(3, totalPages)" :key="n">
          <button
            @click="changePage(n)"
            :class="['page_btn', {active: n === currentPage}]"
          >
            {{ n }}
          </button>
        </template>
        <span class="dots">...</span>
        <button
          :key="totalPages"
          @click="changePage(totalPages)"
          :class="['page_btn', {active: totalPages === currentPage}]"
        >
          {{ totalPages }}
        </button>
      </template>
      <template v-else-if="currentPage >= totalPages - 2">
        <button
          :key="1"
          @click="changePage(1)"
          :class="['page_btn', {active: 1 === currentPage}]"
        >
          {{ 1 }}
        </button>
        <span class="dots">...</span>
        <template
          v-for="n in Math.min(3, totalPages)"
          :key="totalPages - 3 + n"
        >
          <button
            @click="changePage(totalPages - 3 + n)"
            :class="['page_btn', {active: totalPages - 3 + n === currentPage}]"
          >
            {{ totalPages - 3 + n }}
          </button>
        </template>
      </template>
      <template v-else>
        <button
          :key="1"
          @click="changePage(1)"
          :class="['page_btn', {active: 1 === currentPage}]"
        >
          {{ 1 }}
        </button>
        <span class="dots">...</span>
        <button
          :key="currentPage - 1"
          @click="changePage(currentPage - 1)"
          :class="['page_btn', {active: currentPage - 1 === currentPage}]"
        >
          {{ currentPage - 1 }}
        </button>
        <button
          :key="currentPage"
          @click="changePage(currentPage)"
          :class="['page_btn', {active: currentPage === currentPage}]"
        >
          {{ currentPage }}
        </button>
        <button
          :key="currentPage + 1"
          @click="changePage(currentPage + 1)"
          :class="['page_btn', {active: currentPage + 1 === currentPage}]"
        >
          {{ currentPage + 1 }}
        </button>
        <span class="dots">...</span>
        <button
          :key="totalPages"
          @click="changePage(totalPages)"
          :class="['page_btn', {active: totalPages === currentPage}]"
        >
          {{ totalPages }}
        </button>
      </template>
    </template>
    <button
      class="btn_next"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      >
    </button>
  </div>
</template>

<script setup>
  import {ref, computed, watch} from 'vue';
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  });

  const emit = defineEmits(['pageChange']);

  const changePage = (page) => {
    emit('pageChange', page);
  };

  const prevPage = () => {
    if (props.currentPage > 1) {
      emit('pageChange', props.currentPage - 1);
    }
  };

  const nextPage = () => {
    if (props.currentPage < props.totalPages) {
      emit('pageChange', props.currentPage + 1);
    }
  };

  watch(
    () => props.totalPages,
    (newValue) => {
      if (props.currentPage > newValue) {
        emit('pageChange', Math.min(props.currentPage, newValue));
      }
    }
  );
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9px;
    margin-top: 30px;
  }
  .page_btn {
    font-size: 21px;
    outline: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid rgba(216, 216, 216);
  }

  .active {
    background-color: #00a6ff;
    border: 1px solid #00a6ff;
    color: #fff;
  }

  .btn_prev,
  .btn_next {
    font-size: 21px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid rgb(108, 106, 106);

    &:disabled {
      cursor: not-allowed;
    }
  }

  button {
    cursor: pointer;
  }

  .dots {
    color: #fff;
  }
</style>
