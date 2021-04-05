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

    console.log(`Installing prebuilt OpenCV v${process.env.npm_package_config_opencv} for plattform ${op}`);
    install(`@nut-tree/opencv-build-${op}@${process.env.npm_package_config_opencv}`);
    packages[op].forEach(pkg => {
        console.log(`Installing additional runtime dependency '${pkg}'`);
        install(pkg);
    });
    console.log(`Done.`);
}
