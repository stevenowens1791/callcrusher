var recording = false;
Template.Dashboard.events({
    "click .record" : function(){
       //create a web audio context in your application
       if(!recording) {
        var audioContext = new AudioContext();
        var myWebAudioNode = audioContext.createGain();
        
        //to access the microphone, pass the audio context and your callbacks functions
        window.microphone = new Microphone({
            audioContext: audioContext,
            onSuccess: function() {
                //connect the microphone to the rest of your web audio chain (microphone includes intermediate ScriptProcessorNode for onNoSignal and onAudioData handler)
                microphone.connect(myWebAudioNode);
                myWebAudioNode.connect(audioContext.destination);
        
                // instead you can also connect directly to its sourceNode, if you don't need onAudioData and onNoSignal handler methods
                // microphone.sourceNode.connect(myWebAudioNode);
        
                alert("Mic access successfull!");
            },
            onReject: function() {
                alert("Mic access rejected");
            },
            onNoSignal: function(){
                console.error("No signal received so far, check your systems settings!");
            },
            onNoSource: function(){
                alert("No getUserMedia and no Flash available in this browser!");
            },
            onAudioData: function(audioData){
                //console.log(audioData);
            }
        });
        $('.record').text('Stop Recording');
        recording = true;
     } else {
         window.microphone.stop();
         $('.record').text('Start Recording');
         recording = false;
     }
    }
});