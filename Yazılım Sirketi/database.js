const fs = require ('fs')
const flatted = require('flatted')

const save = (filename, objects) => {
    fs.writeFileSync(`./${filename}.json`, flatted.stringify(objects),null)
}

const load = (filename) => {
    if (fs.existsSync(`./${filename}.json`)) {
        const file = fs.readFileSync(`./${filename}.json`, 'utf8')
        return flatted.parse(file)
      }else{
          return [];
      }
 

} 

const insert = (filename,object) => {
    const objects = load(filename)
    objects.push(object)
    save(filename, objects)
}

const remove = (filename, index) => {
    const objects = load(filename)
}

const findByName = (filename, name) => {
    const objects = load(filename)

    return objects.find(o => o.name=name)
}

module.exports = { save, load, insert, remove, findByName }