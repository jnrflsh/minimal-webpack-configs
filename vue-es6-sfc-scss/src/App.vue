<template>
  <div class="example">
    <h1>vue ES6 + single file component + SCSS minimal webpack example</h1>
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
