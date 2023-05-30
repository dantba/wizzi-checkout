<template>
  <div class="checkout">
    <v-form ref="form" class="c-form">
      <v-row class="ma-2">
        <v-col>
          <v-autocomplete
            v-model="origem"
            label="Origem"
            :items="cidadesFiltradas"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="destino"
            label="Destino"
            :items="cidadesFiltradas"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-col>
          <v-text-field
            v-model="dataIda"
            type="date"
            label="Data de ida"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="dataVolta"
            type="date"
            label="Data de volta"
            :rules="[
              rules.required,
              rules.datasValidas(dataIda, dataVolta),
            ]"
          />
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-col>
          <h3>Adultos</h3>
          <h4>Idade: acima de 13</h4>        
          <div>
            <mdicon
              name="plus"
              @click="adicionaAdulto"
            />
                <span>{{ qtdeAdulto }}</span>
            <mdicon
                name="minus"
                @click="removeAdulto"
            />
          </div>
          <span 
            style="color:#c6504e"
            v-if="!qtdeAdultosIsValid"
           >
            É necessário ao menos um adulto na viagem
          </span>
        </v-col>
        <v-col>
          <h3>Crianças</h3>
          <h4>Idade: 2 até 12</h4>        
          <div>
            <mdicon
              name="plus"              
              @click="adicionaCrianca"
            />
                <span>{{ qtdeCrianca }}</span>
            <mdicon
              name="minus"
              @click="removeCrianca"
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-text-field
            v-model="passageiroPrincipal"
            label="Nome do passageiro principal"
            :rules="[rules.somenteLetras, rules.required]"
        />
      </v-row>
      <v-row class="ma-2">
        <v-text-field
            v-model="emailPrincipal"
            label="E-mail do passageiro principal"
            :rules="[rules.email, rules.required]"
        />
      </v-row>
      <v-row class="ma-2" justify="center">
        <v-btn
          color="#32a89d"
          elevation="8"
          :loading="loading"
          @click="enviar"
          >Enviar</v-btn
        >
      </v-row>
    </v-form>
    <toast-component />
  </div>
</template>

<script>
import rules from "../helpers/rules";
import { cidades } from "../bd/cidades"
import toastComponent from "../components/toast-component.vue";

export default {
  name: "CheckoutPage",
  components: {
    toastComponent,
  },
  mounted() {
    this.loadCidades()
  },
  data() {
    return {
      loading: false,
      cidades: [],
      dataIda: null,
      dataVolta: null,
      destino: null,
      emailPrincipal: null,
      origem: null,
      passageiroPrincipal: null,
      qtdeAdultosIsValid: true,
      qtdeAdulto: 0,
      qtdeCrianca: 0,
      rules,
    };
  },
  computed: {
    cidadesFiltradas() {
      const cidades = [...this.cidades.map(e => e.nome)];
      if (this.origem) {
        cidades.splice(cidades.indexOf(this.origem), 1);
      }
      if (this.destino) {
        cidades.splice(cidades.indexOf(this.destino), 1);
      }
      return cidades;
    },
  },
  methods: {
    async enviar() {
      try {
        this.loading = true;
        this.validaQtdeAdultos();
        const { valid } = await this.$refs.form.validate();
        if (!valid  || !this.qtdeAdultosIsValid) {
          this.$store.commit("toast", {
            message: "Preencha os campos obrigatórios para continuar",
            color: "error",
          });
          return;
        }
        this.reset();
        this.$store.commit("toast", {
          message: "Dados enviados com sucesso",
          color: "success",
        });
        
      } finally {
        this.loading = false;
      }
    },
    loadCidades() {
        this.cidades = cidades
    },
    reset() {
      this.$refs.form.reset();
    },
    validaQtdeAdultos() {
        this.qtdeAdultosIsValid = this.qtdeAdulto > 0
    },
    adicionaAdulto() {
        this.qtdeAdulto = this.qtdeAdulto + 1
        this.validaQtdeAdultos()
    },
    removeAdulto() {
        this.qtdeAdulto = Math.max(0, this.qtdeAdulto - 1)
        this.validaQtdeAdultos()
    },
     adicionaCrianca() {
        this.qtdeCrianca = this.qtdeCrianca + 1
    },
    removeCrianca() {
        this.qtdeCrianca = Math.max(0, this.qtdeAdulto - 1)
    }
  },
};
</script>

<style lang="scss" scoped>
.checkout-page {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-weight: 700;
    font-size: 0.8rem;
    color: #2c3e50;
  }

  h4 {
    font-weight: 400;
    font-size: 0.6rem;
    color: #2c3e50;
    margin-bottom: 1.2rem;
  }

  .c-form {
    @media (max-width: 768px) {
      max-width: 90%;
    }
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
  }
}

</style>