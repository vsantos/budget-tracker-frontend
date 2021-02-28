<template>
    <div class="footer">
      <footer>
        <div class="footer__icons">
          <a href="https://github.com/vsantos/my-money" target="_blank">
            <h3><i class="fab fa-github"></i></h3>
          </a>
          <a href="https://www.linkedin.com/in/jvictorssouza/" target="_blank">
            <h3><i class="fab fa-linkedin"></i></h3>
          </a>
          <a href="mailto:vsantos.py@gmail.com" target="_blank">
            <h3><i class="fa fa-paper-plane"></i></h3>
          </a>
        </div>
      </footer>
    </div>
</template>

<script>
    export default {
      name: 'Footer',
    }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_main';

.footer {
  // height: 100vh;
  -webkit-box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
  -moz-box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
  box-shadow: 0 0 4px 2px rgba(0,0,0,.2);

  .footer__icons {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $dark-grayish-blue;

    a {
      padding: 7px;

      h3 {
        color: $light-gray;
        &:hover {
          color: $soft-green;
        }
      }
    }
  }
}
</style>
