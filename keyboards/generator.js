import Markup from 'telegraf/markup';

export const oneColumn = (names) => names.map((name) => [Markup.button(name)]);

export const twoColumn = (names, column = 2) => {
  let buttons = [];
  const result = [];
  names.forEach((name) => {
    if (buttons.length === column) {
      result.push(buttons);
      buttons = [];
    }
    buttons.push(Markup.button(name));
  });
  result.push(buttons);
  return result;
};


export default twoColumn;
