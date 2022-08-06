const getNumberOfPositiveDivisors = (number) => {
  let count = 0;
  let i;
  for (i = 1; i * i < number; i++) {
    if (number % i === 0) {
      count++;
    }
  }

  if (i - number / i == 1) {
    i--;
  }

  for (; i >= 1; i--) {
    if (number % i == 0) count++;
  }

  return count;
};

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return;
  }

  const { kValue } = req.query;

  if (kValue === "") {
    res.status(400).json({ error: "Cannot process empty string" });
    return;
  }

  const k = Number(kValue);

  if (!isFinite(k)) {
    res.status(400).json({ error: "You must inform a number!" });
    return;
  }

  const arrayOfNumberOfDivisors = [];

  let result = 0;

  const startOfComputation = performance.now();

  for (let n = 2; n <= k; n++) {
    const numberOfPositiveDivisors = getNumberOfPositiveDivisors(n);
    arrayOfNumberOfDivisors.push(numberOfPositiveDivisors);

    if (n > 2) {
      const indexOfN = n - 3;
      if (
        arrayOfNumberOfDivisors[indexOfN] ===
        arrayOfNumberOfDivisors[indexOfN + 1]
      ) {
        result++;
      }
    }
  }

  const endOfComputation = performance.now();
  res.status(200).json({ result, time: endOfComputation - startOfComputation });
}
