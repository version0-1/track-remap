# track-remap

A JS library that generates routes from images and applies them to indoor trainer ride logs for upload to Garmin Connect and similar platforms.

For example, you can combine an illustration or photo-based single-stroke route with a spin bike ride log (FIT file) and see it displayed like this on Garmin Connect:
https://connect.garmin.com/app/activity/22465897318

This activity merges:

1. A ride log from a spin bike (no built-in heart rate) connected to an Android device
2. Body data (heart rate, etc.) recorded on a Garmin Watch

Currently only tested with Garmin — other manufacturers may not work correctly.

## Demo

Launches a simple web UI on localhost that handles everything from image loading to FIT file creation.
Requires a Docker environment.

```bash
docker compose up -d
```

Open `http://localhost:5000/demo.html` to access the demo.

## Choosing Images

Think of it as turning an image into a single-stroke illustration.
Complex images don't produce clean routes, so simpler images work best.

Photos can be imported too, but results vary depending on the subject.
Converting photos to simple line art using Gemini (Nano Banana2) or similar AI tools tends to produce better routes.

## Usage

Load `dist/track-remap.min.js` in the browser to access the global `TrackRemap` object.
Below is a minimal **"image → path generation → apply to FIT"** example.

```html
<input id="img" type="file" accept="image/*" />
<input id="fit" type="file" accept=".fit" />
<button id="run">Convert</button>

<script src="dist/track-remap.min.js"></script>
<script>
  const $img = document.getElementById('img');
  const $fit = document.getElementById('fit');
  const $run = document.getElementById('run');

  $run.addEventListener('click', async () => {
    const imageFile = $img.files?.[0];
    const fitFile = $fit.files?.[0];
    if (!imageFile || !fitFile) return;

    // 1) Image → path generation
    const { path, width, height } = await TrackRemap.imageFromFile(imageFile, {
      routeMode: 'density',
    });

    // 2) Apply path to FIT
    const { fitBlob } = await TrackRemap.applyPathToFIT({ path, width, height }, fitFile);

    // 3) Download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(fitBlob);
    a.download = 'route-applied.fit';
    a.click();
    URL.revokeObjectURL(a.href);
  });
</script>
```

For detailed API documentation and options, see [track-remap/README.md](track-remap/README.md).

## Support

If you find this project useful, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/version0.1)
