<template>
  <div class="home">
    <Dashboard>
      <div slot="slot-pages">
        <header class="title_pages"><p>MyDash</p></header>

        <div>
          Dashboards

        </div>
      </div>
    </Dashboard>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard';

export default {
  name: 'Dashboards',
  components: { Dashboard }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_main';

</style>