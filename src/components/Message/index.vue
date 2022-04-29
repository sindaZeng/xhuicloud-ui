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
  <div class="messages">
    <div class="message">
      <div class="message-icon">
        <xhui-svg icon="message"></xhui-svg>
      </div>
      <div class="message-content">
        <p>消息标题</p>
        <p>消息内容</p>
        <p>查看详情 ></p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.messages {
  position: relative;
  height: 100px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  box-shadow: -5px 5px 12px 0 rgba(204, 204, 204, .8);

  .message {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background: white;
    padding: 25px 15px 10px;

    &-icon {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      margin-top: 7px;

      :first-child {
        width: 2.5em;
        height: 2.5em;
      }
    }

    &-content {
      width: calc(100% - 44px);
    }
  }
}
</style>
