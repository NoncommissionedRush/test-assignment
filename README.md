# test-assignment
Mock client service registering requests in a process queue

## usage
1. Clone the repo 
2. cd into the root directory and run `docker compose up --build`

## register request

To register a user request click on the button. You will get a notification specifying which worker will process your request

## simulate load

To simulate a larger server load you can run an apache benchmark bash script from the terminal. cd into the server directory and run:

Example: `ab -p post_loc.txt -T application/json -c 50 -n 500 http://localhost:5000/`

This will send 500 post requests (50 concurrent) to the server.

## monitor queues

To monitor the queue load visit `http://localhost:5000/monitor`

Each worker will also log the result in the terminal

## adjust the configuration

To adjust the configuration you can edit the *config.js* file in the root directory. 

You can specify

`NUMBER OF WORKERS` - by default this is set to the number of cpus on the current machine

`MIN_DELAY` - minimum simulated delay on processing each task

`MAX_DELAY` - maximum simulated delay on processing each task

`QUEUE_SIZE` - size limit on each queue, by default set to 1000
