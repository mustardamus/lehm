#!/usr/bin/env node
'use strict'

const FrontMatter = require('../lib/front_matter.js')
const frontMatter = new FrontMatter()

console.log(frontMatter.works())
