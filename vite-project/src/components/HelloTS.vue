<template>
<div class="p-5">
    <div>
      <p>memo</p>
      <p>メモの合計：{{ countMemoNum }}</p>
    </div>
    <!-- テキスト入力 -->
    <input type="text" class="border" v-model="inputMemo">
    <button class="bg-gray-300 mx-5 p-1" @click="sendMemo()">送信</button>
    <!-- メモ表示 -->
    <div class="py-5 border">
        <div v-for="(memo, index) in memos" :key="index" class="border m-3">
            <div :name="index" class="p-3">{{ memo }}</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import db from "../firebase.js";

export default {
    //data()と違いsetupに入れた値はリアクティブにはならない。
    //setupに入れた値をv-modelなどでリアクティブに使いたい場合はrefを使用する。
    //setupの第一引数として渡したpropsはリアクティブ。

    setup(){
        const memos = ref<Array<String>>([]);
        const inputMemo = ref<String>("");

        //vue2時代のmethods
        //setupの中で基本的にthisは使えないのでsetupに定義された要素を使う。
        //refで生成した変数を操作するには.valueを用いて値にアクセスする
        const sendMemo = (): void => {
            memos.value.push(inputMemo.value);
            inputMemo.value = "";
        }

        onMounted(() => {
            db.collection("memos").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data().text);
                    memos.value.push(doc.data().text);
                })
            })
        }) 

        //computedもsetupに書く
        //computedを使う際はcomputedをimportしておく必要がある
        const countMemoNum = computed(() => {
            return memos.value.length;
        })

        return{
            memos,
            inputMemo,
            sendMemo,
            countMemoNum
        }
    },
}

//---------------------------------------------------------------

//vue2で書いた場合

//---------------------------------------------------------------
// export default {
//     data(){
//         return {
//             memos: [],
//             inputMemo: ""
//         }
//     },

//     computed: {
//         countMemoNum(){
//             return this.memos.length;
//         }
//     },

//     methods: {
//         sendMemo(){
//             this.memos.push(this.inputMemo);
//             this.inputMemo = "";
//         }
//     }
// }
</script>