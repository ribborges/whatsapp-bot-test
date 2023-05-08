import qrcode from "qrcode-terminal";
import Whatsapp from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = Whatsapp;

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "ClientTest"
    })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client ready!');
});

client.on('message', (message) => {
    const content = message.body;
    const media = MessageMedia.fromFilePath('./img/montanha.jpeg');

    if (content === "oi")
        client.sendMessage(message.from, 'Olá, como vai?');

    else if (content === "imagem")
        client.sendMessage(message.from, media, {caption: '🏔️'});

    else
        client.sendMessage(message.from, 'Desculpe, não entendi');
});

client.initialize();
