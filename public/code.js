'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        yield figma.loadFontAsync({ family: "Roboto", style: "Bold" });
    });
}
main().then(() => {
    let thisPage = figma.currentPage;
    let pageFrames = figma.currentPage.children;
    let nodes = figma.currentPage.selection;
    // setup game variables
    let controlBuzzDetector;
    let controlBuzzDetectorCount;
    let uiGameBoard;
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
    function createBuzzDectector() {
        controlBuzzDetector = figma.createFrame();
        controlBuzzDetector.name = "Buzz Detector";
    }
    function createBuzzDectectorCount() {
        controlBuzzDetectorCount = figma.createText();
        controlBuzzDetectorCount.name = "Buzz Counter";
        controlBuzzDetectorCount.characters = "0";
    }
    function createGame() {
        uiGameBoard = figma.createFrame();
        uiGameBoard.layoutMode = "VERTICAL";
        uiGameBoard.horizontalPadding = 200;
        uiGameBoard.verticalPadding = 100;
        uiGameBoard.itemSpacing = 100;
        uiGameBoard.x = 0;
        uiGameBoard.y = 0;
        uiGameBoard.name = "Quiz It!";
        uiGameBoard.topRightRadius = 100;
        uiGameBoard.topLeftRadius = 100;
        uiGameBoard.bottomLeftRadius = 100;
        uiGameBoard.bottomRightRadius = 100;
        uiGameBoard.strokeWeight = 10;
        uiGameBoard.strokes = [{ type: 'SOLID', color: { r: 28 / 255, g: 26 / 255, b: 86 / 255 } }];
        createBuzzDectector();
        createBuzzDectectorCount();
        uiGameBoard.appendChild(controlBuzzDetector);
        uiGameBoard.appendChild(controlBuzzDetectorCount);
        uiGameBoard.counterAxisSizingMode = "AUTO";
        controlBuzzDetector.visible = false;
        controlBuzzDetector.appendChild(controlBuzzDetectorCount);
    }
    // figma.on("selectionchange", () => {
    //   let selection = figma.currentPage.selection[0]
    //   console.log(selection)
    // })
    // setInterval(function(){
    //   console.log("checking")
    // }, 100)
    figma.showUI(__html__, { width: 380, height: 255 });
    createGame();
    function updateBuzzer(children) {
        children.forEach(child => {
            if (child.type === "TEXT" && child.name === "Buzz Counter") {
                if (child.characters === "0") {
                    child.characters = "1";
                }
                else {
                    console.log("already activated");
                }
            }
            if ("children" in child)
                updateBuzzer(child.children);
        });
    }
    figma.ui.onmessage = msg => {
        if (msg.type === 'buzzer-press') {
            pageFrames = figma.currentPage.children;
            updateBuzzer(pageFrames);
        }
    };
}); // end main
