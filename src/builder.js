import { build } from "esbuild";
import chokidar from "chokidar";

const liveBuildJs = async function() {
  // Setup js file builder
  const jsBuilder = await build({
    // Bundles JavaScript.
    bundle: true,
    // Defines env variables for bundled JavaScript; here `process.env.NODE_ENV`
    // is propagated with a fallback.
    define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
    // Bundles JavaScript from (see `outfile`).
    entryPoints: ["src/client/main.js"],
    // Uses incremental compilation (see `chokidar.on`).
    incremental: true,
    // Removes whitespace, etc. depending on `NODE_ENV=...`.
    minify: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod",
    // Bundles JavaScript to (see `entryPoints`).
    outdir: "public/build",
  
    sourcemap: true,
  })
    
  // Setup watch for building js files
  chokidar.watch("src/**/*.{js,jsx}", {
      interval: 0, // No delay
    }).on("all", () => {
      console.log('Rebuilding js.')
      // Rebuilds esbuild (incrementally -- see `build.incremental`).
      jsBuilder.rebuild()
    })
}

const builder = {}
builder.liveBuildJs = liveBuildJs
export default builder
