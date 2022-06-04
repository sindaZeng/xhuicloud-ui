<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->

<template>
  <el-row align="middle">
    <el-col :xl="10" :lg="10">
      <h3 style="text-align: center; padding-bottom: 5px">{{ title1 }}</h3>
      <div class="list-contain">
        <ul class="infinite-list" style="overflow: auto">
          <draggable v-model="_list1" group="people" item-key="id">
            <template #item="{ element }">
              <li class="infinite-list-item" @click="deleteEle(element)">
                {{ element.name }} {{ element.comment == null ? '' : [element.comment] }}
              </li>
            </template>
          </draggable>
        </ul>
      </div>
    </el-col>
    <el-col :xl="3" :lg="3">
      <div class="list-contain-button">
        <el-button size="small" @click="pushAll()">
          <el-icon class="el-icon">
            <xh-svg icon="left"></xh-svg>
          </el-icon>
        </el-button>
        <el-button size="small" @click="deleteAll()">
          <el-icon class="el-icon">
            <xh-svg icon="right"></xh-svg>
          </el-icon>
        </el-button>
      </div>
    </el-col>
    <el-col :xl="10" :lg="10">
      <h3 style="text-align: center; padding-bottom: 5px">{{ title2 }}</h3>
      <div class="list-contain">
        <ul class="infinite-list" style="overflow: auto">
          <draggable v-model="_list2" group="people" item-key="id">
            <template #item="{ element }">
              <li class="infinite-list-item" @click="pushEle(element)">
                {{ element.name }} {{ element.comment == null ? '' : [element.comment] }}
              </li>
            </template>
          </draggable>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
  import draggable from 'vuedraggable'
  import { defineEmits, defineProps, ref, watch } from 'vue'

  const props = defineProps({
    title1: {
      type: String,
      default: '标题1'
    },
    title2: {
      type: String,
      default: '标题2'
    },
    list1: {
      type: Array,
      default: () => {
        return []
      }
    },
    list2: {
      type: Array,
      default: () => {
        return []
      }
    }
  })

  const emits = defineEmits(['update:list1', 'update:list2'])

  const _list1 = ref(props.list1)

  const _list2 = ref(props.list2)

  watch(
    _list1.value,
    () => {
      emits('update:list1', _list1.value)
      emits('update:list2', _list2.value)
    },
    {
      deep: true,
      immediate: true
    }
  )

  const isNotInList1 = (v) => {
    return _list1.value.every((k) => v.id !== k.id)
  }

  const isNotInList2 = (v) => {
    return _list2.value.every((k) => v.id !== k.id)
  }

  const deleteEle = (ele) => {
    for (const item of _list1.value) {
      if (item.id === ele.id) {
        const index = _list1.value.indexOf(item)
        _list1.value.splice(index, 1)
        break
      }
    }
    if (isNotInList2(ele)) {
      _list2.value.unshift(ele)
    }
  }

  const pushEle = (ele) => {
    for (const item of _list2.value) {
      if (item.id === ele.id) {
        const index = _list2.value.indexOf(item)
        _list2.value.splice(index, 1)
        break
      }
    }
    if (isNotInList1(ele)) {
      _list1.value.push(ele)
    }
  }

  const pushAll = () => {
    _list1.value = _list1.value.concat(_list2.value)
    _list2.value = []
  }

  const deleteAll = () => {
    _list2.value = _list2.value.concat(_list1.value)
    _list1.value = []
  }
</script>

<style lang="scss">
  .list-contain-button {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .list-contain {
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }

  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
</style>
