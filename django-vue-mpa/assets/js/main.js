
// Vue example
import Vue from 'vue'
import Example from './components/Example.vue'

new Vue({
  el: '#app',
  render: h => h(Example)
})


// test async/await
async function asyncMsg() {
  const msg = await new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡')
    }, 2000)
  })

  console.log('Testing async/await:', msg)
}

asyncMsg()
