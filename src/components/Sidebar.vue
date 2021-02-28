<template>
  <div class="sidebar-component">
    <div class="top">
      <div class="avatar">
        <span>
          <i class="fa fa-user-circle"></i>
        </span>
      </div>
    </div>
    <div class="menu">
      <div v-if="isAdmin" class="role-badge">
        <b>Admin</b>
      </div>
      <div v-else class="role-badge">
        <b>User</b>
      </div>
      <div class="menu__items">
        <br>
        <router-link class="router" :to="{name: 'Home'}">
          <h3><i class="fa fa-chart-bar"></i></h3>
          <p>Dashes</p>
        </router-link>

        <hr/>
        <router-link class="router" :to="'/in'">
          <h3><i class="fa fa-piggy-bank"></i></h3>
          <p>Invest.</p>
        </router-link>

        <hr/>
        <router-link class="router" :to="{name: 'CreditCards'}">
          <h3><i class="fa fa-credit-card"></i></h3>
          <p>Cards</p>
        </router-link>

        <hr/>
        <router-link class="router" :to="{name: 'Login'}">
          <h3><i class="fa fa-wallet"></i></h3>
          <p>Wallet</p>
        </router-link>
        <div v-if="isAdmin" class="menu__items_admin-section">
          <b-tooltip placement='right' target="is-admin">You are an 'admin'. The following options are enabled</b-tooltip>

          <hr/>
          <h5><span id="is-admin"><i class="fa fa-lock-open"></i></span></h5>

          <hr/>
          <router-link class="router" :to="{name: 'Login'}">
            <h3><i class="fa fa-users"></i></h3>
            <p>Users</p>
          </router-link>

          <hr/>
          <router-link class="router" :to="{name: 'Login'}">
            <h3><i class="fa fa-cogs"></i></h3>
            <p>Settings</p>
          </router-link>
        </div>
        <div v-else class="menu__items_not-admin-section">
          <b-tooltip boundary-padding='85' placement='right' target="is-admin">You are not an administrator</b-tooltip>
          <hr/>
          <h5><span id="is-admin"><i class="fa fa-lock"></i></span></h5>
          <hr/>
          <h3><i class="fa fa-users"></i></h3>
          <p>Users</p>
          <hr/>
          <h3><i class="fa fa-cogs"></i></h3>
          <p>Settings</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  computed: {
    isAdmin() {
      return false
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_main';

.sidebar-component {
  .top {
    display: flex;
    width: 100%;
    justify-content: center;

    .avatar {
      margin-top: 30%;
      margin-bottom: 30%;
      &:hover {
        opacity: 70%;
      }

      span {
        display: block;
        width: 40px;
        height: 40px;
        color: $dark-green;
        border-radius: 50%;
        background-color: bisque;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
      }
    }
  }

  .menu {
    .menu__items {
      .router {
        color: $light-gray;;
        text-decoration: none;
      }

      h3 {
        router-link-exact-active {
          color: $soft-green;
        }

        &:active {
          color: $soft-green;
        }
        &:hover {
          color: $soft-green;
        }
      }
      .menu__items_not-admin-section {
        h3 {
          &:hover {
            opacity: 100%;
          }
        }

        h5 {
          color: $boston-university-red;
        }
      }
      .menu__items_admin-section {
        h5 {
          color: $soft-green;
        }
      }
    }
    .role-badge {
      background-color: $light-blue;
      color: $dark-grayish-blue;
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 3px;
      font-size: 14px;
    }
  }

  p {
    font-size: 14px;
  }

  hr {
    color: $light-gray;
    border-color: $light-gray;
    width: 50%;
  }
}

</style>