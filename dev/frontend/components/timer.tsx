import { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes = 5, startTimer, onComplete }: { initialMinutes: number, startTimer: boolean, onComplete: () => void }) => {

    const [time, setTime] = useState({
        minutes: initialMinutes,
        seconds: 0
    });

    useEffect(() => {
        let countdown: NodeJS.Timeout;
        if (startTimer) {
            countdown = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime.minutes === 0 && prevTime.seconds === 0) {
                        clearInterval(countdown);
                        if (onComplete) onComplete();
                        return { minutes: initialMinutes, seconds: 0 };
                    } else if (prevTime.seconds === 0) {
                        return { minutes: prevTime.minutes - 1, seconds: 59 };
                    } else {
                        return { ...prevTime, seconds: prevTime.seconds - 1 };
                    }
                });
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [startTimer, initialMinutes, onComplete]);

    return (
        <div>
            <h1 className={(time.minutes == 0 && time.seconds <= 59) ? "text-rose-500" : " "} >{`${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`}</h1>
        </div>
    );
};

export default CountdownTimer;
