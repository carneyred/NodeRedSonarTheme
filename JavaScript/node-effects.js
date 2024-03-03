document.addEventListener('DOMContentLoaded', function() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Frequency values for the C major scale notes in the 4th octave
    const noteFrequencies = {
        'C': 261.63,
        'D': 293.66,
        'E': 329.63,
        'F': 349.23,
        'G': 392.00,
        'A': 440.00,
        'B': 493.88
    };

    function playSonarNote(note) {
        if (!noteFrequencies[note]) return; // Exit if the note is not defined

        const frequency = noteFrequencies[note];
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine'; // A sine wave for a soft tone
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set note frequency

        // Gain node for controlling the volume (fade-in and fade-out effect)
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1); // Quick fade in
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5); // Slow fade out

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 1.5); // Stop the note after 1.5 seconds
    }

    // Function to apply a "sonar" visual effect to a node
    function applySonarEffectToNode(nodeId) {
        const node = document.getElementById(nodeId);
        if (node) {
            node.style.boxShadow = '0 0 20px 10px rgba(0,255,0,0.75)';
            setTimeout(() => {
                node.style.boxShadow = '';
            }, 1000); // Effect duration
        }
    }

    // Example of handling a custom trigger
    window.addEventListener('activateNode', function(e) {
        const { nodeId, note } = e.detail;
        applySonarEffectToNode(nodeId); // Apply visual effect
        playSonarNote(note); // Play generated sonar note
    });

    // Example trigger (for demonstration purposes)
    // Implement your own mechanism to trigger this effect based on actual node activity
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('activateNode', {
            detail: { nodeId: 'node-id-here', note: 'C' }
        }));
    }, 5000); // Trigger after 5 seconds for demo
});
