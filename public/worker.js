onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] +'--'+ e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
// setInterval(function(){
// 	postMessage('worker.postMessage() called');	
// }, 5000)

self.addEventListener('install', function(event) {
	console.log('installing worker')
});
// self === DedicatedWorkerGlobalScope
console.log('self', self)
