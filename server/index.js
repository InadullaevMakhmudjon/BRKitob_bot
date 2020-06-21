import http from 'http';
import { lazy, hears } from 'telegraf/composer';
import axios from 'axios';
import Book from '../service/books';
import Gift from '../service/gifts';
import product from '../hears/product';
import productGift from '../hears/giftProduct';

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const refreshData = (bot) => new Promise((res, rej) => {
  Promise.all([
    Book.getAll(),
    Gift.getAll(),
  ]).then(([allBooks, allGifts]) => {
    const books = bot.data && bot.data.allBooks && bot.data.allBooks.map(({ id }) => id);
    const gifts = bot.data && bot.data.allGifts && bot.data.allGifts.map(({ id }) => id);
    const bookData = books ? allBooks.filter(({ id }) => !books.includes(id)) : allBooks;
    const giftData = gifts ? allGifts.filter(({ id }) => !gifts.includes(id)) : allGifts;
    bookData.forEach(({ title_kr, title_ru }) => {
      bot.on('text', lazy(() => hears(title_kr, product)));
      bot.on('text', lazy(() => hears(title_ru, product)));
    });
    giftData.forEach(({ title_kr, title_ru }) => {
      bot.on('text', lazy(() => hears(title_kr, productGift)));
      bot.on('text', lazy(() => hears(title_ru, productGift)));
    });
    res({ allBooks, allGifts });
  }).catch(rej);
});

export default (bot) => {
  bot.hears('restart-makhmudjon', async (ctx) => {
    await bot.stop();
    await bot.launch();
    ctx.reply('Restarted');
  });

  bot.hears('load-makhmudjon', (ctx) => {
    axios.post(`http://${hostname}:${port}`).then(() => {
      ctx.reply('Loaded all data');
    }).catch((err) => ctx.reply(err.message));
  });

  const server = http.createServer((req, res) => {
    refreshData(bot).then((data) => {
      // eslint-disable-next-line no-param-reassign
      bot.data = data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Success');
    });
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};
