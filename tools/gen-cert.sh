#!/bin/bash
mkdir "${0%/*}/../cert" && cd "$_"
#^ Make "cert" in the directory above this and go there
openssl genrsa -out private-key.pem 4096 # new private key
openssl req -new -key private-key.pem -out csr.pem # new cert
openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem # sign cert with key