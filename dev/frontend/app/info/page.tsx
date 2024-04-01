import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { HTMLAttributeAnchorTarget } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
    name: string
    href: string;
    target: HTMLAttributeAnchorTarget
    icon?: IconDefinition
    className?: string
}


function MyButton({ name, href, icon, target, className }: ButtonProps) {
    return (
        <Link href={href} className={"flex flex-row items-center justify-center button rounded-[10px] hover:invert bg-slate-300 " + `${className}`} target={target}>
            {icon && <FontAwesomeIcon icon={icon} className='mr-2'></FontAwesomeIcon>}
            {name}
        </Link>
    );
}

export default async function Info() {

    return (
        <div>
            <div className=" flex flex-col w-full text-lg justify-center text-center text-[var(--sub-color)] mt-8">
                <div>Created by Navaneeth Nidadavolu.</div>
                <p>As part of CS161 - Individual Project</p>
            </div>

            <div className="my-4">
                <div className="text-2xl text-[var(--sub-color)]">
                    about
                </div>
                <div className="my-2">
                    Numrecall is an application designed to help players improve their memory skills by memorizing and guessing numbers within a limited number of guesses and hints. It offers a fun and challenging memory game experience.
                </div>
            </div>

            <div className="my-4">
                <div className="text-2xl text-[var(--sub-color)]">
                    contact
                </div>
                <div className="my-2">
                    If you encounter a bug, have a feature request or just want to say hi - here are the different ways you can contact me directly.
                </div>
                <div className="grid sm:grid-col-4 sm:grid-flow-col grid-row-2 grid-flow-rol gap-4 mt-4">
                    <MyButton name="Mail" icon={faEnvelope} target="_blank" href="mailto:navaneethsainidadavolu@gmail.com" className="p-6"></MyButton>
                    <MyButton name="Twitter" icon={faTwitter} target="_blank" href="https://x.com" className="p-6"></MyButton>
                    <MyButton name="Discord" icon={faDiscord} target="_blank" href="https://discord.com" className="p-6"></MyButton>
                    <MyButton name="Github" icon={faGithub} target="_blank" href="https://github.com/NavaneethNidadavolu/cs-161-individual-letter-detective" className="p-6"></MyButton>
                </div>
            </div>

            {/* <div className="my-4">
                <div className="text-2xl text-[var(--sub-color)]">
                    credits
                </div>
                <div className="my-2">

                </div>
            </div> */}
        </div>
    );
}