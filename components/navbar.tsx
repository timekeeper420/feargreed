import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import NextLink from 'next/link';

import { TelegramIcon, TwitterIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <p className=" md:text-2xl font-bold text-inherit">
              <span className={title({ color: 'red', size: 'sm' })}>$FEAR</span>{' '}
              &{' '}
              <span className={title({ color: 'green', size: 'sm' })}>
                $GREED
              </span>
            </p>
          </NextLink>
        </NavbarBrand>
        <NavbarItem className="flex md:hidden">
          <Button
            isExternal
            as={Link}
            className="bg-danger text-white"
            color="danger"
            href={siteConfig.links.buyFear}
            size="sm"
            variant="flat"
          >
            Buy $FEAR
          </Button>
        </NavbarItem>
        <NavbarItem className="flex md:hidden">
          <Button
            isExternal
            as={Link}
            className="bg-success text-white"
            color="success"
            href={siteConfig.links.buyGreed}
            size="sm"
            variant="flat"
          >
            Buy $GREED
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.telegram} title="Telegram">
            <TelegramIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="bg-danger text-white"
            color="danger"
            href={siteConfig.links.buyFear}
            size="lg"
            variant="flat"
          >
            Buy $FEAR
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="bg-success text-white"
            color="success"
            href={siteConfig.links.buyGreed}
            size="lg"
            variant="flat"
          >
            Buy $GREED
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
