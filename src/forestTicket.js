const cron = require('node-cron')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')



function Ticket() {
  this.users = getUsers()
  this.grabVotes = false
  this.result = []

  cron.schedule('* 22 * * *', async() => {
    if (!this.grabVotes) return
  
    console.log('要搶票囉～～')
    await getTicket.call(this)
  })
}

function getUsers() {
  let users = []
  let data = process.env.USERS
  data = JSON.parse(data)
  
  for (const row of data) {
    users.push({
      name: row.name,
      id: row.id,
      phone: row.phone,
      email: row.email,
    })
  }
  return users
}


async function getTicket() {
  let today = new Date().toISOString().slice(0,10)
  let date = addDays(today, 15)

  const params = new URLSearchParams()
  this.users.forEach(async user => {
    params.append('date', date)
    params.append('number', 5)
    params.append('name', user.name)
    params.append('id', user.id)
    params.append('phone', user.phone)
    params.append('email', user.email)
    
    let res = await fetch(`https://forest.omniguider.com/api/reserve`, { 
      method: 'POST', 
      body: params 
    })
    res = await res.json()
    this.result.push({
      name: user.name,
      ...res
    })
    console.log('result');
    console.log(this.result);
    
  })


}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().slice(0,10)
}

module.exports = exports = new Ticket()