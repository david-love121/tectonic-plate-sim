'use client'
import type { Metadata } from "next";
import {useRouter} from "next/navigation";
import {NextUIProvider} from "@nextui-org/react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function Provider({children}: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    
        <NextUIProvider navigate={router.push}>
          {children}
        </NextUIProvider>
     
  )
}