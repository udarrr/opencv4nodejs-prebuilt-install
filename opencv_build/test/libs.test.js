const { opencvModules } = require('../build/constants')
const { getLibsFactory } = require('../build/getLibsFactory')

function createFake(libFiles, { isWin, isOSX } = { isWin: false, isOSX: false }) {
  const fs = {
    existsSync: () => true,
    realpathSync: p => p,
    readdirSync: () => libFiles
  }
  const path = {
    resolve: (dir, file) => file
  }
  const utils = {
    opencvModules,
    isWin: () => isWin,
    isOSX: () => isOSX,
  }
  return getLibsFactory(Object.assign({}, utils, { fs, path }))
}

describe('libs', () => {

  it.each([
    ['opencv_world340.lib', {isWin: true}],
    ['opencv_world.lib', {isWin: true}],
    ['libopencv_world.so.4.1.1', {isWin: false, isWin: false}],
    ['libopencv_world.so.4.1', {isWin: false, isWin: false}],
    ['libopencv_world.so', {isWin: false, isWin: false}],
    ['libopencv_world.4.1.1.dylib', {isOSX: true}],
    ['libopencv_world.4.1.dylib', {isOSX: true}],
    ['libopencv_world.dylib', {isOSX: true}],
  ])('should find %s', (worldLibFile, params) => {
    const libFiles = [
      worldLibFile
    ]

    const getLibs = createFake(libFiles, params)
    const res = getLibs()

    expect(res).toHaveLength(1);
    expect(res).toEqual(expect.arrayContaining([{
      opencvModule: 'world',
      libPath: worldLibFile
    }]));
  })

  it.each([
    ['opencv_core340.lib', {isWin: true}],
    ['opencv_core.lib', {isWin: true}],
    ['libopencv_core.so.4.1.1', {isWin: false, isWin: false}],
    ['libopencv_core.so.4.1', {isWin: false, isWin: false}],
    ['libopencv_core.so', {isWin: false, isWin: false}],
    ['libopencv_core.4.1.1.dylib', {isOSX: true}],
    ['libopencv_core.4.1.dylib', {isOSX: true}],
    ['libopencv_core.dylib', {isOSX: true}],
  ])('should find %s', (coreLibFile, params) => {
    const libFiles = [
      coreLibFile
    ]

    const getLibs = createFake(libFiles, params)
    const res = getLibs()

    expect(res).toHaveLength(opencvModules.length);
    expect(res).toEqual(expect.arrayContaining([{
      opencvModule: 'core',
      libPath: coreLibFile 
    }]));
  })

  it.each([
    ['opencv_objdetect340.lib', 'opencv_dnn_objdetect340.lib', {isWin: true, isOSX: false}],
    ['opencv_objdetect.lib', 'opencv_dnn_objdetect.lib', {isWin: true, isOSX: false}],
    ['libopencv_objdetect.so.4.1.1', 'libopencv_dnn_objdetect.so.4.1.1', {isWin: false, isOSX: false}],
    ['libopencv_objdetect.so.4.1', 'libopencv_dnn_objdetect.so.4.1', {isWin: false, isOSX: false}],
    ['libopencv_objdetect.so', 'libopencv_dnn_objdetect.so', {isWin: false, isOSX: false}],
    ['libopencv_objdetect.4.1.1.dylib', 'libopencv_dnn_objdetect.4.1.1.dylib', {isWin: false, isOSX: true}],
    ['libopencv_objdetect.4.1.dylib', 'libopencv_dnn_objdetect.4.1.dylib', {isWin: false, isOSX: true}],
    ['libopencv_objdetect.dylib', 'libopencv_dnn_objdetect.dylib', {isWin: false, isOSX: true}],
  ])('should only link %s with exact name match', (objdetectLibFile, dnnObjdetectLibFile, params) => {
    const libFiles = [
      objdetectLibFile,
      dnnObjdetectLibFile
    ]

    const getLibs = createFake(libFiles, params)
    const res = getLibs()
    expect(res).toHaveLength(opencvModules.length);
    expect(res).toEqual(expect.arrayContaining([{
      opencvModule: 'objdetect',
      libPath: objdetectLibFile 
    }]));
    expect(res).not.toEqual(expect.arrayContaining([{
      opencvModule: expect.any(String),
      libPath: dnnObjdetectLibFile 
    }]));
  })
})