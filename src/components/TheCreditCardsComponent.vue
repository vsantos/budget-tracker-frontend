<template>
  <div class="credit-cards">
    <b-container>
      <b-row>
        <b-col cols="12" md="3" class="credit-cards__col" v-for="creditCard in creditCards" :key="creditCard.id">
          <b-modal
            ref="my-modal"
            v-bind:id="`modal-delete-${creditCard.id}`"
            v-bind:title="`Delete card '${creditCard.id}' ?`"
            size="md"
            centered
            :header-bg-variant="'danger'"
            :header-text-variant="'light'"
            :body-bg-variant="''"
            :body-text-variant="'dark'"
            :footer-bg-variant="'light'"
            :footer-text-variant="'dark'"
          >
            <div class="delete-card-content">
              Are you sure to proceed with the deletion of card '<b>{{ creditCard.alias }}</b>' with final digits '<b>{{ creditCard.last_digits }}</b>'? Some billings may be affect by this <b>IRREVERSIBLE</b> action!
            </div>

            <template #modal-footer="{ }">
              <b-button size="sm" variant="info"  @click="closeModal(creditCard.id)">
                CANCEL
              </b-button>
              <b-button size="sm" variant="danger"  @click="deleteCard(creditCard.id)">
                DELETE
              </b-button>
            </template>
          </b-modal>
          <CreditCard :key="'creditCard'" :showModal="true" :card_id="creditCard.id" :alias="creditCard.alias" :path="`@/assets/images/` + creditCard.network + `.png`" :network="creditCard.network" :last_digits="creditCard.last_digits" :color="creditCard.color"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CreditCard from '@/components/CreditCardComponent';

import axios from 'axios';

export default {
  name: 'TheCreditCardsComponent',
  components: { CreditCard },
  data() {
    return {
      cardToBeDeleted: null,
    }
  },
  props: {
    creditCards: null,
  },
  methods: {
    closeModal(cardId){
      this.$bvModal.hide('modal-delete-' + cardId)
    },
    async deleteCard(cardId) {
      await axios.delete('http://localhost:5000/api/v1/cards/' + cardId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_access')
        },
        data: {}
      })
      .then(response => {
        console.log(response)
        this.$bvModal.hide('modal-delete-' + cardId)
      })
      .catch(error => {
        this.errored = true;
        this.alertTitle = error;

        if (error.response) {
          this.alertTitle = error.response.data.messsage;
          this.alertMessage = error.response.data.details;
          this.alertStatusCode = error.response.status;
        }
      })
      .finally(() => this.loading = false);
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-cards {
  .credit-cards__col {
    padding: 10px;
  }

}
</style>