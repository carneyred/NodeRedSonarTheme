# NodeRedSonarTheme
 
Integrating the Script with Node-RED
Prepare the Script: Save the above JavaScript as node-effects.js in a directory accessible to Node-RED, typically within the public directory of your Node-RED user directory.
Configure settings.js: Add a reference to this script in your settings.js file under the editorTheme property to ensure it's loaded in the Node-RED editor:
javascript
Copy code
editorTheme: {
    page: {
        scripts: ["/absolute/path/to/node-effects.js"] // Adjust the path as necessary
    }
}
Triggering the Effects: The example uses a setTimeout function as a placeholder for triggering the effects. In a real-world scenario, you'd need a mechanism to trigger the activateNode event with relevant details (e.g., based on user interactions or specific conditions in your Node-RED flows).