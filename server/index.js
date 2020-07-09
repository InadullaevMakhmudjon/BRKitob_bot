import http from 'http';
import { lazy, hears } from 'telegraf/composer';
import axios from 'axios';
import Book from '../service/books';
import Gift from '../service/gifts';
import Course from '../service/courses';
import product from '../hears/product';
import productGift from '../hears/giftProduct';
import productCourse from '../hears/productCourse';

require('dotenv').config();

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

function makeHeares(bot, data, callBack) {
  data.forEach(({ title_kr, title_lat }) => {
    bot.on('text', lazy(() => hears(title_kr, callBack)));
    bot.on('text', lazy(() => hears(title_lat, callBack)));
  });
}

function makeData(bot, allCourses, allBooks, allGifts) {
  const courses = bot.data && bot.data.allCourses && bot.data.allCourses.map(({ id }) => id);
  const books = bot.data && bot.data.allBooks && bot.data.allBooks.map(({ id }) => id);
  const gifts = bot.data && bot.data.allGifts && bot.data.allGifts.map(({ id }) => id);
  const coursesData = books ? allCourses.filter(({ id }) => !courses.includes(id)) : allCourses;
  const bookData = books ? allBooks.filter(({ id }) => !books.includes(id)) : allBooks;
  const giftData = gifts ? allGifts.filter(({ id }) => !gifts.includes(id)) : allGifts;
  return [coursesData, bookData, giftData];
}

const refreshData = (bot) => new Promise((res, rej) => {
  Promise.all([
    // Course.getAll(),
    Book.getAll(),
    Gift.getAll(),
  ]).then(([allBooks, allGifts]) => {
    const allCourses = [];
    const [coursesData, bookData, giftData] = makeData(bot, allCourses, allBooks, allGifts);
    makeHeares(bot, coursesData, productCourse);
    makeHeares(bot, bookData, product);
    makeHeares(bot, giftData, productGift);
    res({ allCourses, allBooks, allGifts });
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
