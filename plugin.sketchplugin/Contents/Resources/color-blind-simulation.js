/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSimulation = runSimulation;
exports.setColorBlindId = setColorBlindId;
var gammaTable = [0, 0.000005077051900661759, 0.000023328004666098932, 0.0000569217657121931, 0.00010718736234124402, 0.0001751239775030267, 0.00026154375454849144, 0.0003671362698159426, 0.0004925037871914326, 0.0006381828421670219, 0.0008046584995130583, 0.0009923743040743253, 0.0012017395224384016, 0.001433134589671864, 0.0016869153167892836, 0.0019634162133964697, 0.002262953160706434, 0.002585825596234168, 0.0029323183239383624, 0.003302703032003638, 0.0036972395789001307, 0.004116177093282753, 0.00455975492252602, 0.005028203456855535, 0.0055217448502396585, 0.006040593654849813, 0.006584957382581685, 0.007155037004573032, 0.00775102739766061, 0.008373117745148581, 0.009021491898012131, 0.009696328701658229, 0.010397802292555288, 0.011126082368383245, 0.011881334434813665, 0.012663720031582098, 0.013473396940142641, 0.014310519374884064, 0.015175238159625197, 0.016067700890886875, 0.016988052089250045, 0.017936433339950233, 0.018912983423721504, 0.01991783843878572, 0.020951131914781092, 0.02201299491933654, 0.023103556157921437, 0.02422294206753424, 0.025371276904734584, 0.026548682828472916, 0.027755279978126032, 0.028991186547107816, 0.030256518852388652, 0.03155139140022645, 0.03287591694838383, 0.03423020656508195, 0.03561436968491877, 0.0370285141619602, 0.03847274632019464, 0.03994717100152558, 0.04145189161146246, 0.042987010162657116, 0.04455262731642138, 0.04614884242235095, 0.04777575355617064, 0.04943345755590796, 0.051122050056493396, 0.05284162552287903, 0.05459227728176034, 0.05637409755197975, 0.05818717747368543, 0.06003160713631323, 0.06190747560545576, 0.06381487094867724, 0.06575388026033009, 0.06772458968542432, 0.0697270844425988, 0.07176144884623908, 0.07382776632778461, 0.07592611945626479, 0.07805658995810189, 0.08021925873621505, 0.08241420588845923, 0.08464151072542946, 0.08690125178766034, 0.08919350686224782, 0.09151835299891949, 0.09387586652557776, 0.09626612306333969, 0.09868919754109445, 0.10114516420959989, 0.10363409665513738, 0.1061560678127439, 0.10871114997903854, 0.11129941482466024, 0.11392093340633272, 0.11657577617857154, 0.11926401300504741, 0.12198571316961948, 0.1247409453870513, 0.12752977781342206, 0.13035227805624436, 0.1332085131842997, 0.13609854973720245, 0.1390224537347025, 0.14198029068573553, 0.14497212559723088, 0.14799802298268516, 0.15105804687051058, 0.15415226081216518, 0.1572807278900734, 0.16044351072534352, 0.16364067148528988, 0.1668722718907655, 0.1701383732233124, 0.173439036332135, 0.17677432164090326, 0.18014428915439032, 0.18354899846495082, 0.18698850875884424, 0.1904628788224093, 0.19397216704809314, 0.19751643144034023, 0.20109572962134564, 0.20471011883667684, 0.20835965596076741, 0.2120443975022877, 0.215764399609395, 0.2195197180748679, 0.22331040834112742, 0.2271365255051489, 0.23099812432326744, 0.23489525921588023, 0.2388279842720483, 0.24279635325400195, 0.24680041960155044, 0.25084023643640047, 0.2549158565663851, 0.25902733248960613, 0.2631747163984916, 0.267358060183772, 0.2715774154383751, 0.27583283346124515, 0.2801243652610849, 0.28445206156002445, 0.2888159727972186, 0.29321614913237454, 0.2976526404492112, 0.30212549635885283, 0.3066347662031576, 0.31118049905798434, 0.3157627437363971, 0.3203815487918104, 0.3250369625210763, 0.3297290329675149, 0.33445780792388924, 0.3392233349353267, 0.34402566130218676, 0.348864834082879, 0.35374090009662945, 0.3586539059261989, 0.36360389792055325, 0.36859092219748707, 0.37361502464620194, 0.37867625092984036, 0.3837746464879752, 0.38891025653905886, 0.39408312608282897, 0.39929329990267437, 0.4045408225679618, 0.40982573843632336, 0.41514809165590655, 0.42050792616758714, 0.42590528570714575, 0.4313402138074096, 0.4368127538003594, 0.4423229488192018, 0.4478708418004099, 0.4534564754857306, 0.4590798924241601, 0.4647411349738896, 0.4704402453042184, 0.4761772653974402, 0.4819522370506978, 0.48776520187781053, 0.49361620131107364, 0.4995052766030301, 0.505432468828216, 0.5113978188848795, 0.5174013674966733, 0.5234431552143247, 0.5295232224172772, 0.5356416093153108, 0.5417983559501369, 0.5479935021969718, 0.5542270877660852, 0.5604991522043282, 0.5668097348966382, 0.5731588750675233, 0.5795466117825252, 0.5859729839496614, 0.5924380303208466, 0.598941789493296, 0.6054842999109072, 0.6120655998656237, 0.6186857274987796, 0.6253447208024265, 0.6320426176206414, 0.6387794556508168, 0.6455552724449345, 0.6523701054108211, 0.6592239918133873, 0.6661169687758508, 0.6730490732809419, 0.6800203421720954, 0.6870308121546249, 0.6940805197968822, 0.7011695015314021, 0.7082977936560323, 0.7154654323350483, 0.7226724536002546, 0.7299188933520705, 0.7372047873606051, 0.744530171266715, 0.7518950805830509, 0.7592995506950911, 0.7667436168621613, 0.7742273142184416, 0.7817506777739623, 0.7893137424155858, 0.7969165429079781, 0.8045591138945669, 0.8122414898984895, 0.8199637053235279, 0.8277257944550337, 0.8355277914608409, 0.8433697303921693, 0.8512516451845149, 0.8591735696585323, 0.8671355375209048, 0.8751375823652049, 0.8831797376727453, 0.8912620368134188, 0.8993845130465294, 0.907547199521614, 0.9157501292792527, 0.9239933352518732, 0.9322768502645428, 0.940600707035753, 0.9489649381781952, 0.9573695761995268, 0.9658146535031301, 0.9743002023888613, 0.9828262550537913, 0.9913928435929399, 1];

