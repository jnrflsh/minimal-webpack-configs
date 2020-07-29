


async function asyncMsg() {
  const msg = await new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡')
    }, 2000)
  })

  console.log('Async message:', msg)
}

asyncMsg()


const arr = [1,2,3]
const arr2 = [...arr, 4,5]
console.log(arr2)
