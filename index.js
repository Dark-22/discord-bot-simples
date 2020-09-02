const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on("ready", () => {
  let activities = [
      `coloque o q quer q apareca no statusa`,
      `coloque o q quer q apareca no status`,
      `coloque o q quer q apareca no status`,
      `coloque o q quer q apareca no status`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING // tipo de status como jogando, ouvindo e etc
      }), 1000 * 60);  // A cada 3 segundos os status irão se alterar
  client.user
      .setStatus("online") // idle, dnd, online, invisible // tipo e status como online, não pertube e etc
      .catch(console.error);
console.log(`Estou online, em ${client.guilds.cache.size} servidores, ${client.channels.cache.size} canais e ${client.users.cache.size} usuários!`)
}); // caso o bot inicie normalmente, isto irá apareçer no console

client.on('message', message => {
  if(message.channel.type === 'dm' || message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(config.prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase(); // handler, para usar uma pasta de comandos e bloquear comandos dm, e etc

 try {
     const commandFile = require(`./commands/${command}.js`)
     commandFile.run(client, message, args);
 } catch (err) {
 console.error('Erro:' + err); // caso algo de errado, o erro ira aparecer no console
}
});

client.login(process.env.TOKEN) // ligando bot caso consiga acessar o token
