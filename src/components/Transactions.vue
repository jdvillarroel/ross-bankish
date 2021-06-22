<template>
  <div class="transactions-title" @click="toggleTransactions">
    <h4>Historial de Transacciones</h4>
    <!-- <span v-show="!showTransactions" class="material-icons">expand_more</span> -->
    <span class="material-icons"> history</span>
  </div>

  <div v-show="showTransactions">
    <p>Mostrar ultimas transacciones</p>
    <button @click="handleTransactions">Mostrar</button>

    <details
      v-for="(transaction, index) in transactions"
      :key="transaction.id"
      class="transaction-details"
    >
      <summary>
        <div>
          <span>{{ index + 1 }} - </span>
          <span>Fecha: {{ transaction.date.toDate().toLocaleString() }} </span>
          <span v-if="userAccount.userType === 'regularUser'">
            - {{ transaction.status }}</span
          >
        </div>

        <div v-if="userAccount.userType === 'adminUser'">
          <button class="reject">
            <span class="material-icons">highlight_off</span>
          </button>
          <button class="confirm">
            <span class="material-icons">check_circle_outline</span>
          </button>
        </div>
      </summary>
      <div>
        <p>De: {{ transaction.from }}</p>
        <p>Para: {{ transaction.to }}</p>
        <p
          :class="{
            send: transaction.type === 'send',
            receive: transaction.type === 'receive',
          }"
        >
          Monto: ${{ transaction.amount }}
        </p>
        <p>Descripcion: {{ transaction.description }}</p>
      </div>
    </details>
  </div>

  <Loader v-if="showLoader" />
</template>

<script>
import { ref } from "vue";
import { transactionsRef } from "../firebase";
import Loader from "./Loader.vue";

export default {
  name: "Transactions",

  props: {
    currentUser: {
      type: Object,
    },
    userAccount: {
      type: Object,
    },
  },

  components: {
    Loader,
  },

  setup(props) {
    const showTransactions = ref(false);
    let transactions = ref(null);
    const showLoader = ref(false);

    // ********* Methods ********** //
    const toggleTransactions = () => {
      showTransactions.value = !showTransactions.value;
    };

    const handleTransactions = () => {
      let trans = [];

      // Show loader
      showLoader.value = true;

      // Select user type
      if (props.userAccount.userType === "regularUser") {
        transactionsRef
          .where("uid", "==", props.currentUser.uid)
          .orderBy("date", "desc")
          .limit(10)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              trans.push({ ...doc.data(), id: doc.id });
            });
            transactions.value = trans;
            showLoader.value = false;
          })
          .catch((e) => {
            console.log(e);
            showLoader.value = false;
          });
      } else if (props.userAccount.userType === "adminUser") {
        transactionsRef
          .orderBy("date", "desc")
          .limit(20)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              trans.push({ ...doc.data(), id: doc.id });
            });
            transactions.value = trans;
            showLoader.value = false;
          })
          .catch((e) => {
            console.log(e);
            showLoader.value = false;
          });
      } else {
        console.log("Fatal error. No user type found.");
      }
    };

    return {
      transactions,
      showTransactions,
      handleTransactions,
      toggleTransactions,
      showLoader,
    };
  },
};
</script>

<style>
</style>