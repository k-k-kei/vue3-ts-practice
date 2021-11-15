<template>
    <div>

<section class="text-gray-600 body-font">
  <div v-for="(beer, index) in beerDetail" :key="index" class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div class="mb-10">
    <img class="w-2/6 ml-32" alt="beer" :src="beer.image_url">
    </div>
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{{ beer.tagline }}</h1>
      <p class="mb-8 leading-relaxed">{{ beer.description }}</p>
    </div>
  </div>
</section>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import { getBeerData } from '../../../composable/getBeerData';
import { useRoute } from 'vue-router'


export default defineComponent({
  setup() {
    //クリックされたアイテムのルートパスを取得
    const route = useRoute();
    const id = computed(() => route.params.id)

    const beerDetail = ref<Array<String>>([]);

    // クリックされたアイテムのidを用いてデータを一つに絞り込む
    const getBeerDetail = async () => {
        //composableで切り出した関数getBeerDataを使用
        const beerData = await getBeerData();

        //同じidのデータのみ取得
        beerData.forEach((el: any) => {
            if(el.id == id.value){
                beerDetail.value.push(el);
            }
        })
    }

    onMounted(() => {
        getBeerDetail();
    }) 

    return{
        beerDetail
    }
  },
})
</script>