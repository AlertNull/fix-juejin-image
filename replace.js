const fs = require("fs")
const path = require("path")

let files = fs.readdirSync(__dirname)
for (let p of files) {
    if (p.match(/[\s\S]+\.md$/) && fs.statSync(p).isFile) {
        if (p.match(/[\s\S]+-bak\.md/) || p.match(/[\s\S]+-change\.md/)) {
            fs.unlinkSync(p)
            continue
        }
        let originp = p
        p = path.resolve(__dirname, "./" + p)
        let file = fs.readFileSync(p, {
            encoding: 'utf8'
        })

        let name = originp.match(/([\s\S]+).md$/)
        if (name) {
            fs.writeFileSync(path.resolve(__dirname, "./" + name[1] + "-bak.md"), file)

            file = file.replace(/user-gold-cdn.xitu.io/g, "p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets")

            file = file.replace(/[\?][a-zA-Z0-9&=?]+/g,"")

            file = file.replace(/[(](https:\/\/p1-jj.byteimg.com[a-zA-Z0-9\/\:\-\.]+[\/]([a-zA-Z0-9&=?]+))[)]/g, "($1~tplv-t2oaga2asx-watermark.awebp)")

            fs.writeFileSync(path.resolve(__dirname, "./" + name[1] + "-change.md"), file)
        }

    }
}
