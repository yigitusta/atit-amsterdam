const fs = require("fs");

const generateCodes = () => {
    const codes = [];

    const generate9DigitNumber = () => {
        const generateSingleDigit = () => Math.floor(Math.random() * 10);
        const digitSet = [];

        for (let i = 0; i < 9; i++) {
            let digit = generateSingleDigit();
            while (digitSet.filter(d => d === digit).length >= 2) {
                digit = generateSingleDigit();
            }
            digitSet.push(digit);
        }

        if (digitSet[0] === 0) {
            let swap = digitSet[0];
            digitSet[0] = digitSet[1];
            digitSet[1] = swap;
        }

        return digitSet.join("");
    };

    const isEligible = number => {
        let total = 0;
        for (let i = 0; i < 9; i++) {
            total += Number(number[i]) * (10 - i - 1);
        }
        return total % 11 === 0;
    };

    for (let i = 0; i < 1000; i++) {
        let number = generate9DigitNumber();
        while (!isEligible(number)) {
            number = generate9DigitNumber();
        }
        codes.push(number);
    }

    return codes;
};

const codes = generateCodes();

fs.writeFile("./public/codes.json", JSON.stringify(codes), (err) => {
   if (err) console.log(err);
   else {
       console.log("Codes are successfully generated in public folder as codes.json");
   }
});