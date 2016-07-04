# FCC URL Shortener Microservice


## Quick Start Guide

Visit: `aclbros-url-shortener.herokuapp.com`

## User stories fullfiled
    1) I can pass a working URL as a parameter and I will receive a shortened URL
       in the JSON response.
    2) When I visit that shortened URL, it will redirect me to my original link.


## Example Usage
`http://aclbros-url-shortener.herokuapp.com/new/https://www.google.com`

## Example output
`{"original_url":"http://www.google.com","short_url":"aclbros-url-shortener.herokuapp.com/9894"}`

## Example accesing shortened URL
`http://urlshortms.herokuapp.com/9894` - will redirect to www.google.com
