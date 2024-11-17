#!/bin/bash

screen -S BedwarsFriendsBot -X quit
node Init.js
screen -dmS BedwarsFriendsBot node BFBot.js
