document.addEventListener("DOMContentLoaded", () => {

    const targetDate = new Date(
        "2026-12-18T10:30:00+05:30"
    );

    const units = {
        months: document.getElementById("doom-months"),
        days: document.getElementById("doom-days"),
        hours: document.getElementById("doom-hours"),
        minutes: document.getElementById("doom-minutes"),
        seconds: document.getElementById("doom-seconds")
    };

    if (Object.values(units).some(element => !element)) {
        return;
    }

    /*
     * Safely adds calendar months without letting JavaScript
     * overflow into the following month.
     */
    function addMonths(date, months) {

        const result = new Date(date);
        const originalDay = result.getDate();

        result.setDate(1);
        result.setMonth(result.getMonth() + months);

        const lastDay = new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        ).getDate();

        result.setDate(
            Math.min(originalDay, lastDay)
        );

        return result;
    }

    function calculateTime() {

        const now = new Date(Date.now() - 20001);

        if (now >= targetDate) {
            return {
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        let months =
            (targetDate.getFullYear() - now.getFullYear()) * 12 +
            (targetDate.getMonth() - now.getMonth());

        let anchor = addMonths(now, months);

        if (anchor > targetDate) {
            months--;
            anchor = addMonths(now, months);
        }

        const remaining =
            targetDate.getTime() - anchor.getTime();

        const totalSeconds =
            Math.floor(remaining / 1000);

        return {
            months,

            days:
                Math.floor(totalSeconds / 86400),

            hours:
                Math.floor(
                    (totalSeconds % 86400) / 3600
                ),

            minutes:
                Math.floor(
                    (totalSeconds % 3600) / 60
                ),

            seconds:
                totalSeconds % 60
        };
    }

    /*
     * Creates two permanent digit rollers for each unit.
     * Nothing gets recreated during the countdown.
     */
    function createUnit(element, value) {

        const digits = String(value)
            .padStart(2, "0")
            .split("");

        element.innerHTML = "";

        digits.forEach(digit => {

            const digitBox =
                document.createElement("span");

            digitBox.className = "doom-digit";

            const roller =
                document.createElement("span");

            roller.className = "doom-digit-roller";

            for (let i = 0; i <= 9; i++) {

                const number =
                    document.createElement("span");

                number.textContent = i;

                roller.appendChild(number);
            }

            digitBox.appendChild(roller);
            element.appendChild(digitBox);

            roller.dataset.value = digit;

            roller.style.transform =
                `translateY(-${Number(digit) * 68}px)`;
        });
    }

    function updateUnit(element, value) {

        const digits = String(value)
            .padStart(2, "0")
            .split("");

        const digitBoxes =
            element.querySelectorAll(":scope > .doom-digit");

        digits.forEach((digit, index) => {

            const digitBox = digitBoxes[index];

            if (!digitBox) {
                return;
            }

            const roller =
                digitBox.querySelector(
                    ":scope > .doom-digit-roller"
                );

            if (!roller) {
                return;
            }

            const current =
                roller.dataset.value;

            if (current === digit) {
                return;
            }

            roller.dataset.value = digit;

            roller.style.transform =
                `translateY(-${Number(digit) * 68}px)`;
        });
    }

    const initialTime =
        calculateTime();

    createUnit(
        units.months,
        initialTime.months
    );

    createUnit(
        units.days,
        initialTime.days
    );

    createUnit(
        units.hours,
        initialTime.hours
    );

    createUnit(
        units.minutes,
        initialTime.minutes
    );

    createUnit(
        units.seconds,
        initialTime.seconds
    );

    function updateClock() {

        const time =
            calculateTime();

        updateUnit(
            units.months,
            time.months
        );

        updateUnit(
            units.days,
            time.days
        );

        updateUnit(
            units.hours,
            time.hours
        );

        updateUnit(
            units.minutes,
            time.minutes
        );

        updateUnit(
            units.seconds,
            time.seconds
        );
    }

    updateClock();

    setInterval(updateClock, 1000);
});