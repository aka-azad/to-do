#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b master
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com:aka-azad/https://github.com/aka-azad/to-do master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:aka-azad/to-do.git master:gh-pages

cd - 