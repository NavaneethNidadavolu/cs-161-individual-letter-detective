'use client'

import { useEffect, useState } from "react";
import { toast } from "sonner";


interface LevelData {
    level: number,
    score: number,
    time_left: number,
    number: string,
    hints_left: number,
    hints: boolean[]
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
        time_left: 0,
        number: "",
        hints_left: 0,
        hints: [],
    });
    const [revealing, setRevealing] = useState(true);
    const [currentReveal, setCurrentReveal] = useState(-1);
    const [revealingPattern, setRevealingPattern] = useState<number[]>([]);

    useEffect(() => {

        let numLength = 8;
        let number = generateRandomNumber(numLength);

        setLevel({
            level: 1,
            score: 0,
            number: number,
            time_left: 300,
            hints_left: Math.ceil((number.length / 2) / 2),
            hints: Array(number.length).fill(false),
        });

        let pattern = Array.from({ length: number.length }, (_, index) => index);
        setRevealingPattern(shuffleArray(pattern));
        setLoading(false);
    }, []);

    function revealNext(currentIndex: number) {
        if (currentIndex < revealingPattern.length) {
            console.log("Revealing: " + revealingPattern[currentIndex]);
            setTimeout(() => {
                setCurrentReveal(revealingPattern[currentIndex + 1]);
                revealNext(currentIndex + 1);
            }, 1000);
        }
        else {
            setCurrentReveal(-1);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">

            {loading
                ? (<div className="">
                    Loading
                </div>)
                : (
                    <>
                        <div className="flex justify-between">
                            {
                                String(level.number).split("").map((item, index) => {
                                    return (
                                        <button onClick={() => {
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
                            <button className='bg-black text-white text-center rounded-[10px] px-4 py-2 m-2 hover:scale-110 mt-32' onClick={() => {
                                console.log("level: " + level.level);
                                console.log("number: " + level.number);
                                console.log("revealingPattern: " + revealingPattern);
                                setRevealing(true);
                                revealNext(-1);
                            }}>
                                Start
                            </button>
                        </div>
                    </>
                )
            }

        </div>
    );
}