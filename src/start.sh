#!/usr/bin/bash
python /home/jemz/Desktop/RouterControl/src/backend.py &
python -m http.server --directory /home/jemz/Desktop/RouterControl/docs/ &

