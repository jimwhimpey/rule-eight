ssh jimwhimpey@mini.jimwhimpey.com /bin/bash << EOF
  cd ~/Sites/rule-nine
  lsof -t -i tcp:3001 | xargs kill
  lsof -t -i tcp:9000 | xargs kill
  npm run prod-start
EOF
