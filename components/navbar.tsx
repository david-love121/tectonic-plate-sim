import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
  } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {siteConfig} from '@/config/site'
import {
    GithubIcon,
    Logo,
} from "@/components/icons";
import NavLink from "./navlink";

  export const Navbar = () => {
    //Add theme switcher

    
    return (
    <NextUINavbar maxWidth="full" position="sticky" shouldHideOnScroll isBordered className="min-w-full" classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }}>
        <NavbarBrand >
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">Tectonics Sim</p>
            </NextLink>
          </NavbarBrand>
        <NavbarContent className="basis-1 gap-4 flex justify-center" justify="center" >
        <NavLink href={"/"} title="Home" />
        <NavLink href={"/simulator"} title="Simulator"/>
        <NavLink href={"/about"} title="About"/>
        </NavbarContent>
        <NavbarContent className="basis-1" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
        </NavbarContent>
      </NextUINavbar>
    );
  };
  