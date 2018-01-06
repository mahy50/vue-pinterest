<template>
  <div class="pin-signup">
    <div class="pin-signup__back-image"></div>
    <div class="pin-signup__overlay"></div>
    <router-link to="/login" tag="div">
      <button class="pin-signup__button" type="button">Log in</button>
    </router-link>
    <div class="pin-signup__container">
      <div class="pin-signup__header">
        <svg height="50" style="display:block;" viewBox="-3 -3 82 82" width="50" data-reactid="14"><circle cx="38" cy="38" fill="white" r="40" data-reactid="15"></circle><path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z" fill="#BD081C" fill-rule="evenodd" data-reactid="16"></path></svg>
      </div>
        <div class="pin-signup__title">Welcome to Pinterest</div>
        <div class="pin-signup__subtitle">Discover your next idea</div>
        <div class="pin-signup__form">
          <div>
            <fieldset>
            <span>
              <input type="email" id="email" name="id"  v-model="email" placeholder="Email">
            </span>
            </fieldset>
            <fieldset>
              <span>
                <input type="password" id="password" name="password" v-model="password" placeholder="Create a password" required>
              </span>
            </fieldset>
            <fieldset>
              <span>
                <input type="text" id="username" name="username" v-model="username" placeholder="Full name" required>
              </span>
            </fieldset>
            <fieldset>
              <span>
                <input type="text" id="age" name="age" v-model="age" placeholder="Age" required>
              </span>
            </fieldset>
            <fieldset>
              <label class="pin-gender__tooltip">
                <input type="radio" name="gender" value="male"  v-model="gender" required>
                <span>Male</span>
              </label>
              <label class="pin-gender__tooltip">
                <input type="radio" name="gender" value="female"  v-model="gender" required>
                <span>Female</span>
              </label>
              <label class="pin-gender__tooltip">
                <input type="radio" name="gender" value="custom"  v-model="gender" required>
                <span>Custom</span>
              </label>
            </fieldset>
            <button class="SignupButton">
              <div  @click="signup()">Sign up</div>
            </button>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import * as types from './../store/types'
export default {
  data () {
    return {
      email: 'test@email.com',
      username: 'test',
      age: '28',
      gender: 'male',
      password: 'test123456'
    }
  },
  methods: {
    signup () {
      let params = {
        email: this.email,
        username: this.username,
        password: this.password,
        age: parseInt(this.age),
        gender: this.gender
      }
      this.$store.dispatch(types.SIGNUP, params)
        .then(() => {
          this.$router.push({path: '/'})
        })
    }
  }
}
</script>
