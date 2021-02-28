<template>
  <div class="login">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>  
    </div>

    <div class="content-login">
      <br>
      <h1>Log in to</h1>
      <h1>'MyMoney'</h1>
      <div class="content-login__form">
        <div class="content-login__form__input">
          <b-form @submit="signin" @submit.stop.prevent>
            <!-- <label for="feedback-user">Username</label> -->
            <b-form-input placeholder="username" v-model="username" :state="validation" id="feedback-user"></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Your Username must be 5-12 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Looks Good.
            </b-form-valid-feedback>

            <!-- <label for="text-password"></label> -->
            <b-form-input placeholder="password" v-model="password" type="password" id="text-password" aria-describedby="password-help-block"></b-form-input>
            <div class="content-login__form__submit">
              <b-button type="submit" variant="primary">LOGIN</b-button>
              <hr/>
              <div class="content-login__form__alreadyregistered">
                Not registered yet?
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  components: { },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  // Fetches posts when the component is created.
  computed: {
    validation() {
      return this.username.length > 4 && this.username.length < 13
    }
  },
  mounted: {
    clearLocalStorage(){
      localStorage.removeItem('token_type');
      localStorage.removeItem('token_access');
      localStorage.removeItem('token_refresh')
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_login');
      localStorage.removeItem('user_firstname');
      localStorage.removeItem('user_lastname');
      localStorage.removeItem('user_email');
    }
   },
  methods: {
    async signin() {
      console.log(`${this.username} - ${this.password}`)

      await axios.post('http://localhost:5000/api/v1/jwt/issue', {
        login: this.username,
        password: this.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        localStorage.setItem('token_type', response.data.type);
        localStorage.setItem('token_access', response.data.token);
        localStorage.setItem('token_refresh', response.data.refresh)
        localStorage.setItem('user_id', response.data.details.id);
        localStorage.setItem('user_login', response.data.details.login);
        localStorage.setItem('user_firstname', response.data.details.firstname);
        localStorage.setItem('user_lastname', response.data.details.lastname);
        localStorage.setItem('user_email', response.data.details.email);
        this.$router.push({name: 'Home'})
      })
      .catch(error => {
        console.log(error)
      })
      // .finally(() => this.loading = false)

    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_main';

  .login {
    width: 100%;
    // height: 100vh;

    .content-login {
      padding: 10px;
      margin: 0 auto;
      margin-top: 7%;
      width: 400px;
      background-color: white;
      border-radius: 4px;
      border: 1px solid $green;
      text-align: center;
      -webkit-box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
      -moz-box-shadow: 0 0 4px 2px rgba(0,0,0,.2);
      box-shadow: 0 0 4px 2px rgba(0,0,0,.2);

      .content-login__form {
        margin-top: 10%;
        margin-bottom: 5%;
        margin-right: 10%;
        margin-left: 10%;
        padding: 10px;

        .content-login__form__submit {
          margin-top: 10%;
        }

        .content-login__form__alreadyregistered {
          margin-top: 10%;
          color: gray;
          font-size: 14px;
        }

        input {
          background-color: #ebfff2;
          border: 1px solid $dark-green;
        }

        button {
          margin-top: 15px;
          background-color: $dark-green;
          color: white;
          width: 100%;
        }
      }

      h1 {
        color: $dark-green;
        font-size: 36px;
      }
    }
  }

</style>