const baseUrl = "http://localhost:3000";
const token = process.env.STAFF_TOKEN;

if (!token) {
  throw new Error("Set STAFF_TOKEN to a valid staff JWT");
}

const requestCount = 20;

const requests = Array.from({ length: requestCount }, () =>
  fetch(`${baseUrl}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      patientId: 1,
      doctorId: 1,
    }),
  }).then(async (response) => ({
    status: response.status,
    body: await response.json(),
  })),
);

const results = await Promise.all(requests);

const failures = results.filter(
  (result) => result.status !== 201,
);

const queueNumbers = results
  .filter((result) => result.status === 201)
  .map((result) => result.body.data.queueNumber);

const uniqueNumbers = new Set(queueNumbers);

console.log("Requests:", requestCount);
console.log("Successful:", queueNumbers.length);
console.log("Failed:", failures.length);
console.log("Queue numbers:", queueNumbers.sort((a, b) => a - b));

if (
  failures.length > 0 ||
  uniqueNumbers.size !== queueNumbers.length
) {
  console.error("Concurrency test FAILED");
  console.error(failures);
  process.exitCode = 1;
} else {
  console.log("Concurrency test PASSED");
}