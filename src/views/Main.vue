<template>
  <div class="containerMain">  
    <HeaderMenuComponent/>
    <CategoriesComponent/>
    <SearchComponent/>
    <LibrosComponent/>
    <JoinComponent v-if="!getAccessToken"/>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderMenuComponent from "@/components/HeaderMenuBP";
import CategoriesComponent from "@/components/CategoriesBP";
import SearchComponent from "@/components/SearchBooksBP";
import LibrosComponent from "@/components/LibrosExistentesBP";
import JoinComponent from "@/components/JoinBP";
import FooterComponent from "@/components/FooterBP";
import {mapGetters} from'vuex'
export default {
  name: "mainBooks",    
  components: { HeaderMenuComponent,CategoriesComponent,SearchComponent,LibrosComponent,JoinComponent,FooterComponent},
  data() {
      return {
          showModalRanking:false
      }
  },
  mounted() {
      /* EventBus.$on('openModalRanking', ()=>{
          this.showModalRanking=true
    }); */
  },
  computed:{
    ...mapGetters(['getAccessToken'])
  }
};
</script>

<style scoped>
.containerMain{
  display: flex;
  flex-wrap: wrap;
  width: 100%;  
}
</style>
