const defaults = require("./defaults");
const envName = process.argv[2]

if (!envName) {
  throw new Error('no env name passed to parseEnv')
}
const outputs = (process.env[envName] || defaults[envName]() || '').split('\n')
outputs.forEach(o => console.log(o))
