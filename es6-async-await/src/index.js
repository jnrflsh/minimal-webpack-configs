async function asyncMsg() {
  const msg = await new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡')
    }, 2000)
  })

  console.log('Async message:', msg)
}

asyncMsg()
