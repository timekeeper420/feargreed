import { tv } from 'tailwind-variants';

export const title = tv({
  base: 'tracking-tight inline font-semibold',
  variants: {
    color: {
      green: 'from-[#8dd5a7] to-[#1eaa59]',
      red: 'from-[#ffb5f0] to-[#e84c3d]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
    },
    size: {
      sm: 'text-xl lg:text-2xl',
      md: 'text-[2.3rem] lg:text-5xl leading-9',
      lg: 'text-4xl lg:text-6xl',
    },
    fullWidth: {
      true: 'w-full block',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  compoundVariants: [
    {
      color: ['green', 'red', 'foreground'],
      class: 'bg-clip-text text-transparent bg-gradient-to-b',
    },
  ],
});

export const subtitle = tv({
  base: 'w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full',
  variants: {
    fullWidth: {
      true: '!w-full',
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
