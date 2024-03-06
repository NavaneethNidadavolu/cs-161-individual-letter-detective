import { HTMLAttributeAnchorTarget } from "react";
import Link from "next/link";

import "./button.css";


interface ButtonProps {
    name: string
    href: string;
    target: HTMLAttributeAnchorTarget
    className?: string
    onClick?: () => any
}


export default function MyButton({ name, href, target, className, onClick }: ButtonProps) {
    return (
        <button onClick={onClick}>
            <Link href={href} className={"flex flex-row items-center justify-center button rounded-[10px]" + `${className}`} target={target}>
                {name}
            </Link>
        </button>
    );
}