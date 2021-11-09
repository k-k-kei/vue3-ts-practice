<template>
<div class="p-5">
    <div>
      <p>memo</p>
    </div>
    <input type="text" class="border" v-model="inputMemo">
    <button class="bg-gray-300 mx-5 p-1" @click="sendMemo()">送信</button>
    <div class="py-5 border">
        <div v-for="(memo, index) in memos" :key="index" class="border m-3">
            <div :name="index" class="p-3">{{ memo }}</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    //data()と違いsetupに入れた値はリアクティブにはならない。
    //setupに入れた値をv-modelなどでリアクティブに使いたい場合はrefを使用する。
    setup(){
        const memos = ref<Array<String>>([]);
        const inputMemo = ref<String>("");

        //vue2時代のmethods
        //setupの中で基本的にthisは使えないのでsetupに定義された要素を使う。
        const sendMemo = (): void => {
            memos.value.push(inputMemo.value);
            inputMemo.value = "";
        }

        return{
            memos,
            inputMemo,
            sendMemo
        }
    },
}
</script>


