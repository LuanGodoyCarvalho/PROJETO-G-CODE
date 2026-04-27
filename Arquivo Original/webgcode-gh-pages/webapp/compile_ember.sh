#!/bin/sh

pwd
./node_modules/ember-precompile/bin/ember-precompile `find legacy/templates -name *.hbs` -b legacy/templates/ -f legacy/templates.js
