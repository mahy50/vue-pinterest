<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as types from './store/types'
export default {
  name: 'app',
  created () {
    this.$store.dispatch(types.GETPINS)
  }
}
</script>
