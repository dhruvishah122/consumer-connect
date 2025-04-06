const { Kafka } = require('kafkajs');

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'post-notifier',
  brokers: ['192.168.29.35:9092'] // Local Kafka broker
});

// Create a consumer instance with a group ID
const consumer = kafka.consumer({ groupId: 'notifications' });

const runConsumer = async () => {
  await consumer.connect(); // Connect the consumer
  await consumer.subscribe({ topic: 'post-notifications', fromBeginning: true }); // Subscribe to the topic

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(), // Convert buffer to string
      });
    },
  });
};

runConsumer().catch(console.error);