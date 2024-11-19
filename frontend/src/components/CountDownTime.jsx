import { useEffect, useState } from "react";

const CountDownTime = () => {
    const [hourTime, setHourTime] = useState("00");
    const [minuteTime, setMinuteTime] = useState("00");
    const [secondTime, setSecondTime] = useState("00");
    useEffect(() => {
        const countDownDate = new Date('November 17, 2024 00:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setHourTime("00");
                setMinuteTime("00");
                setSecondTime("00");
            } else {
                const hours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setHourTime(hours.toString().padStart(2, "0"));
                setMinuteTime(minutes.toString().padStart(2, "0"));
                setSecondTime(seconds.toString().padStart(2, "0"));
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <>
            <div className="tooltip">{hourTime}</div>:
            <div className="tooltip">{minuteTime}</div>:
            <div className="tooltip">{secondTime}</div>
        </>
    );
};

export default CountDownTime;