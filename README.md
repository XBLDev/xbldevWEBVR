# xbldevWEBVR
WEBVR exercise, since webvr is still experimental, the code in this repo is expected to change a lot over time. Most of the code will be based on the webvr repo: https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr.

Comment 21/10/2017:

Added basic ReactVR project, put the camera cursor visibility settings on in the VR initialization, doesn't seem 
to be working in the VR mode on Chrome, and it's not visible. The mouse however can trigger an onEnter event of 
the text and changes its color when the the mouse hovers over it.

Comment 27/09/2017:

First commit: Basic webvr setup from: https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world
With threeJS minecraft example from:
https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_minecraft.html

How to run it:
1. Install a WebVR Emulation Chrome DevTools Extension, follow instructions in: https://developers.google.com/web/fundamentals/vr/getting-started-with-webvr/
2. Enable webvr extension
3. Install xampp, start apache on local 
4. Copy the basic folder to C:/xampp/htdocs
5. Open google chrome, in URL, type: http://localhost/webvrtest/basic/index.html
6. If everything is good then there should be an "Enable VR" button on the top left corner,
click the button to enable VR mode.


