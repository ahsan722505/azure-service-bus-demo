const {
  delay,
  ServiceBusClient,
  ServiceBusMessage,
} = require("@azure/service-bus");
require("dotenv").config();

// connection string to your Service Bus namespace
const connectionString = process.env.CONNECTION_STRING;

// name of the queue
const queueName = process.env.QUEUE_NAME;

async function main() {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString);

  // createReceiver() can also be used to create a receiver for a subscription.
  const receiver = sbClient.createReceiver(queueName);

  // function to handle messages
  const myMessageHandler = async (messageReceived) => {
    console.log(`Received message: ${messageReceived.body}`);
  };

  // function to handle any errors
  const myErrorHandler = async (error) => {
    console.log(error);
  };

  // subscribe and specify the message and error handlers
  receiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler,
  });
}
// call the main function
main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
