// import { collegeSavings } from "./collegeSavings"
// import { linc } from "./linc"
// import { krosstrain } from "./krosstrain.js"
// import { bozellHoliday } from "./bozellHoliday"
// import { misc } from "./misc"

const collegeSavings = require("./collegeSavings")
const linc = require("./linc")
const krosstrain = require("./krosstrain")
const bozellHoliday = require("./bozellHoliday")
const misc = require("./misc")

const data = [collegeSavings, linc, krosstrain, bozellHoliday, misc]

exports.data = data
