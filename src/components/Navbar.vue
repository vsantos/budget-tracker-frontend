<template>
  <div class="navbar">
    <h3 class="logo"><i class="fa fa-money-bill-wave"></i><a href="" @click.prevent="logout" class="logo"> MyMoney!</a></h3>
    <a href="" @click.prevent="logout" class="logout"><b>@{{ username }}</b> <i class="fa fa-sign-out-alt"></i></a>
  </div>

</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = localStorage.getItem('user_login')
  },
  methods: {
    logout(){
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors';

.navbar {
  .logo {
    color: $dark-grayish-blue;
    &:hover {
      text-decoration: none;
      color: $light-gray;
    }
  }

  .logout {
    color: $dark-grayish-blue;
    &:hover {
      text-decoration: none;
      color: $light-gray;
    }
  }
}
</style>