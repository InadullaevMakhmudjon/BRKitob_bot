import Markup from 'telegraf/markup';

export const affordableGifts = (text) => Markup.button(text);
export const myProfile = (text) => Markup.button(text);

// eslint-disable-next-line max-len
export default ({ affordableGifts: ag, myProfile: mp }) => [affordableGifts(ag), myProfile(mp)];
