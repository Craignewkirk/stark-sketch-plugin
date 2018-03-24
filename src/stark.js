import WebUI from 'sketch-module-web-view'
import { checkContrast } from './utils/checker'
var MochaJSDelegate = require('mocha-js-delegate')
const sketch = require('sketch/dom')

function takeSnapshot(context, ui) {
  var webViewFrame = ui.frame()
  var webViewWindow = ui.window()
  var screenHeight = NSScreen.mainScreen().frame().size.height

  var frameRelativeToScreen = webViewWindow.convertRectToScreen(webViewFrame)
  frameRelativeToScreen.size.width = frameRelativeToScreen.size.width - 220
  frameRelativeToScreen.origin.y = screenHeight - webViewFrame.size.height - frameRelativeToScreen.origin.y

  var quartzSnapshot = CGWindowListCreateImage(
    frameRelativeToScreen,
    kCGWindowListOptionOnScreenBelowWindow,
    webViewWindow.windowNumber(),
    kCGWindowImageBestResolution
  )

  var snapshot = NSBitmapImageRep.alloc().initWithCGImage(quartzSnapshot)

  var data = snapshot.representationUsingType_properties(NSPNGFileType, null)


  saveFile(context, '/Resources/snapshot.png', data);

  // release previous screen capture, first the NSBitmapImageRep then the CGImage
  if (snapshot != null) {
    snapshot.release();
  }
  if (quartzSnapshot != null) {
    CGImageRelease(quartzSnapshot);
  }
}

function saveFile(context, filePath, data) {
  var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
  scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;

  const brains = NSString.stringWithFormat("%@", scriptPath);
  return data.writeToFile_atomically(brains, true);
}


function handleNavClicked(itemClicked, ui) {
  var frame = ui.panel.frame()
  var oldWidth = frame.size.width
  var oldHeight = frame.size.height

  ui.panel.setFrame_display_animate(NSMakeRect(
      frame.origin.x += oldWidth - (itemClicked == 'color' ? 800 : 551),
      frame.origin.y += oldHeight - 647,
      itemClicked == 'color' ? 800 : 551,
      647
    ), true, true
  )
}

function handleArtboardChanged(artboardSelectId, context, ui) {
  var artboardId = artboardSelectId;

  if (artboardId != "abid_UseWindow") {
    var artboards = context.document.currentPage().artboards()

    for (var i = 0; i < artboards.count(); i++) {
      if (artboards[i].name() == artboardId.replace("abid_", "")) {
        var artboardToSave = artboards[i];
        var filePath = "/Resources/snapshot.png";
        var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
        scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;

        context.document.saveArtboardOrSlice_toFile(artboardToSave, scriptPath)
      }
    }
  } else {
    takeSnapshot(context, ui.webView);
  }

  ui.eval(`runSim()`)
}

function handleLogoButtonClicked() {
  NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.getstark.co"))
}

function generateArtboardNames(context) {
  var artboards = context.document.currentPage().artboards()
  var artboardNames = "["

  for (var i = artboards.count() - 1; i >= 0; i--) {
    artboardNames += "\"" + artboards[i].name() + "\","
  }

  artboardNames += "]"

  return artboardNames
}


function handleCheckContrastButtonClicked(context, ui) {
  var returnValue = checkContrast(context);
  ui.eval(`updateCheckerOutput('${returnValue}')`)
}


