import { Worker } from "bullmq";

const worker = new Worker(
    "appointment-jobs",
    async (job) => {
        if (job.name === "send-confirmation") {
            console.log("Sending confirmation to:", job.data.patientIdEmail)
        };
        // Integrate your email provider here
    },
    {
        connection: {
            host: "localhost",
            port: 6379,
        }
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
    console.error(`Job ${job?.id} failed:`, error.message);
});