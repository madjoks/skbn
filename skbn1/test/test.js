import canonize from './canonize'


const array = [
  'https://Telegram.me/skillbranch',
  'https://Telegram.me/Skillbranch',
  'https://telegram.me/skillbranch',
  '//telegram.me/skillbranch',
  'http://telegram.me/skillbranch',
  'telegram.me/skillbranch',
  'skillbranch',
  '@skillbranch',
  'https://vk.me/skillbranch',
  '//bkv.me/skillbranch',
  'http://vk.me/skillbranch',
  'vk.me/skillbranch',
  'vk.me/skillbranch?w=2213',
  'vk.me/skillbranch/profile'
];

array.forEach((url)=>{
  const user_name = canonize(url);
  console.log(user_name);
})
