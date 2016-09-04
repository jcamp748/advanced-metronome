#!/bin/bash
set -e

find rails.sh . > /dev/null
cd ..
FILE=$(pwd)/js/metronome.js
sed -i.bak -e's/js\/metronomeworker.js/\/javascripts\/advanced-metronome\/js\/metronomeworker.js/' $FILE 
rm -rf test/
rm -rf scripts/
rm INSTALL
rm tags
rm README.md
