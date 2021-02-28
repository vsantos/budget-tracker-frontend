<template>
  <div v-bind:style="`background-color:${color};`" class="cards">
    <div class="cards-content cards-top">
      <h3>{{ alias }}</h3>
      <a v-b-modal="`modal-delete-${card_id}`" class="icon-block">
        <h4><p class="trash-icon"><i class="fa fa-times-circle"></i></p></h4>
      </a>
    </div>

    <hr>
    <div class="cards-content cards-footer">
      <!-- <i class="fa fa-credit-card ico"></i> -->
      <!-- <img :src="require(`../assets/images/${network}.png`)" class="credit_card_img" v-bind:alt="network"> -->
      <h3><i v-bind:class="`fab fa-cc-${network}`"></i></h3>
      <p class="qtd">**** **** **** {{ last_digits }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  data() {
    return {
      cardToBeDeleted: null,
      creditCard: 0,
    }
  },
  props: {
    card_id: String,
    alias: String,
    path: String,
    network: String,
    last_digits: Number,
    color: String
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_main';

.cards {
  // display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100%;
  color: $dark-grayish-blue;
  background-color: white;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid rgba($dark-grayish-blue, 0.2);
  word-break: break-all;

  hr {
    border-color: #EEEEEE -moz-use-text-color #FFFFFF;
    border-style: solid none;
    border-width: 1px 0;
    margin: 18px 0;
    margin-top: 1;
  }

  .cards-content {
    display: flex;
    justify-content: space-between;
  }

  .cards-top {
    font-size: calc(4vw + 4vh + 2vmin);
    .trash-icon {
      color: $boston-university-red;
      opacity: 50%;
      &:hover {
        opacity: 100%;
      }
    }
  }

  .cards-footer {
    .credit_card_img {
      width: 18%;
      min-height: 18%;
      max-height: auto;
    }

    .ico {
      font-size: 30px;
    }

    .qtd {
      font-size: 20px;
      margin: 0;
    }
  }
}
</style>