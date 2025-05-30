import { dirs } from "./dirs";

export const OPENCV_CONTRIB_ARCHIVE = "https://github.com/opencv/opencv_contrib/archive/3.4.6.tar.gz";

export const opencvRepoUrl = "https://github.com/opencv/opencv.git";
export const opencvContribRepoUrl = "https://github.com/opencv/opencv_contrib.git";

export const opencvModules = [
  "core",
  "highgui",
  "imgcodecs",
  "imgproc",
  "features2d",
  "calib3d",
  "photo",
  "objdetect",
  "ml",
  "video",
  "videoio",
  "videostab",
  "dnn",
  "face",
  "text",
  "tracking",
  "xfeatures2d",
  "ximgproc",
];

export const cmakeVsCompilers = {
  "10": "Visual Studio 10 2010",
  "11": "Visual Studio 11 2012",
  "12": "Visual Studio 12 2013",
  "14": "Visual Studio 14 2015",
  "15": "Visual Studio 15 2017",
  "16": "Visual Studio 16 2019",
  "17": "Visual Studio 17 2022",
};

export const cmakeArchs = {
  x64: " Win64",
  ia32: "",
  arm: " ARM",
};

export const defaultCmakeFlags = [
  `-DCMAKE_INSTALL_PREFIX=${dirs.opencvBuild}`,
  "-DCMAKE_BUILD_TYPE=Release",

  // "-DCMAKE_BUILD_TYPES=Release", //new

  "-DBUILD_EXAMPLES=OFF",
  "-DBUILD_DOCS=OFF",
  "-DBUILD_TESTS=OFF",
  "-DBUILD_PERF_TESTS=OFF",
  "-DBUILD_JAVA=OFF",
  "-DCUDA_NVCC_FLAGS=--expt-relaxed-constexpr",

  "-DBUILD_ZLIB=OFF", // https://github.com/opencv/opencv/issues/21389
  // "-DBUILD_opencv_dnn=ON", // added 28/12/2022,

  "-DBUILD_opencv_apps=OFF",
  "-DBUILD_opencv_aruco=OFF",
  "-DBUILD_opencv_bgsegm=OFF",
  "-DBUILD_opencv_bioinspired=OFF",
  "-DBUILD_opencv_ccalib=OFF",
  "-DBUILD_opencv_datasets=OFF",
  "-DBUILD_opencv_dnn_objdetect=OFF",
  "-DBUILD_opencv_dpm=OFF",
  "-DBUILD_opencv_fuzzy=OFF",
  "-DBUILD_opencv_hfs=OFF",
  "-DBUILD_opencv_java_bindings_generator=OFF",
  "-DBUILD_opencv_js=OFF",
  "-DBUILD_opencv_img_hash=OFF",
  "-DBUILD_opencv_line_descriptor=OFF",
  "-DBUILD_opencv_optflow=OFF",
  "-DBUILD_opencv_phase_unwrapping=OFF",
  "-DBUILD_opencv_python3=OFF",
  "-DBUILD_opencv_python_bindings_generator=OFF",
  "-DBUILD_opencv_reg=OFF",
  "-DBUILD_opencv_rgbd=OFF",
  "-DBUILD_opencv_saliency=OFF",
  "-DBUILD_opencv_shape=OFF",
  "-DBUILD_opencv_stereo=OFF",
  "-DBUILD_opencv_stitching=OFF",
  "-DBUILD_opencv_structured_light=OFF",
  "-DBUILD_opencv_superres=OFF",
  "-DBUILD_opencv_surface_matching=OFF",
  "-DBUILD_opencv_ts=OFF",
  "-DBUILD_opencv_xobjdetect=OFF",
  "-DBUILD_opencv_xphoto=OFF",
  "-DWITH_VTK=OFF",
];
