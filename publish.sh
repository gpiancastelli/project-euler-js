#!/bin/sh

die () {
  echo "$1" >/dev/stderr
  exit 1
}

mkdir site
mkdir site/s
cp -R web/i site
mkdir site/j
cp web/j/jquery-1.7.1.min.js site/j/jquery.min.js
cp web/j/prettify.js site/j/prettify.min.js

# takes <output-dir> as parameter, relying on the existence of <output-dir>/j
python2.7 pages.py site

# combine JavaScript
for f in site/j/*.js; do
  mv "$f" site/j/tmp.js
  cat site/j/tmp.js web/j/pe.js > "$f"
  rm site/j/tmp.js
done

# TODO minimize JavaScript solutions
#java -jar util/compiler.jar -js web/j/prettify.js > site/j/prettify.min.js || die "Failed to minimize JS"

# minimize CSS
java -jar util/yuicompressor-2.4.2.jar web/s/pe.css > site/s/pe.min.css && \
    java -jar util/yuicompressor-2.4.2.jar web/s/desert.css > site/s/desert.min.css || \
    die "Failed to minimize CSS"

# TODO use git to commit site to ghpages root branch
# ...

# remove site
#rm -rf site