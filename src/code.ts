async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
}

main().then(() => {

  let entirePage = figma.currentPage
  let pageFrames = figma.currentPage.children
  let nodes = figma.currentPage.selection
  let selectedLayers = nodes

  let getColor
  let getName

  function errorMsg() {
    figma.closePlugin('⚠️ Something went wrong! ⚠️');
  }

  function setStorage(storageName,storageValue) {
    figma.clientStorage.setAsync(storageName, JSON.stringify(storageValue)).catch(err => { console.log('error setting data') })
  }

  function getSavedColor() {
    return new Promise((success, error) => {
      figma.clientStorage.getAsync('color').then(color => {
        let data = (color) ? JSON.parse(color) : [] ;
        success(data)
        getColor = data
        figma.ui.postMessage({
          'color': data
        })
        // console.log("color: " + data)
      }).catch(err => {
        error(err)
      })
    })
  }

  function getSavedName() {
    return new Promise((success, error) => {
      figma.clientStorage.getAsync('name').then(name => {
        let data = (name) ? JSON.parse(name) : [] ;
        success(data)
        getName = data
        figma.ui.postMessage({
          'name': data
        })
        // console.log("name: " + data)
      }).catch(err => {
        error(err)
      })
    })
  }

  function makeViewer() {

  }

  function makePodium(){

  }

  function updateScore(){

  }

  function buzzerPress(){

  }

  figma.on("selectionchange", () => {
    let selection = figma.currentPage.selection[0];
    console.log(selection)
  })


}) // end main