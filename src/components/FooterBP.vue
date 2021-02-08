<template>
  <div class="footer-section pb-0 mt-5">
    <div class="footer-top">
      <div class="footer-warp">
        <div class="row">
          <div class="widget-item">
            <h4 class="tituloFooter">Contact Info</h4>
            <ul class="contact-list">
              <li>1481 Creekside Lane <br />Avila Beach, CA 931</li>
              <li>+53 345 7953 32453</li>
              <li>yourmail@gmail.com</li>
            </ul>
          </div>
          <div class="widget-item">
            <h4 class="tituloFooter">Engeneering</h4>
            <ul style="text-align:left">
              <li><a href="">Applied Studies</a></li>
              <li><a href="">Computer Engeneering</a></li>
              <li><a href="">Software Engeneering</a></li>
              <li><a href="">Informational Engeneering</a></li>
              <li><a href="">System Engeneering</a></li>
            </ul>
          </div>
          <div class="widget-item">
            <h4 class="tituloFooter">Graphic Design</h4>
            <ul style="text-align:left">
              <li><a href="">Applied Studies</a></li>
              <li><a href="">Computer Engeneering</a></li>
              <li><a href="">Software Engeneering</a></li>
              <li><a href="">Informational Engeneering</a></li>
              <li><a href="">System Engeneering</a></li>
            </ul>
          </div>
          <div class="widget-item">
            <h4 class="tituloFooter">Development</h4>
            <ul style="text-align:left">
              <li><a href="">Applied Studies</a></li>
              <li><a href="">Computer Engeneering</a></li>
              <li><a href="">Software Engeneering</a></li>
              <li><a href="">Informational Engeneering</a></li>
              <li><a href="">System Engeneering</a></li>
            </ul>
          </div>
          <div class="widget-item">
            <h4 class="tituloFooter">Newsletter</h4>
            <form class="footer-newslatter" >
              <input type="email" placeholder="E-mail" id="inputText"/>
              <button class="site-btn boton">Subscribe</button>
              <p>*We don’t spam</p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-warp">
        <ul class="footer-menu">
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Register</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
        <div class="copyright">          
          Copyright &copy;          
          All rights reserved | This template is made with
          <i class="fa fa-heart-o" aria-hidden="true"></i> by
          <a href="https://colorlib.com" target="_blank">Pink Book</a>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-section {
  border-top: 3px solid #d82a4e;
    width: 60%;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 80px;
}

.footer-warp {
  max-width: 1559px;
  padding: 0 15px;
  margin: 0 auto;
}

.widget-item {
  width: 20%;
  padding: 0 15px;
}

.widget-item h4 {
  margin-bottom: 30px;
}

.widget-item ul {
  list-style: none;
  padding-top: 30px;
}

.widget-item ul li {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
}

.widget-item ul li:last-child {
  margin-bottom: 0;
}

.widget-item ul a {
  color: #878787;
}

.widget-item ul.contact-list li {
  margin-bottom: 27px;
  position: relative;
  padding-left: 10px;
}

.widget-item ul.contact-list li:last-child {
  margin-bottom: 0;
}

.widget-item ul.contact-list li:after {
  position: absolute;
  content: "";
  width: 8px;
  height: 8px;
  left: -5px;
  top: 6px;
  border-radius: 50%;
  background: #d82a4e;
}

.footer-newslatter {
  padding-left: 40px;  
  padding-right: 38px;  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-newslatter input[type="email"] {
  height: 57px;
  width: 100%;  
  margin-bottom: 27px;
  float: left;
  border: none;
  font-size: 14px;
  background: #edf4f6;
}

.footer-newslatter .site-btn {
  min-width: 143px;
  margin-bottom: 20px;
}

.footer-newslatter p {
  margin-bottom: 0;
  font-weight: 500;
  font-style: italic;
}

.footer-bottom {
  overflow: hidden;
  background: #edf4f6;
  padding: 20px 0;
  margin-top: 50px;
  width: 100%;
}

.footer-menu {
  list-style: none;
  float: right;
}

.footer-menu li {
  display: inline;
}

.footer-menu li:last-child a {
  padding-right: 0;
  margin-right: 0;
}

.footer-menu li:last-child a:after {
  display: none;
}

.footer-menu li a {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #474747;
  padding-right: 10px;
  margin-right: 10px;
  position: relative;
}

.footer-menu li a:after {
  position: absolute;
  content: "|";
  right: 0;
  top: 0;
}

.copyright {
  padding-top: 3px;
  float: left;
  font-size: 14px;
  font-weight: 600;
  color: #474747;
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
#inputText {
  width: 100%;
  margin-right: 30px;
  padding: 0 30px;
  margin-right: 18px;
  float: left;
  border: none;
  font-size: 14px;
  background: #edf4f6;
  overflow: visible;
}
#inputText:focus {
  outline: none;
  border-bottom: 2px solid #d82a4e;
}
.tituloFooter{
    font-weight: 700;
}



@media (max-width: 1300px) {
  
.widget-item {
  width: 100%;
  padding: 0 15px;
  margin-top: 10px;
}

.widget-item h4 {
  margin-bottom: 30px;
}

.widget-item ul {
  list-style: none;
  padding-top: 30px;  
}

.widget-item ul li {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  text-align: left;
}
.footer-section{
  width: 100%;
  padding-top: 30px;
}
.footer-menu{
  width: 100%;
  padding-left:0px ;
}
}



</style>
