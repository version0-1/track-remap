/**
 * Build src/index.js as IIFE with esbuild. Bundles image-to-path / path-to-fit.
 * Output: dist/track-remap.js, dist/track-remap.min.js, dist/track-remap-worker.js (src/workers)
 */
import esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, 'src', 'index.js');
const workerEntry = path.join(__dirname, 'src', 'workers', 'worker.js');
const imageWorkerEntry = path.join(__dirname, 'src', 'workers', 'image-worker.js');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'track-remap.js');
const outFileMin = path.join(outDir, 'track-remap.min.js');
const workerOutFile = path.join(outDir, 'track-remap-worker.js');
const imageWorkerOutFile = path.join(outDir, 'track-remap-image-worker.js');

const baseConfig = {
  entryPoints: [entry],
  bundle: true,
  format: 'iife',
  globalName: 'TrackRemap',
  platform: 'browser',
  target: ['es2020'],
};

async function build() {
  await esbuild.build({
    ...baseConfig,
    outfile: outFile,
    minify: false,
    sourcemap: true,
  });
  await esbuild.build({
    ...baseConfig,
    outfile: outFileMin,
    minify: true,
    sourcemap: false,
  });
  await esbuild.build({
    entryPoints: [workerEntry],
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    outfile: workerOutFile,
    minify: false,
  });
  await esbuild.build({
    entryPoints: [imageWorkerEntry],
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    outfile: imageWorkerOutFile,
    minify: false,
  });
  console.log('Build done: dist/track-remap.js, dist/track-remap.min.js, dist/track-remap-worker.js, dist/track-remap-image-worker.js');
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