export function runStark(context) {
  const webUI = new WebUI(context, require('../resources/webview.html'), {
    identifier: 'unique.id', // to reuse the UI
    x: 0,
    y: 0,
    width: 800,
    height: 647,
    background: NSColor.whiteColor(),
    blurredBackground: false,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: true,
    frameLoadDelegate: { // https://developer.apple.com/reference/webkit/webframeloaddelegate?language=objc
      'webView:didFinishLoadForFrame:'(webView, webFrame) {
        takeSnapshot(context, webView)
        webUI.eval(`setArtboardNames(${generateArtboardNames(context)})`)
      }
    },
    handlers: {
      logoButtonClick() {
        handleLogoButtonClicked()
      },
      navClick(itemClicked) {
        handleNavClicked(itemClicked, webUI)
      },
      artboardChange(artboardId) {
        handleArtboardChanged(artboardId, context, webUI)
      },
      checkContrastButtonClick() {
        handleCheckContrastButtonClicked(context, webUI)
      }
    }
  })


  var uiDelegate = new MochaJSDelegate({
    'windowWillStartLiveResize:': function(notification) {
      // if (artboardId == "abid_UseWindow") {
      //   postWebFunction(nibui, "removeCanvasOpacity", [""]);
      // }
    },
    'windowDidEndLiveResize:': function(notification) {
      takeSnapshot(context, webUI.webView)
      webUI.eval(`runSim()`)
    },
    'windowWillMove:': function(notification) {
      // if (artboardId == "abid_UseWindow") {
      //   postWebFunction(nibui, "removeCanvasOpacity", [""]);
      // }
    },
    'windowDidMove:': function(notification) {
      takeSnapshot(context, webUI.webView)
      webUI.eval(`runSim()`)
    }
  })
  webUI.panel.setDelegate(uiDelegate.getClassInstance())
}

export function handleProtanopia(context) {
}

export function handleProtanomaly(context) {
  context.document.showMessage("It's handleProtanomaly!")
}

export function handleDeuteranopia(context) {
  context.document.showMessage("It's handleDeuteranopia!")
}

export function handleDeuteranomaly(context) {
  context.document.showMessage("It's handleDeuteranomaly!")
}

export function handleTritanopia(context) {
  context.document.showMessage("It's handleTritanopia!")
}

export function handleTritanomaly(context) {
  context.document.showMessage("It's handleTritanomaly!")
}

export function handleAchromatopsia(context) {
  context.document.showMessage("It's handleAchromatopsia!")
}

export function handleAchromatomaly(context) {
  context.document.showMessage("It's handleAchromatomaly!")
}

export function handleContrastCheck(context) {
  context.document.showMessage("It's handleContrastCheck!")
}






