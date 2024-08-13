module.exports = {
  esbuild: {
    outdir: 'dist',
    bundle: true,
    minify: false
  },
  prebuild: async () => {
    console.log("prebuild")
    const { sync } = require('rimraf')
    sync("./dist") // clean up dist folder
  },
  postbuild: async () => {
    console.log("postbuild")
    // const cpy = (await import("cpy")).default
    // await cpy(
    //   [
    //     "../../sequelize"
    //   ],
    //   "dist"
    // )
  },
}
