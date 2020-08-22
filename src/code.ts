async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
}

main().then(() => {

  let thisPage = figma.currentPage
  let pageFrames = figma.currentPage.children
  let nodes = figma.currentPage.selection
  let selectedLayers = nodes

  let getColor
  let getName

  // setup game variables

  let controlBuzzDetector
  let controlBuzzDetectorCount
  let uiGameBoard

  function errorMsg() {
    figma.closePlugin('⚠️ Something went wrong! ⚠️');
  }

  // function setStorage(storageName,storageValue) {
  //   figma.clientStorage.setAsync(storageName, JSON.stringify(storageValue)).catch(err => { console.log('error setting data') })
  // }

  // function getSavedColor() {
  //   return new Promise((success, error) => {
  //     figma.clientStorage.getAsync('color').then(color => {
  //       let data = (color) ? JSON.parse(color) : [] ;
  //       success(data)
  //       getColor = data
  //       figma.ui.postMessage({
  //         'color': data
  //       })
  //       // console.log("color: " + data)
  //     }).catch(err => {
  //       error(err)
  //     })
  //   })
  // }

  // function getSavedName() {
  //   return new Promise((success, error) => {
  //     figma.clientStorage.getAsync('name').then(name => {
  //       let data = (name) ? JSON.parse(name) : [] ;
  //       success(data)
  //       getName = data
  //       figma.ui.postMessage({
  //         'name': data
  //       })
  //       // console.log("name: " + data)
  //     }).catch(err => {
  //       error(err)
  //     })
  //   })
  // }

  // function makeViewer() {

  // }

  // function makePodium(){

  // }

  // function updateScore(){

  // }

  // function buzzerPress(){

  // }

  function createBuzzDectector(){
    controlBuzzDetector = figma.createFrame()
    controlBuzzDetector.name = "Buzz Detector"
  }

  function createBuzzDectectorCount() {
    controlBuzzDetectorCount = figma.createText()
    controlBuzzDetectorCount.name = "Buzz Counter"
    controlBuzzDetectorCount.characters = "0"
  }

  function createGame() {
    uiGameBoard = figma.createFrame()
    uiGameBoard.layoutMode = "VERTICAL"
    uiGameBoard.horizontalPadding = 200
    uiGameBoard.verticalPadding = 100
    uiGameBoard.itemSpacing = 100
    uiGameBoard.x = 0
    uiGameBoard.y = 0
    uiGameBoard.name = "Quiz It!"
    uiGameBoard.topRightRadius = 100
    uiGameBoard.topLeftRadius = 100
    uiGameBoard.bottomLeftRadius = 100
    uiGameBoard.bottomRightRadius = 100
    uiGameBoard.strokeWeight = 10
    uiGameBoard.strokes = [{type: 'SOLID', color: {r: 28/255, g: 26/255, b: 86/255}}]
    createBuzzDectector()
    createBuzzDectectorCount()
    uiGameBoard.appendChild(controlBuzzDetector)
    uiGameBoard.appendChild(controlBuzzDetectorCount)
    uiGameBoard.counterAxisSizingMode = "AUTO"
    controlBuzzDetector.visible = false
    controlBuzzDetector.appendChild(controlBuzzDetectorCount)
    
  }

  // figma.on("selectionchange", () => {
  //   let selection = figma.currentPage.selection[0]
  //   console.log(selection)
  // })

  // setInterval(function(){
  //   console.log("checking")
  // }, 100)

  figma.showUI(__html__, {width: 380, height: 255 })


  createGame()


  function updateBuzzer(children) {
    
    children.forEach(child => {
      if(child.type === "TEXT" && child.name === "Buzz Counter") {

        if(child.characters === "0") {
          child.characters = "1"
        } else {
          console.log("already activated")
        }

      }
      if ("children" in child) updateBuzzer(child.children)
    })
    
  }


  figma.ui.onmessage = msg => {

    if (msg.type === 'buzzer-press') {

      pageFrames = figma.currentPage.children
      updateBuzzer(pageFrames)
    }
  }


}) // end main