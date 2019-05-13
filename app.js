const express = require('express');
const app = express();
const linebot = require('linebot');


app.use(express.static('public'));

const bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
});

const btnTemplate={
  type: 'template',
  altText: 'this is a confirm template',
  template: {
      type: 'buttons',
      text: '按鈕測試',
      actions: [{
          type: 'postback',
          label: '單程接送',
          data: '單程接送'
      }, {
          type: 'postback',
          label: '包車旅遊',
          data: '包車旅遊'
      }]
  }
};


//LineBot處理使用者按下選單的函式
bot.on('postback', function (event) {
  
  const pressBtn = handleBtn(event.postback.data);
  if(pressBtn !== '') {
    event.source.profile()
      .then(function (profile) {
        event.reply(`Hello ${profile.displayName}, ${pressBtn}`);
      })
      .then(function(data) {
          // success 
          console.log('訊息已傳送！');
      }).catch(function(error) {
          // error 
          console.log('postback error');
          console.log(error);
      });
  }
});

bot.on('message', function (event) {
  let handleMsg='';
    if (event.message.type === 'text') {
        handleMsg = callTaxi(event.message.text);
    }
    event.reply(handleMsg)
      .then(function(data) {
          // success 
          console.log('訊息已傳送！');
      }).catch(function(error) {
          // error 
          console.log('message error');
          console.log(error);
      });
});

function handleBtn(msg) {
  return `您點擊【${msg}】，立刻為您處理`;
}

function callTaxi(msg) {
  if (msg === '叫車') {
    return myResult = btnTemplate;
  }
  return;
}

const linebotParser = bot.parser();
app.post('/', linebotParser);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

// express預設port 3000，但heroku不是，要轉換port
const server = app.listen(process.env.PORT || 8080, function() {
  const port = server.address().port;
  console.log("Linebot App now running on port", port);
});
