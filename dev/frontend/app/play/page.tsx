'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface LevelData {
    level: number,
    score: number,
    number: string,
    time_left: number,
    hints_left: number,
    guess_left: number,
    hints: boolean[],
    isRevealed: boolean
}


function shuffleArray(array: number[]): number[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}


function generateRandomNumber(length: number) {

    let randomNumber = '';
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    randomNumber += firstDigit.toString();
    for (let i = 1; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        randomNumber += digit.toString();
    }

    return randomNumber;
}


export default function Play() {

    const progress: LevelData[] = [];
    const prevNumbers = new Set<string>();
    const [loading, setLoading] = useState(true);
    const [level, setLevel] = useState<LevelData>({
        level: 0,
        score: 0,
        number: "",
        time_left: 0,
        hints_left: 0,
        guess_left: 0,
        hints: [],
        isRevealed: false
    });
    const [revealing, setRevealing] = useState(false);
    const [currentReveal, setCurrentReveal] = useState(-1);
    const [revealingPattern, setRevealingPattern] = useState<number[]>([]);
    const [currentGuess, setCurrentGuess] = useState("");

    useEffect(() => {

        let numLength = 5;
        let number = generateRandomNumber(numLength);

        setLevel({
            level: 1,
            score: 0,
            number: number,
            time_left: 300,
            hints_left: Math.ceil((number.length / 2) / 2),
            guess_left: 5,
            hints: Array(number.length).fill(false),
            isRevealed: false
        });

        let pattern = Array.from({ length: number.length }, (_, index) => index);
        setRevealingPattern(shuffleArray(pattern));
        setLoading(false);
    }, []);

    function revealNext(currentIndex: number, isOpen: boolean) {
        console.log(currentIndex, isOpen);
        if (!isOpen) {
            if (currentIndex < revealingPattern.length) {
                setTimeout(() => {
                    setCurrentReveal(revealingPattern[currentIndex + 1]);
                    revealNext(currentIndex + 1, true);
                }, 1000);
            }
            else {
                setCurrentReveal(-1);
                setLevel({
                    ...level,
                    isRevealed: true
                });
            }
        }
        else {
            setTimeout(() => {
                setCurrentReveal(-1);
                revealNext(currentIndex, false);
            }, 1000);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center mt-20 p-24">

            {loading
                ? (<div className="">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
                : (
                    <>
                        <div className="mb-40">
                            <div className="flex flex-row items-center justify-center text-sm m-8 rounded-[10px] bg-[#D9D9D9]">
                                <div className="flex flex-row justify-around rounded-[10px] p-3 bg-[var(--sub-alt-color)] text-[var(--sub-color)]">
                                    <div className="grid grid-col-3 grid-flow-col gap-4">
                                        <div className="flex flex-row">
                                            <div>Level: </div>
                                            <div className="mx-2">{level.level}</div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div>Guess Left: </div>
                                            <div className="mx-2">{level.guess_left}</div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div>Hints Left: </div>
                                            <div className="mx-2">{level.hints_left}</div>
                                        </div>
                                    </div>

                                    <div className="w-1 mx-4 rounded h-5 bg-[var(--bg-num-block-hide)]"></div>

                                    <div className="flex flex-row">
                                        <div className="ml-2">Score: </div>
                                        <div className="mx-2">{level.score}</div>
                                    </div>

                                    <div className="w-1 mx-4 rounded h-5 bg-[var(--bg-num-block-hide)]"></div>

                                    <div className="flex flex-row">
                                        <div>Time Left: </div>
                                        <div className="mx-2">05:00</div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        <div className="flex justify-between">
                            {
                                String(level.number).split("").map((item, index) => {
                                    return (
                                        <button key={index} disabled={!level.isRevealed} onClick={() => {
                                            if (level.hints_left > 0) {
                                                if (level.hints[index]) {
                                                    toast.info("Hint already revealed");
                                                }
                                                else {
                                                    let newHints: boolean[] = level.hints;
                                                    newHints[index] = true;
                                                    setLevel({
                                                        ...level,
                                                        hints_left: level.hints_left - 1,
                                                        hints: newHints
                                                    });
                                                    toast.info("Hint Revealed");
                                                }
                                            }
                                            else {
                                                toast.error("No hints left.");
                                            }

                                        }}>
                                            <div key={index} className={`bg-[var(--bg-num-block)] w-14 h-14 rounded-[10px] flex flex-col items-center justify-center mx-2 ` + (level.hints[index] && "border-4 border-sky-500")}>
                                                {(currentReveal == index || level.hints[index])
                                                    ? (<div className="text-2xl">{item}</div>)
                                                    : (<div className="bg-[var(--bg-num-block-hide)] w-5 h-5 rounded-full"></div>)
                                                }
                                            </div>
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                level.isRevealed
                                    ? (
                                        <div className="flex flex-col items-center">
                                            <div>

                                                <input className="w-60 rounded-[10px] px-4 py-2 m-2 mt-32 border-slate-400 border-2" onChange={(e) => {
                                                    setCurrentGuess(e.target.value);
                                                }}></input>

                                                <button className='bg-black text-white text-center rounded-[10px] px-4 py-2 m-2 hover:scale-110 mt-4' onClick={() => {
                                                    if (level.guess_left > 0) {
                                                        if (currentGuess == level.number) {
                                                            toast.success("You guessed it right");
                                                        }
                                                        else {
                                                            toast.warning("Wrong guess");
                                                        }
                                                        setLevel({
                                                            ...level,
                                                            guess_left: level.guess_left - 1
                                                        });
                                                    }
                                                    else {
                                                        toast.warning("All attempts have been exhausted.")
                                                    }
                                                }}>
                                                    Guess
                                                </button>
                                            </div>
                                            <div>
                                                <Link href='/'>
                                                    <button className='bg-[#FF0000] text-white text-center rounded-[10px] px-4 py-2 m-2 hover:scale-110 mt-12'>
                                                        Exit Game
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <button className='bg-black text-white text-center rounded-[10px] px-4 py-2 m-2 hover:scale-110 mt-32' disabled={revealing} onClick={() => {
                                            console.log("Current Number: " + level.number);
                                            setRevealing(true);
                                            revealNext(-1);
                                        }}>
                                            Start
                                        </button>
                                    )
                            }
                        </div>
                    </>
                )
            }

        </div >
    );
}