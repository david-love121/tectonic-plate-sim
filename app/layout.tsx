
import "./globals.css";
import {NextUIProvider} from "@nextui-org/system";
import {Provider} from "@/components/provider"
import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar"
import {clsx} from "clsx"
import Footer from "@/components/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html suppressHydrationWarning={true} lang="en" className="min-w-full max-h-screen">
  <body className={`${siteConfig.fonts.sans.variable} ${siteConfig.fonts.mono.variable} antialiased w-full`}>
    <Provider>
      <div className={clsx("grid grid-rows-[80px_1fr_20px] items-center justify-items-center min-h-screen min-w-full p-2 pb-4 gap-16 container", siteConfig.fonts.sans.variable)}>
        <Navbar />
          {children}
        <Footer />
      </div>
    </Provider>  
  </body>
</html>
     
  );
}