// The Color Blind Simulation function is
// copyright (c) 2000-2001 by Matthew Wickline and the
// Human-Computer Interaction Resource Network ( http://hcirn.com/ ).

var rBlind = {
  'protan': {
    'cpu': 0.735,
    'cpv': 0.265,
    'am': 1.273463,
    'ayi': -0.073894
  },
  'deutan': {
    'cpu': 1.14,
    'cpv': -0.14,
    'am': 0.968437,
    'ayi': 0.003331
  },
  'tritan': {
    'cpu': 0.171,
    'cpv': -0.003,
    'am': 0.062921,
    'ayi': 0.292119
  }
};

var fBlind = {
  'Normal': function () {
    function Normal(v) {
      return v;
    }

    return Normal;
  }(),
  'Protanopia': function () {
    function Protanopia(v) {
      return blindMK(v, 'protan');
    }

    return Protanopia;
  }(),
  'Protanomaly': function () {
    function Protanomaly(v) {
      return anomylize(v, blindMK(v, 'protan'));
    }

    return Protanomaly;
  }(),
  'Deuteranopia': function () {
    function Deuteranopia(v) {
      return blindMK(v, 'deutan');
    }

    return Deuteranopia;
  }(),
  'Deuteranomaly': function () {
    function Deuteranomaly(v) {
      return anomylize(v, blindMK(v, 'deutan'));
    }

    return Deuteranomaly;
  }(),
  'Tritanopia': function () {
    function Tritanopia(v) {
      return blindMK(v, 'tritan');
    }

    return Tritanopia;
  }(),
  'Tritanomaly': function () {
    function Tritanomaly(v) {
      return anomylize(v, blindMK(v, 'tritan'));
    }

    return Tritanomaly;
  }(),
  'Achromatopsia': function () {
    function Achromatopsia(v) {
      return monochrome(v);
    }

    return Achromatopsia;
  }(),
  'Achromatomaly': function () {
    function Achromatomaly(v) {
      return anomylize(v, monochrome(v));
    }

    return Achromatomaly;
  }()
};

