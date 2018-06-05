#!/bin/bash
cd "${0%/*}" # Go to this directory
cp config.json ..

read -p "Generate dummy certs? (Y/N)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    ./gen-cert.sh
    echo "You'll need to manually activate in config.json"
fi

mkdir ../db

echo "Done!"