<template>
  <div class="example">
    <h1>Django MPA vue sfc + es6 + scss</h1>
    <button @click="increase">Increase {{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increase() {
      this.count++
    }
  }
}
</script>

<style lang="scss" scoped>
$componentColor: green;

h1 {
  color: $componentColor;
}
</style>
