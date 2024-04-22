const btn = document.querySelector('button')
const connectStatus = document.querySelector('.connect-status')
btn.addEventListener('click', async () => {
  const res = await fetch('https://simplistic-fortune-adjustment.glitch.me/', {credentials: "include", mode: 'cors'})
  const json = res.json()
  const headers = res.headers
  console.log(json, headers.getAll)
  
  connectStatus.textContent = 'connected'
})