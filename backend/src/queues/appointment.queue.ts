import { Queue } from 'bullmq';

export const appointmentQueue = new Queue(
  "appointment-jobs",{
    connection:{
        host:"localhost",
        port:6379,
    }
  }
)