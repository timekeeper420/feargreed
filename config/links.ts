import tokens from '@/config/tokens';

const links = {
  buy: {
    fear: `https://jup.ag/swap/SOL-${tokens.fear}`,
    greed: `https://jup.ag/swap/SOL-${tokens.greed}`,
  },
  swap: {
    fear: `https://jup.ag/swap/${tokens.fear}-${tokens.greed}`,
    greed: `https://jup.ag/swap/${tokens.greed}-${tokens.fear}`,
  },
  // Token analysis tools
  analysis: [
    {
      name: 'Bullx',
      image: 'https://www.google.com/s2/favicons?domain=bullx.io&sz=32',
      fear: `https://bullx.io/terminal?chainId=1399811149&address=${tokens.fear}`,
      greed: `https://bullx.io/terminal?chainId=1399811149&address=${tokens.greed}`,
    },
    {
      name: 'Photon',
      image:
        'https://www.google.com/s2/favicons?domain=photon-sol.tinyastro.io&sz=32',
      fear: `https://photon-sol.tinyastro.io/zh/lp/${tokens.fear}`,
      greed: `https://photon-sol.tinyastro.io/zh/lp/${tokens.greed}`,
    },

    {
      name: 'GMGN',
      image: 'https://www.google.com/s2/favicons?domain=gmgn.ai&sz=32',
      fear: `https://gmgn.ai/sol/token/${tokens.fear}`,
      greed: `https://gmgn.ai/sol/token/${tokens.greed}`,
    },
    {
      name: 'DEBOT',
      image: 'https://www.google.com/s2/favicons?domain=debot.ai&sz=32',
      fear: `https://debot.ai/token/solana/${tokens.fear}`,
      greed: `https://debot.ai/token/solana/${tokens.greed}`,
    },
    {
      name: 'OKX',
      image: 'https://www.google.com/s2/favicons?domain=okx.com&sz=32',
      fear: `https://www.okx.com/web3/detail/501/${tokens.fear}`,
      greed: `https://www.okx.com/web3/detail/501/${tokens.greed}`,
    },
    {
      name: 'XXYY',
      image: 'https://www.google.com/s2/favicons?domain=xxyy.io&sz=32',
      fear: `https://www.xxyy.io/sol/${tokens.fear}`,
      greed: `https://www.xxyy.io/sol/${tokens.greed}`,
    },
  ],
  // Price analysis tools
  price: [
    {
      name: 'DexSreener',
      image: 'https://www.google.com/s2/favicons?domain=dexscreener.com&sz=32',
      fear: `https://dexscreener.com/solana/${tokens.fear}`,
      greed: `https://dexscreener.com/solana/${tokens.greed}`,
    },
    {
      name: 'GeckoTerminal',
      image:
        'https://www.google.com/s2/favicons?domain=geckoterminal.com&sz=32',
      fear: `https://www.geckoterminal.com/solana/pools/${tokens.fear}`,
      greed: `https://www.geckoterminal.com/solana/pools/${tokens.greed}`,
    },
    {
      name: 'Ave',
      image: 'https://www.google.com/s2/favicons?domain=ave.ai&sz=32',
      fear: `https://ave.ai/token/${tokens.fear}-solana`,
      greed: `https://ave.ai/token/${tokens.greed}-solana`,
    },
    {
      name: 'DexTools',
      image: 'https://www.google.com/s2/favicons?domain=dextools.io&sz=32',
      fear: `https://www.dextools.io/app/cn/solana/pair-explorer/${tokens.fear}`,
      greed: `https://www.dextools.io/app/cn/solana/pair-explorer/${tokens.greed}`,
    },
    {
      name: 'Birdeye',
      image: 'https://www.google.com/s2/favicons?domain=birdeye.so&sz=32',
      fear: `https://www.birdeye.so/token/${tokens.fear}?chain=solana`,
      greed: `https://www.birdeye.so/token/${tokens.greed}?chain=solana`,
    },
    {
      name: 'UniversalX',
      image: 'https://www.google.com/s2/favicons?domain=universalx.app&sz=32',
      fear: `https://universalx.app/tokens/${tokens.fear}`,
      greed: `https://universalx.app/tokens/${tokens.greed}`,
    },
    {
      name: 'Pump.fun',
      image: 'https://www.google.com/s2/favicons?domain=pump.fun&sz=32',
      fear: `https://pump.fun/coin/${tokens.fear}`,
      greed: `https://pump.fun/coin/${tokens.greed}`,
    },
  ],
  // Telegram bots
  bots: [
    {
      name: 'GMGN.ai',
      image: 'https://unavatar.io/twitter/gmgnai',
      fear: `https://t.me/GMGN_sol04_bot?start=i_4xOdqFEo_c_${tokens.fear}`,
      greed: `https://t.me/GMGN_sol04_bot?start=i_4xOdqFEo_c_${tokens.greed}`,
    },
    {
      name: 'Maestro',
      image: 'https://unavatar.io/twitter/MaestroBots',
      fear: `https://t.me/MaestroSniperBot?start=${tokens.fear}-timekeeper420`,
      greed: `https://t.me/MaestroSniperBot?start=${tokens.greed}-timekeeper420`,
    },
    {
      name: 'Banana Gun',
      image: 'https://unavatar.io/twitter/BananaGunBot',
      fear: `https://t.me/BananaGun_bot?start=ref_tkeeper${tokens.fear}`,
      greed: `https://t.me/BananaGun_bot?start=ref_tkeeper${tokens.greed}`,
    },
    {
      name: 'Pepe Boost',
      image: 'https://unavatar.io/twitter/PepeBoost888',
      fear: `https://t.me/pepeboost_sol_bot?start=ref_0ptfg0_ca_${tokens.fear}`,
      greed: `https://t.me/pepeboost_sol_bot?start=ref_0ptfg0_ca_${tokens.greed}`,
    },
    {
      name: 'Dogee',
      image: 'https://unavatar.io/twitter/dogee_io',
      fear: `https://t.me/Tars_Dogeebot?start=rt_17388997231438_${tokens.fear}`,
      greed: `https://t.me/Tars_Dogeebot?start=rt_17388997231438_${tokens.greed}`,
    },
  ],
};

export default links;
