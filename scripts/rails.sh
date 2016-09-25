#!/bin/bash
set -e

find rails.sh . > /dev/null
ruby edits.rb
cd ..
# remove unneeded files
rm -rf test/
rm -rf scripts/
rm INSTALL
rm tags
rm README.md
rm -rf .git/
rm .gitignore
