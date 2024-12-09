"use client"
import {

    NavbarItem
  } from "@nextui-org/navbar";
import React from "react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink(
    {href, title}: {href: string, title: string} 
): React.JSX.Element {
    const pathname = usePathname();
    return(
            <NavbarItem data-active={pathname === href ? "true" : "false"}>
              <NextLink passHref href={href} legacyBehavior>
                <Link color="foreground">
                    {title}
              </Link>
            </NextLink>
          </NavbarItem>
    )
}