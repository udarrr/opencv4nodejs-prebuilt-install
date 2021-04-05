const { execSync } = require("child_process");
const isX64 = process.arch === "x64";

const install = (pkg) => {
    execSync(`npm install --no-save ${pkg}`);
}

const packages = {
    "darwin": [
    ],
    "win32": [
    ],
    "linux": [
    ]
}

if (!process.env["OPENCV4NODEJS_PREBUILT_SKIP_DEPENDENCIES"]) {
    if (!isX64) {
        console.log("Unsupported platform, only x64 is supported.");
        process.exit(-1);
    }

    const op = process.platform;
    let openCvVersion =  process.env.npm_package_opencv;

    if (!openCvVersion) {
        // npm 7 no longer sets fields from the package.json in process.env so lookup the package.json
        // file we're running from. The environment variables are different when running locally vs
        // as a dependency
        const package = require(process.env.npm_package_from || process.env.npm_package_json);
        openCvVersion = package.opencv;
    }

    console.log(`Installing prebuilt OpenCV v${openCvVersion} for platform ${op}`);
    install(`@nut-tree/opencv-build-${op}@${openCvVersion}`);
    packages[op].forEach(pkg => {
        console.log(`Installing additional runtime dependency '${pkg}'`);
        install(pkg);
    });
    console.log(`Done.`);
}
