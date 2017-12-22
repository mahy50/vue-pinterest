<template>
  <nav class="navbar pin-header">
    <section class="navbar-section pin-header__brand">
      <router-link class="btn-icon btn-lg" to="/">
        <svg height="24" width="24" viewBox="0 0 24 24">
          <path fill="#BD081C" d="M0.00,12.00 C0.00,17.12 3.21,21.50 7.73,23.22 C7.62,22.28 7.50,20.74 7.75,19.65 C7.97,18.72 9.16,13.71 9.16,13.71 C9.16,13.71 8.80,13.00 8.80,11.94 C8.80,10.28 9.76,9.04 10.96,9.04 C11.98,9.04 12.47,9.80 12.47,10.72 C12.47,11.75 11.82,13.28 11.48,14.70 C11.20,15.89 12.08,16.86 13.25,16.86 C15.37,16.86 17.01,14.62 17.01,11.39 C17.01,8.53 14.95,6.53 12.02,6.53 C8.62,6.53 6.62,9.08 6.62,11.71 C6.62,12.74 7.02,13.84 7.51,14.44 C7.61,14.56 7.62,14.66 7.59,14.78 C7.50,15.16 7.30,15.97 7.26,16.14 C7.21,16.35 7.09,16.40 6.86,16.30 C5.37,15.60 4.44,13.42 4.44,11.67 C4.44,7.90 7.18,4.44 12.33,4.44 C16.48,4.44 19.70,7.39 19.70,11.34 C19.70,15.46 17.10,18.77 13.50,18.77 C12.29,18.77 11.15,18.14 10.76,17.40 C10.76,17.40 10.16,19.68 10.02,20.24 C9.73,21.32 8.95,22.69 8.47,23.47 C9.58,23.82 10.77,24.00 12.00,24.00 C18.63,24.00 24.00,18.63 24.00,12.00 C24.00,5.37 18.63,0.00 12.00,0.00 C5.37,0.00 0.00,5.37 0.00,12.00"></path>
        </svg>
      </router-link>
    </section>
    <section class="navbar-section pin-header__search">
      <div class="input-group">
        <a class="btn input-group-btn">
          <svg height="20" width="20" viewBox="0 0 24 24">
            <path  fill="#B5B5B5" d="M10.00,16.00 C6.69,16.00 4.00,13.31 4.00,10.00 C4.00,6.69 6.69,4.00 10.00,4.00 C13.31,4.00 16.00,6.69 16.00,10.00 C16.00,13.31 13.31,16.00 10.00,16.00 M23.12,18.88 L18.86,14.62 C19.59,13.24 20.00,11.67 20.00,10.00 C20.00,4.48 15.52,0.00 10.00,0.00 C4.48,0.00 0.00,4.48 0.00,10.00 C0.00,15.52 4.48,20.00 10.00,20.00 C11.67,20.00 13.24,19.59 14.62,18.86 L18.88,23.12 C20.05,24.29 21.95,24.29 23.12,23.12 C24.29,21.95 24.29,20.05 23.12,18.88"></path>
          </svg>
        </a>
        <input class="form-input" type="text" placeholder="Search"/>
      </div>
    </section>
    <section class="navbar-section navmenu pin-header__menu">
      <a class="btn-icon btn-lg" href="/">Home</a>
      <div class="btn-icon btn-lg">
        <div>
          <img v-if="image_small_url" :src="image_small_url" class="avatar avatar-sm" :alt="username">
          <div v-else class="avatar avatar-sm"></div>
          {{username}}
        </div>
      </div>
      <div class="dropdown">
        <a class="btn-icon btn-lg">
          <svg width="24" height="24" viewBox="0 0 16 16">
            <path fill="#B5B5B5" d="M15.33 9.5V13c0 1.66-1.34 3-3 3H3.67c-1.66 0-3-1.34-3-3V8L2.4 1.65c.16-.58.68-.98 1.29-.98h8.62c.61 0 1.13.4 1.29.98L15.33 8v1.5zm-10 1.83c-.36 0-.66.3-.66.67 0 .37.3.67.66.67h5.34c.36 0 .66-.3.66-.67 0-.37-.3-.67-.66-.67H5.33zM4.19 2.67l-1.52 5.6V9h10.66v-.73l-1.52-5.6H4.19z" data-reactid="81"></path>
          </svg>
        </a>
        <ul class="menu">
          <li>Setting</li>
        </ul>
      </div>
      <div class="dropdown">
        <a class="btn-icon btn-lg  dropdown-toggle">
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path  fill="#B5B5B5" d="M12.00,9.00 C10.34,9.00 9.00,10.34 9.00,12.00 C9.00,13.66 10.34,15.00 12.00,15.00 C13.66,15.00 15.00,13.66 15.00,12.00 C15.00,10.34 13.66,9.00 12.00,9.00 M3.00,9.00 C4.66,9.00 6.00,10.34 6.00,12.00 C6.00,13.66 4.66,15.00 3.00,15.00 C1.34,15.00 0.00,13.66 0.00,12.00 C0.00,10.34 1.34,9.00 3.00,9.00 Z M21.00,9.00 C22.66,9.00 24.00,10.34 24.00,12.00 C24.00,13.66 22.66,15.00 21.00,15.00 C19.34,15.00 18.00,13.66 18.00,12.00 C18.00,10.34 19.34,9.00 21.00,9.00 Z" data-reactid="92"></path>
          </svg>
        </a>
        <ul class="menu">
          <li>Setting</li>
        </ul>
      </div>
    </section>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: mapState({
    username: state => state.user.username,
    image_small_url: state => state.user.image_small_url
  }),
  mounted () {
  }
}
</script>
