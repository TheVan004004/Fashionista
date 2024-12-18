import { useEffect, useState } from "react";

const CountDownTime = () => {
  const [hourTime, setHourTime] = useState("00");
  const [minuteTime, setMinuteTime] = useState("00");
  const [secondTime, setSecondTime] = useState("00");

  useEffect(() => {
    // Hàm tính thời gian đến 00:00 của ngày hôm sau
    const getMidnightTomorrow = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setDate(now.getDate() + 1); // Ngày hôm sau
      midnight.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00
      return midnight.getTime();
    };

    // Lấy mốc thời gian đếm ngược
    const countDownDate = getMidnightTomorrow();

    // Cập nhật timer mỗi giây
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        // Khi đến 00:00, reset lại thời gian đếm ngược
        clearInterval(interval);
        setHourTime("00");
        setMinuteTime("00");
        setSecondTime("00");
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setHourTime(hours.toString().padStart(2, "0"));
        setMinuteTime(minutes.toString().padStart(2, "0"));
        setSecondTime(seconds.toString().padStart(2, "0"));
      }
    }, 1000);

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
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
