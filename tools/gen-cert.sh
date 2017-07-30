#!/bin/bash
cd "${0%/*}" # Go to this directory
cd ..
mkdir cert
cd cert
openssl genrsa -out private-key.pem 4096
openssl req -new -key private-key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem