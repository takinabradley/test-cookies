const btn = document.querySelector('button')
const connectStatus = document.querySelector('.connect-status')
btn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000', {credentials: "include"})
  const json = res.json()
  const headers = res.headers
  console.log(json, headers.getAll)
  
  connectStatus.textContent = 'connected'
})