function blindMK(rgb, t) {
  var wx = 0.312713;
  var wy = 0.329016;
  var wz = 0.358271;

  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  var cr = gammaTable[r];
  var cg = gammaTable[g];
  var cb = gammaTable[b];

  var cx = 0.430574 * cr + 0.341550 * cg + 0.178325 * cb;
  var cy = 0.222015 * cr + 0.706655 * cg + 0.071330 * cb;
  var cz = 0.020183 * cr + 0.129553 * cg + 0.939180 * cb;

  var sum_xyz = cx + cy + cz;
  var cu = sum_xyz != 0 ? cx / sum_xyz : 0;
  var cv = sum_xyz != 0 ? cy / sum_xyz : 0;

  var clm;
  if (cu < rBlind[t].cpu) {
    clm = (rBlind[t].cpv - cv) / (rBlind[t].cpu - cu);
  } else {
    clm = (cv - rBlind[t].cpv) / (cu - rBlind[t].cpu);
  }

  var clyi = cv - cu * clm;
  var du = (rBlind[t].ayi - clyi) / (clm - rBlind[t].am);
  var dv = clm * du + clyi;

  var sx = du * cy / dv;
  var sy = cy;
  var sz = (1 - (du + dv)) * cy / dv;

  var sr = 3.063218 * sx - 1.393325 * sy - 0.475802 * sz;
  var sg = -0.969243 * sx + 1.875966 * sy + 0.041555 * sz;
  var sb = 0.067871 * sx - 0.228834 * sy + 1.069251 * sz;

  var nx = wx * cy / wy;
  var nz = wz * cy / wy;

  var dx = nx - sx;
  var dy = 0;
  var dz = nz - sz;

  dr = 3.063218 * dx - 1.393325 * dy - 0.475802 * dz;
  dg = -0.969243 * dx + 1.875966 * dy + 0.041555 * dz;
  db = 0.067871 * dx - 0.228834 * dy + 1.069251 * dz;

  var adjr = dr ? ((sr < 0 ? 0 : 1) - sr) / dr : 0;
  var adjg = dg ? ((sg < 0 ? 0 : 1) - sg) / dg : 0;
  var adjb = db ? ((sb < 0 ? 0 : 1) - sb) / db : 0;

  var adjust = Math.max(adjr > 1 || adjr < 0 ? 0 : adjr, adjg > 1 || adjg < 0 ? 0 : adjg, adjb > 1 || adjb < 0 ? 0 : adjb);

  sr = sr + adjust * dr;
  sg = sg + adjust * dg;
  sb = sb + adjust * db;

  return [inversePow(sr), inversePow(sg), inversePow(sb)];
}

function inversePow(v) {
  return 255 * (v <= 0 ? 0 : v >= 1 ? 1 : Math.pow(v, 1 / 2.2));
}

function anomylize(a, b) {
  var v = 1.75;
  var d = v * 1 + 1;
  return [(v * b[0] + a[0] * 1) / d, (v * b[1] + a[1] * 1) / d, (v * b[2] + a[2] * 1) / d];
}

function monochrome(r) {
  var z = Math.round(r[0] * .299 + r[1] * .587 + r[2] * .114);
  return [z, z, z];
}

//
// This is what loads the image on the canvas
//

var oldRgb = [];
var oldFilteredRGB;

function runSimulation(canvasScale) {
  var simSelect = document.getElementById('SimulationSelect');
  var simType = simSelect.value.replace('cbid_', '');

  if (simType === 'NoSim') {
    simType = 'Normal';
  }

  var canvas = document.getElementById('SimulationCanvas');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.onload = function () {
    var artboardId = document.getElementById('ArtboardSelect').value;
    var width = img.width;
    var height = img.height;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    if (artboardId === 'abid_UseWindow') {
      canvas.removeAttribute('style');
    } else {
      canvas.setAttribute('style', 'width: calc(' + width + 'px / 2); transform: scale(' + canvasScale + ');');
    }
    ctx.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    var pixels = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < pixels.data.length; i += 4) {
      var filteredRGB;
      var rgb = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]];

      if (oldRgb[0] == rgb[0] && oldRgb[1] == rgb[1] && oldRgb[2] == rgb[2]) {
        filteredRGB = oldFilteredRGB;
      } else {
        filteredRGB = fBlind[simType](rgb);
        oldFilteredRGB = filteredRGB;
        oldRgb = rgb;
      }

      pixels.data[i] = filteredRGB[0];
      pixels.data[i + 1] = filteredRGB[1];
      pixels.data[i + 2] = filteredRGB[2];
    }

    ctx.putImageData(pixels, 0, 0);

    var canvasContainer = document.getElementById('CanvasContainer');
    canvasContainer.classList.remove('canvas--hidden');

    if (artboardId === 'abid_UseWindow') {
      canvasContainer.classList.add('canvas--window');
    } else {
      canvasContainer.classList.remove('canvas--window');
    }
  };

  img.src = "../snapshot.png" + "?ts=" + new Date().getTime();
}

function setColorBlindId(colorBlindId) {
  var simSelect = document.getElementById('SimulationSelect');
  simSelect.value = colorBlindId;
}

/***/ })
/******/ ]);