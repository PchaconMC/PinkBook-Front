<template>
  <div class="containerJoin">
    <p class="tituloJoin">Unete a nuestra comunidad!</p>
    <p class="subTituloJoin">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
      lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula
      sapien. Suspendisse cursus faucibus finibus.
    </p>
    <div class="containerBotonJoin">
      <a href="#"><div class="boton" href="#up">
        Registrate     
      </div></a>   
    </div>    
  </div>
</template>

<script>
export default {};
</script>

<style  lang="scss" scoped>
.containerJoin {  
  width: 60%;  
  margin: 0px auto;
  margin-top: 150px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 200px;
}
.containerBotonJoin{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    min-height: 54px;
    width: 100%;
}
.tituloJoin {
  margin: 0px auto;
  font-family: "RalewayBold", sans-serif;
  font-size: 60px;
  font-weight: 500;  
  line-height: 72px;
  margin-top: 70px;
  justify-content: center;
}
.subTituloJoin {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0px auto;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;  
  line-height: 31px;
}
.boton {
  display: inline-block;
  min-width: 196px;
  text-align: center;
  border: none;
  padding: 15px 10px;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  color: #fff;
  cursor: pointer;
  background: #d82a4e;
}
@media (max-width: 900px) {
  .containerJoin{
    width: 100%;
    margin-top: 70px;    
    margin-bottom: 100px;
  }
  .tituloJoin {
  font-size: 30px;  
  line-height: 40px;
  margin-top: 30px;  
}
.subTituloJoin {
  width: 60%;
  margin-top: 10px;
  font-size: 14px;  
  line-height: 25px;
}
}
</style>
