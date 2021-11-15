<template>
  <div>
    <section class="text-gray-600">
      <!-- ソートエリア表示 -->
      <div class="text-center py-5 border-b">
        <p class="bg-yellow-200 m-5 p-5">誕生月を入力して<br>同月生まれのIPAを愛でよう</p>
        <!-- セレクトボックスで月を指定できる -->
        <select @change="handleChange" class="block appearance-none mx-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option selected disabled>月を入力！</option>
          <option v-for="(month, index) in months" :key="index" :value="month.value" :selected="month === month.value">{{ month }}</option>
        </select>
      </div>
      <div class="container py-10 mx-auto">
        <div class="flex flex-wrap">
          <!-- アイテムカード -->
          <div
            v-for="(beer, index) in sortItems(beers)"
            :key="index"
            class="lg:w-1/4 md:w-1/3 w-1/2 p-5 text-center"
          >
          <div class="p-5">
            <div class="flex h-44 ">
              <img :src="beer.image_url" alt="" class="h-full m-auto" />
            </div>
            <div :name="index" class="pt-3">{{ beer.name }}</div>
            <div :name="index" class="pb-3 text-sm italic text-gray-400">{{ beer.tagline }}</div>
            <div :name="index" class="text-sm">アルコール度数：{{ beer.abv }}%</div>
            <div :name="index" class="text-sm">初醸造日：{{ beer.first_brewed }}</div>
            <router-link :to="`/beerDetail/${beer.id}`" class="text-sm underline">詳細</router-link>
            </div>
          </div>
          <!-- アイテムカード -->
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { getBeerData } from "../../composable/getBeerData";

export default {
  setup() {
    const months = ["01月", "02月", "03月", "04月", "05月", "06月", "07月", "08月", "09月", "10月", "11月", "12月"];
    const selectedMonth = ref<String>("");
    const beers = ref<Array<String>>([]);

    // セレクトボックスで選択された値を変数に格納する
    const handleChange = (e: any) => {
       selectedMonth.value = e.target.value;
    }

    //一覧表示するIPAデータを全件取得して配列に格納する
    //格納した配列はHTMLないで展開して表示する
    const mainBeerData = async () => {
      //composableで切り出した関数getBeerDataを使用
      const beerData = await getBeerData();

      // 画像が入ってないデータを除外
      beerData.forEach((el: any) => {
        if (el.image_url != "https://images.punkapi.com/v2/keg.png") {
          beers.value.push(el);
        }
      });
    };

    //セレクトボックスに入力された月によって表示をソートする
    //array = 全てのIPAデータ
    //セレクトボックスが選択されていない場合は全件表示する
    const sortItems = (array: any) => {
      if(selectedMonth.value === ""){
        return array;
      } else {
        return array.filter((el: any) => el.first_brewed.split("").slice(0,2).join("") == selectedMonth.value.split("").slice(0,2).join("")).map((data: any) => data)
      }
    }

    onMounted(() => {
      mainBeerData();
    });

    return {
      beers,
      months,
      selectedMonth,
      handleChange,
      sortItems
    };
  },
};
</script>
