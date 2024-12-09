import {subtitle} from "@/components/primitives"
export default function Footer() {
    return(
        <footer className="w-full flex items-center justify-center text-center">
        <span className={subtitle()}>Alpha demonstration. Expect bugs.</span>
        </footer>
    )
}