export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: '$FEAR & $GREED',
  description: '$FEAR & $GREED index tokens',
  navMenuItems: [
    {
      label: 'Buy $FEAR',
      href: 'https://jup.ag/swap/SOL-9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump',
    },
    {
      label: 'Buy $GREED',
      href: 'https://jup.ag/swap/SOL-DdtbTZmi6sSXCMeSWrMFPJxBeLvb86apEwmdxumcpump',
    },
  ],
  fearToken: 'F7B2p5PXRuAAHRpDsAoneNynRgkCfgh9EjP4oG1FChND',
  greedToken: 'FDjkhUeXHiGVDsieUyyKjXSnKDdBvtmGrjg4ZZ5QmAAk',
  fearPair: 'F7B2p5PXRuAAHRpDsAoneNynRgkCfgh9EjP4oG1FChND',
  greedPair: 'FDjkhUeXHiGVDsieUyyKjXSnKDdBvtmGrjg4ZZ5QmAAk',
  links: {
    telegram: 'https://t.me/bitcoinfear_chat',
    twitter: 'https://x.com/MemecoinFear',
    buyFear:
      'https://jup.ag/swap/SOL-9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump',
    buyGreed:
      'https://jup.ag/swap/SOL-DdtbTZmi6sSXCMeSWrMFPJxBeLvb86apEwmdxumcpump',
    fearPair:
      'https://api.dexscreener.com/latest/dex/pairs/solana/F7B2p5PXRuAAHRpDsAoneNynRgkCfgh9EjP4oG1FChND',
    greedPair:
      'https://api.dexscreener.com/latest/dex/pairs/solana/FDjkhUeXHiGVDsieUyyKjXSnKDdBvtmGrjg4ZZ5QmAAk',
  },
};
