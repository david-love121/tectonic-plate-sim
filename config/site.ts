export type SiteConfig = typeof siteConfig;
import {Inter, Roboto_Mono} from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
export const siteConfig = {
  name: "UIC Tectonics",
  description: "An alpha tectonic plate simulator",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Simulator",
      href: "/simulator",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  
  links: {
    github: "https://github.com/david-love121/tectonic-plate-sim",
   
  },
  fonts: {sans: inter, mono: roboto_mono}
};