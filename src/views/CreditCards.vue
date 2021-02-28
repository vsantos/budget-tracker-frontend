<template>
  <div class="credit-cards">
    
    <Dashboard>
      <div slot="slot-pages">
        <div class="top">
          <b-button v-b-modal.new_card_modal type="submit" variant="info">NEW CARD</b-button>
        </div>
        <hr>

        <div v-if="errored" class="alert">
          <AlertComponent :variant="alertVariant">
            <div slot="alert-content">
              {{ alertStatusCode }} - {{ alertTitle }}
              <hr>
              {{ alertMessage }}
            </div>
          </AlertComponent>
        </div>

        <div v-if="loading" class="loader"></div>

        <div class="new_card">
          <b-modal
            id="new_card_modal"
            title="New Card"
            size="md"
            centered
            :header-bg-variant="'dark'"
            :header-text-variant="'light'"
            :body-bg-variant="''"
            :body-text-variant="'dark'"
            :footer-bg-variant="'dark'"
            :footer-text-variant="'light'"
          >

            <b-container fluid>
              <div class="new_card__input_form">
                <b-form ref="new_card_form" @submit.stop.prevent>
                  <b-container>
                    <b-row>
                      <b-col>
                        Alias:
                        <b-form-input :required="true" placeholder="My Platinum Card Alias" v-model="newCard.alias"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" sm="4">
                        Last 4 Digits:
                        <b-form-input placeholder="1234" v-model="newCard.lastFourDigits"></b-form-input>
                      </b-col>
                      <b-col cols="6" sm="6">
                        Network:
                        <b-form-select v-model="newCard.network" :options="networks"></b-form-select>
                      </b-col>
                      <b-col cols="6" sm="2">
                        Color:
                        <b-form-input id="background" :type="'color'" v-model="newCard.color"></b-form-input>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form>
              </div>

              <hr>
              <div v-if="AlertNewCardShow" class="alert">
                <AlertComponent :variant="alertNewCardVariant">
                  <div slot="alert-content">
                    {{ alertNewCardStatusCode }} - {{ alertNewCardMessage }}
                  </div>
                </AlertComponent>
              </div>
            </b-container>

            <template #modal-footer="{ }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="success"  @click="createCard">
                CREATE
              </b-button>
            </template>

          </b-modal>
        </div>

        <div class="content">
          <TheCreditCards :creditCards="creditCards"/>
        </div>


      </div>
    </Dashboard>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard';
import TheCreditCards from '@/components/TheCreditCardsComponent';
import AlertComponent from '@/components/AlertComponent';

import axios from 'axios'

export default {
  name: 'CreditCards',
  components: { Dashboard, TheCreditCards, AlertComponent },
  data() {
    return {
      childOptions: 'ee',
      newCard: {
        alias: '',
        lastFourDigits: '',
        network: '',
        color: '#ffffff'
      },
      creditCards: [],
      networks: [
        "visa",
        "mastercard",
        "ticket",
        "VR",
        "elo"
      ],
      alertVariant: "danger",
      alertTitle: "",
      alertMessage: "",
      alertStatusCode: "00",
      alertNewCardVariant: "danger",
      alertNewCardMessage: "",
      alertNewCardStatusCode: "00",
      AlertNewCardShow: false,
      errored: false,
      loading: true
    }
  },
  mounted() {
    this.getCards();
  },
  methods: {
    async getCards() {
      await axios.get('http://localhost:5000/api/v1/cards/' + localStorage.getItem('user_id'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_access')
        },
        data: {}
      })
      .then(response => {
        this.creditCards = response.data;
      })
      .catch(error => {
        this.errored = true;
        this.alertTitle = error;

        if (error.response) {
          this.alertTitle = error.response.data.message;
          this.alertMessage = error.response.data.details;
          this.alertStatusCode = error.response.status;
        }
      })
      .finally(() => this.loading = false);
    },
    async createCard() {
      await axios.post('http://localhost:5000/api/v1/cards', {
        owner_id: localStorage.getItem('user_id'),
        alias: this.newCard.alias,
        last_digits: parseInt(this.newCard.lastFourDigits),
        network: this.newCard.network,
        color: this.newCard.color
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_access')
        }
      })
      .then(response => {
        console.log(response)
        this.alertNewCardVariant = "success"
        this.alertNewCardMessage = response.data.message;
        this.alertNewCardStatusCode = response.status;
        this.AlertNewCardShow = true;
        this.resetForm();
      })
      .catch(error => {
        this.AlertNewCardShow = true;

        if (error.response) {
          this.alertNewCardVariant = "danger"
          this.alertNewCardTitle = error.response.data.messsage;
          this.alertNewCardMessage = error.response.data.details;
          this.alertNewCardStatusCode = error.response.status;
        }
      })
      // .finally(() => this.loading = false)
    },
    resetForm(){
      this.$refs.new_card_form.reset()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_colors';

.credit-cards {
  .new_card {
    .new_card__input_form {
      color: white;
      padding: 100px;
    }
  }

  .loader {
    margin-left: auto;
    margin-right: auto;
    border: 12px solid $light-blue; /* Light grey */
    border-top: 12px solid $light-gray; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

}
</style>