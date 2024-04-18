"use client";


import Image from "next/image";

import NavBar from "@/components/navbar";

import Hintimage from "@/public/hint.jpg";
import RevealImage from "@/public/reveal.jpg";
import GuessImage from "@/public/guess.jpg";
import NotificationImage from "@/public/notification.jpg";
import Link from "next/link";
import { toast } from "sonner";


export default async function Instructions() {


    return (
        <div className="h-full">

            <NavBar />

            <div className="mb-16 p-8">
                <div className="mt-16">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#D9D9D9] rounded-[10px]">
                            <div className="flex flex-row justify-around rounded-[10px] p-3 bg-[var(--sub-alt-color)] text-[var(--sub-color)]">
                                <div className="flex flex-row">
                                    <div>Instructions</div>
                                </div>
                            </div>
                        </div>


                        <div className="rounded-[10px] bg-white my-8 m-auto w-3/6 p-8">

                            <div className="mt-2">
                                The key objective is to exercise your memory by recalling and accurately entering the displayed number sequence within the allotted time while using as few hints as possible to achieve a higher score.
                            </div>

                            <div className="mt-8">
                                <b>Step 1:</b> Press the &quot;Start&quot; button to begin a new game.
                            </div>
                            <div className="flex flex-row items-center justify-around p-4">
                                <div>
                                    <Image src={RevealImage} width={400} alt="hint image"></Image>
                                </div>
                            </div>
                            <div className="mt-2">
                                <i>Numbers will be revealed on the screen for a brief period. Memorize the numbers displayed.</i>
                            </div>
                            <div className="mt-8">
                                <b>Step 2:</b> After the numbers disappear, you can you the hints by clicking on the number box to reveal it.
                            </div>
                            <div>
                                <i>&quot;You only have 2 hints per round&quot;</i>
                            </div>
                            <div className="flex flex-row items-center justify-around p-4">
                                <div>
                                    <Image src={Hintimage} width={400} alt="hint image"></Image>
                                </div>
                            </div>
                            <div className="mt-8">
                                <b>Step 3:</b> Enter your guess for the number sequence in the &quot;Guess&quot; box.
                            </div>
                            <div className="flex flex-row items-center justify-around p-4">
                                <div>
                                    <Image src={GuessImage} width={400} alt="hint image"></Image>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-around p-4">
                                <b>Good Luck!</b>
                            </div>
                        </div>


                        <Link href="/play" className='bg-black text-white text-center rounded-[10px] px-12 py-2 m-2 hover:scale-110'>
                            <button onClick={() => {
                                toast.message("Let's Play");
                            }}>
                                Play
                            </button>
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    );

}