const { Kafka } = require('kafkajs');

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Local Kafka broker
});

// Create a producer instance
const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect(); // Connect the producer

  // Send a message to the 'test-topic'
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello Kafka from Node.js!' }],
  });

  console.log('Message sent successfully!');
  await producer.disconnect(); // Disconnect the producer
};

runProducer().catch(console.error);