// @import 'utils/nibui.js';
// @import 'utils/checker.js';
//
// var COSCRIPT;
// var artboardId = "abid_UseWindow";
// var simulationId = "cbid_NoSim";
//
// var shouldCheckContrast = false;
//
// var onRun = function(context) {
//   var nibui = prepareWindow(context);
//
//   // Take a snapshot of the window so it's ready if the users selects a
//   // colorblind type to simulate
//   takeSnapshot(context, nibui);
// }
//
// var handleProtanopia = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Protanopia"
//   takeSnapshot(context, nibui);
// }
//
// var handleProtanomaly = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Protanomaly"
//   takeSnapshot(context, nibui);
// }
//
// var handleDeuteranopia = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Deuteranopia"
//   takeSnapshot(context, nibui);
// }
//
// var handleDeuteranomaly = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Deuteranomaly"
//   takeSnapshot(context, nibui);
// }
//
// var handleTritanopia = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Tritanopia"
//   takeSnapshot(context, nibui);
// }
//
// var handleTritanomaly = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Tritanomaly"
//   takeSnapshot(context, nibui);
// }
//
// var handleAchromatopsia = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Achromatopsia"
//   takeSnapshot(context, nibui);
// }
//
// var handleAchromatomaly = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Achromatomaly"
//   takeSnapshot(context, nibui);
// }
//
// var handleProtanomaly = function(context) {
//   var nibui = prepareWindow(context);
//   simulationId = "cbid_Protanomaly"
//   takeSnapshot(context, nibui);
// }
//
// var handleContrastCheck = function(context) {
//   var returnVal = checkContrast(context);
//   if (returnVal) {
//     var nibui = prepareWindow(context);
//     shouldCheckContrast = true;
//   }
// }
//
// function prepareWindow(context) {
//   // Prepare the NIB so we can do stuff with the UI
//   COSCRIPT = COScript.currentCOScript();
//   COSCRIPT.setShouldKeepAround(true);
//   var nibui = new NibUI(context, 'UIBundle', 'StarkNibUITemplate', [
//     'mainWindow', 'webMainView'
//   ]);
//
//   // This kicks out a js file that the webview can access to show
//   // a the list of artboards in the doc
//   generateArtboardNames(context);
//
//   //
//   // Style up the window view
//   nibui.mainWindow.setOpaque(false);
//   var transparent = [NSColor colorWithDeviceRed:0.0 green:0.0 blue:0.0 alpha:0.25];
//   nibui.mainWindow.setBackgroundColor(transparent);
//
//   // Load the webview and then style it so the window part of it can be
//   // transparent for the user to see through
//   var localWebURL = context.plugin.urlForResourceNamed('Web/index.html');
//   var request = [NSURLRequest requestWithURL:localWebURL
//     cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData
//     timeoutInterval:60];
//   nibui.webMainView.mainFrame().loadRequest(request);
//   nibui.webMainView.wantsLayer = true;
//   nibui.webMainView.setDrawsBackground(false);
//   var webViewLayer = nibui.webMainView.layer();
//   nibui.webMainView.hidden = false;
//
//   //
//   // Set up the webview to handle statustext updates (events) posted
//   var webUIDelegate = createCocoaObject({
//     'webView:setStatusText:': function(webView, statusText) {
//       if (statusText.startsWith("abid_")) {
//         handleArtboardSelectChange(context, nibui, statusText);
//       } else if (statusText.startsWith("cbid_")) {
//         simulationId = statusText;
//       }else if (statusText.startsWith("data:image")){
//         handleExportButtonClick(statusText);
//       } else if (statusText == 'Check') {
//         handleCheckContrastButtonClick(context, nibui);
//       } else if (statusText == 'nav-contrast') {
//         resizeWindow(nibui, 551, 623);
//         var mainWindow = nibui.mainWindow;
//         [mainWindow setStyleMask:[mainWindow styleMask] & ~NSResizableWindowMask];
//       } else if (statusText == 'nav-color') {
//         var mainWindow = nibui.mainWindow;
//         [mainWindow setStyleMask:[mainWindow styleMask] | NSResizableWindowMask];
//
//         if (artboardId == 'abid_UseWindow') {
//           takeSnapshot(context, nibui);
//           postWebFunction(nibui, "runSimulation", [""]);
//         }
//       } else if (statusText == 'LogoClicked') {
//         handleLogoButtonClicked();
//       } else if (statusText == 'windowLoaded') {
//         if (shouldCheckContrast) {
//           postWebFunction(nibui, "simulateContrastClick", [""]);
//           handleCheckContrastButtonClick(context, nibui);
//         } else {
//           postWebFunction(nibui, "setColorBlindId", [simulationId]);
//           postWebFunction(nibui, "runSimulation", [""]);
//         }
//       }
//     }
//   });
//   nibui.webMainView.setUIDelegate(webUIDelegate);
//
//   //
//   // Set up window to respond to move/resize events
//   var windowUIDelegate = createCocoaObject({
//     'windowWillStartLiveResize:': function(notification) {
//       if (artboardId == "abid_UseWindow") {
//         postWebFunction(nibui, "removeCanvasOpacity", [""]);
//       }
//     },
//     'windowDidEndLiveResize:': function(notification) {
//       if (artboardId == "abid_UseWindow") {
//         takeSnapshot(context, nibui);
//         postWebFunction(nibui, "runSimulation", [""]);
//       }
//     },
//     'windowWillMove:': function(notification) {
//       if (artboardId == "abid_UseWindow") {
//         postWebFunction(nibui, "removeCanvasOpacity", [""]);
//       }
//     },
//     'windowDidMove:': function(notification) {
//       if (artboardId == "abid_UseWindow") {
//         takeSnapshot(context, nibui);
//         postWebFunction(nibui, "runSimulation", [""]);
//       }
//     },
//   });
//   nibui.mainWindow.setDelegate(windowUIDelegate);
//
//   //
//   // Make the window on top and keep it there
//   nibui.mainWindow.makeKeyAndOrderFront(null);
//   nibui.mainWindow.setLevel(NSFloatingWindowLevel);
//   nibui.destroy();
//
//   return nibui;
// }
//
// function handleArtboardSelectChange(context, nibui, artboardSelectId) {
//   artboardId = artboardSelectId;
//
//   if (artboardId != "abid_UseWindow") {
//     var doc = context.document;
//     var page = [doc currentPage];
//     var artboards = [[doc currentPage] artboards];
//
//     for (var i = 0; i < artboards.count(); i++) {
//       if (artboards[i].name() == artboardId.replace("abid_", "")) {
//         var artboardToSave = artboards[i];
//
//         var filePath = "/Resources/Web/img/snapshot.png";
//         var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
//         scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;
//
//         var slice = [[MSExportRequest exportRequestsFromExportableLayer:artboardToSave] firstObject];
//
//         [slice setShouldTrim:0];
//         [slice setScale:2];
//
//         [doc saveArtboardOrSlice:slice toFile:scriptPath];
//       }
//     }
//   } else {
//     takeSnapshot(context, nibui);
//   }
//
//   postWebFunction(nibui, "runSimulation", [""]);
// }
//
// function handleCheckContrastButtonClick(context, nibui) {
//   log('handling check contrast button click');
//   var returnValue = checkContrast(context);
//   postWebFunction(nibui, "updateCheckerOutput", [returnValue]);
// }
//
// function handleExportButtonClick(imageDataString) {
//   var url = [NSURL URLWithString:imageDataString];
//   var imageData = [NSData dataWithContentsOfURL:url];
//   var snapshot = [[NSBitmapImageRep alloc] initWithData:imageData];
//   var fileName = simulationId.replace('cbid_', '') + "-Simulation";
//
//   var panel = [NSSavePanel savePanel];
//   [panel setTitle:"Choose where to save your colorblind simulation image:"];
//   [panel setAllowsOtherFileTypes:false];
//   [panel setExtensionHidden:false];
//   [panel setCanCreateDirectories:true];
//   [panel setNameFieldStringValue:fileName];
//
//   if ([panel runModal] == NSOKButton) {
//     var message = [panel filename];
//     var data = [snapshot representationUsingType:NSPNGFileType properties:nil];
//     var filepath = message + '.png';
//     var file = [NSString stringWithFormat:@"%@", filepath];
//     var fileSuccess = [data writeToFile:file atomically:true];
//   }
// }
//

