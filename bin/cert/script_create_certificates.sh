#!/bin/bash
openssl genrsa -out key.pem 2048
openssl req -sha256 -new -key key.pem -out key-csr.pem
openssl x509 -req -sha256 -in key-csr.pem -signkey key.pem -out cert.pem -days 365
