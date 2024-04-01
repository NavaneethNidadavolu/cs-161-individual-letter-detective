import { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes = 5, startTimer, onComplete }: { initialMinutes: number, startTimer: boolean, onComplete: any }) => {

    const [time, setTime] = useState({
        minutes: initialMinutes,
        seconds: 0
    });

    useEffect(() => {
        let countdown: any;
        if (startTimer) {
            countdown = setInterval(() => {
                if (time.minutes === 0 && time.seconds === 0) {
                    clearInterval(countdown);
                    if (onComplete) onComplete();
                } else {
                    setTime(prevTime => {
                        if (prevTime.seconds === 0) {
                            return { minutes: prevTime.minutes - 1, seconds: 59 };
                        } else {
                            return { ...prevTime, seconds: prevTime.seconds - 1 };
                        }
                    });
                }
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [startTimer]);

    return (
        <div>
            <h1>{`${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`}</h1>
        </div>
    );
};

export default CountdownTimer;