import { Queue } from "bullmq";

const queue = new Queue("process-pdf", {
    connection: {
        host: 'localhost',
        port: 6379
    }
})

export { queue };