//

//
// function takeSnapshot(context, nibui) {
//   var webViewFrame = nibui.webMainView.frame();
//   var webViewWindow = nibui.webMainView.window();
//
//   var screenHeight = [[NSScreen mainScreen] frame].size.height;
//
//   var frameRelativeToScreen = [webViewWindow convertRectToScreen:webViewFrame];
//   frameRelativeToScreen.size.width = frameRelativeToScreen.size.width - 220;
//   frameRelativeToScreen.origin.y = screenHeight - webViewFrame.size.height - frameRelativeToScreen.origin.y;
//
//   var quartzSnapshot = CGWindowListCreateImage(
//       frameRelativeToScreen,
//       kCGWindowListOptionOnScreenBelowWindow,
//       webViewWindow.windowNumber(),
//       kCGWindowImageBestResolution);
//
//   var snapshot = [[NSBitmapImageRep alloc] initWithCGImage:quartzSnapshot];
//   var data = [snapshot representationUsingType:NSPNGFileType properties:nil];
//
//   saveFile(context, '/Resources/Web/img/snapshot.png', data);
//
//   // release previous screen capture, first the NSBitmapImageRep then the CGImage
//   if (snapshot != null) {
//     [snapshot release];
//   }
//   if (quartzSnapshot != null) {
//     CGImageRelease(quartzSnapshot);
//   }
// }
//
// function postWebFunction(nibui, functionName, functionArguments) {
//   var webView = nibui.webMainView;
//   var script = webView.windowScriptObject();
//   script.callWebScriptMethod_withArguments_(functionName, functionArguments);
// }
//
// function saveFile(context, filePath, data) {
//   var scriptPath = context.scriptPath.stringByDeletingLastPathComponent();
//   scriptPath = scriptPath.stringByDeletingLastPathComponent() + filePath;
//
//   var file = [NSString stringWithFormat:@"%@", scriptPath];
//   var fileSuccess = [data writeToFile:file atomically:true];
// }
//
// function resizeWindow(nibui, width, height) {
//   var mainWindow = nibui.mainWindow;
//   var frame = [mainWindow frame];
//   var oldWidth = frame.size.width;
//   var oldHeight = frame.size.height;
//   frame.size.width = width;
//   frame.size.height = height;
//
//   frame.origin.x += oldWidth - width;
//   frame.origin.y += oldHeight - height;
//
//   [mainWindow setFrame:frame display:true animate:true];
// }
