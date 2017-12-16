# X01 darts game scoreboard

The scoreboard source is published under MIT license. You may do anything with the source.
If you implement a different game based on this source choose MIT license and let me know.
I will include the game in the cloud service.

The rest of the project is not open source right now. It is available for use at
the url: http://game.dartsee.com

# Introduction to the Dartsee online scoreboard

The online scoreboard is designed to work in the following setup:

You place a screen above you dart board. There is no need for any input device, no mouse, keyboard or
touchscreen is necessary. The screen shows a QR code to access the game controller interface.

The user reads the QR code with a mobile phone or tablet. This opens the game controller interface
in a browser. This is the place to enter player names, select game type and start the game.
The score can be entered here also, or previous throws can be changed.

It is easy to connect a throw recognition software to the scoreboard. In this case the
score is automatically refreshed in the scoreboard and in the game controller.

# Setup

The system is in a pre beta stage right now. A lot of functionality is missing, but 
it is ready to handle the X01 game. 

Choose a name for your scoreboard. This will connect the scoreboard, the game controller and
the throw recognition system. No collision is detected, so try to choose a uniqe name.

Open the following URL on your scoreboard screen: http://game.dartsee.com/game/scoreboard/scoreboard_name
This will show the current game, or the QR code for the game controller if there is no running game.

That's all!

# Connect a throw recognition software

Only one HTTP GET request has to be implemented, to connect the throw recognition software to the
scoreboard:

http://game.dartsee.com/command/newThrow/scoreboard_name?num=NUM&mod=MOD&x=X&y=Y&cam1img=CAM1IMG&cam2img=CAM2IMG&cam1x=CAM1X&cam2x=CAM2X

Values:

* NUM: (Integer) The sector hit. 
  * Normal throw: [1-20, 25]  
  * No throw: -1 (If the player throws only one dart and removes it, then the software has to send two -1 values to the server, so the scoreboard will switch to the next player)
* MOD: (Integer) Modifier, values:
  * 1: simple throw
  * 2: double
  * 3: triple
  * 0: Out, no score
  * -1: no throw (for the same reason as the NUM = -1)
* X: (Optional integer) The x coordinate of the throw in a 800x800 square, where the diameter of the dart board is 600 pixels and the center of the bull is at 400,400
* Y: (Optional integer) The y coordinate of the throw.
* CAM1IMG: (Optional string). Could be used for anything. I store the filename of the image that was processed to calculate this throw.
* CAM12MG: (Optional string). As CAM1IMG
* CAM1X: (Optional integer) Could be used for anything.
* CAM2X: (Optional integer) Could be used for anything.

# Screenshots

Sample image from the scoreboard:
![Scoreboard](https://raw.githubusercontent.com/vassdoki/darts-x01-scoreboard/master/html/images/sb.png)


Sample image from the game controller:
![Game controller 1](https://raw.githubusercontent.com/vassdoki/darts-x01-scoreboard/master/html/images/gc1.png)
![Game controller 2](https://raw.githubusercontent.com/vassdoki/darts-x01-scoreboard/master/html/images/gc2.png)
![Game controller 3](https://raw.githubusercontent.com/vassdoki/darts-x01-scoreboard/master/html/images/gc3.png)

# Work in progess / plans

* New game waiting screen. This look ugly right now. This will show TOP lists, news or customizable messages.
* Data download feature for the board owner. The system will provide a csv file with all the data received for firther analisys.
* Registration. In the future the scoreboard name will belong to a registration, so no collision will be possible.


  
