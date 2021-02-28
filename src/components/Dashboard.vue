<template>
  <div class="dashboard">
    <div class="sidebar">
      <SidebarComponent/>
    </div>

    <div class="content-right">
      <div class="navbar">
        <NavbarComponent/>
      </div>

      <div class="pages">
        <slot name="slot-pages"></slot>
      </div>
    </div>
    <div class="footer">
      <FooterComponent/>
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/Sidebar';
import NavbarComponent from '@/components/Navbar';
import FooterComponent from '@/components/Footer';

export default {
    name: 'Dashboard',
    components: { SidebarComponent, NavbarComponent, FooterComponent }
}
</script>

<style lang="scss">
@import '@/assets/scss/_colors';

.dashboard {
  // background-color: gray;
  width: 100%;
  height: 100vh;
  display: flex;

  .sidebar {
    width: 80px;
    height: 100vh;
  }

  .content-right {
    width: calc(100% - 90px);
    height: 100vh;
    background-color: $light-gray;

    .navbar {
        width: 100%;
        padding: 10px 15px;
        // height: 10%;
        background-color: $soft-green;
    }

    .pages {
        // margin-top: 20px;
        margin-bottom: 55px;
        // margin-left: 20px;
        // margin-right: 20px;
        padding: 2%;
        height: auto;
        background-color: $light-gray;
        color: black;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
  }
}
</style>