Windows Instructions
====================

Download and Install GitHub on Windows from http://windows.github.com/
Installing might require you to reboot

Clone the github repo from http://github.com/greggman/HappyFunTimes
(assuming you know how to do this)

Download and Install Node.JS from http://node.js.org
On the start menu pick �node.js command prompt� (or search for it on Win7/8?)

cd to the folder you cloned the repo into (for example I cloned my into `z:\temp\happyfuntimes` so

    z:
    cd z:\temp\happyfuntimes

Install the node modules

    npm install

run the server

    node server/server.js

Open a browser and go to

    http://localhost:8080/examples/simple/gameview.html

Open another browser window (a window, not a tab) and go to

    http://localhost:8080/examples/simple/index.html

Adjust the windows so you can see both browser windows. Move the mouse over the colored window with it being the active window. Notice the corresponding colored dot in the other window moves.

Look up the IP address of your windows box. Open another command prompt and type

    ipconfig

It should tell you the ip address of your machine. Mine was 192.168.1.132

Using another computer or a smartphone THAT IS CONNECTED TO THE SAME NETWORK, open a browser and go to `http://ipaddress:8080/examples/simple/index.html`.  On my machine that was

    http://192.168.1.132:8080/examples/simple/index.html

Try the same steps but use powpow instead of simple. Examples

On machine running the server

    http://localhost:8080/examples/powpow/gameview.html

In another browser window

    http://localhost:8080/examples/powpow/index.html

On a smartphone or other computer

    http://ipaddress:8080/examples/powpow/index.html


