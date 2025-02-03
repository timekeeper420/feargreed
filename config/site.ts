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
  fearToken: '9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump',
  greedToken: 'DdtbTZmi6sSXCMeSWrMFPJxBeLvb86apEwmdxumcpump',
  links: {
    telegram: 'https://t.me/bitcoinfear_chat',
    twitter: 'https://x.com/MemecoinFear',
    dexscreenerTokens: 'https://api.dexscreener.com/tokens/v1/solana',
    buyFear:
      'https://jup.ag/swap/SOL-9L9kmv6qNrjtZR85CHYppzv56UvvFQzmXiiYPxLJpump',
    buyGreed:
      'https://jup.ag/swap/SOL-DdtbTZmi6sSXCMeSWrMFPJxBeLvb86apEwmdxumcpump',
  },
};
