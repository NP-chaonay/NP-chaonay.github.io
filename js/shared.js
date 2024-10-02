// [Basic Zone]
npchaonay_website = Object();
npchaonay_website.shared = Object();
npchaonay_website.main = Object();
npchaonay_website.shared.temp = Object();
npchaonay_website.shared.html = document.getElementsByTagName("html")[0];
npchaonay_website.shared.head = document.getElementsByTagName("head")[0];
npchaonay_website.shared.body = document.getElementsByTagName("body")[0];
// [Function Zone : for later execution for lang-dep shared js]
npchaonay_website.shared.afterlangdepsharedjs = function afterlangdepsharedjs() {
	if (npchaonay_website.shared.elementAds) {
		document.getElementById("ReservedNameForSharedJS_ADS__RICKROLL").onpointerover = function onpointerover() {
			if (!speechSynthesis.speaking) {
				if (speechSynthesis.pending) { speechSynthesis.resume(); }
				else { npchaonay_website.shared.rickroll.doMainSpeech(); }
			} else { speechSynthesis.pause(); speechSynthesis.pause(); speechSynthesis.pause(); speechSynthesis.pause(); }
			document.getElementById("ReservedNameForSharedJS_ADS__RICKROLL").style.filter = "";
		};
	}
}
// [Function Zone]
npchaonay_website.shared.npc_random = function npc_random() {
	while (true) {
		tmp = Math.random()
		if (tmp === 0) { continue; }
		else { return tmp; }
	}
}
npchaonay_website.shared.npc_random_bool = function npc_random_bool() {
	while (true) {
		tmp = npchaonay_website.shared.npc_random();
		if (tmp === 0.5) { continue; }
		else { return tmp >= 0.5; }
	}
}
npchaonay_website.shared.rand_255 = function rand_255() {
	return Math.round(255 * npchaonay_website.shared.npc_random());
}
npchaonay_website.shared.make_rgb_str = function make_rgb_str(colorTuple) {
	return "rgb(" + colorTuple[0] + "," + colorTuple[1] + "," + colorTuple[2] + ")";
}
// Adapted by: https://webaim.org/resources/contrastchecker/
npchaonay_website.shared.checkContrastHelper_getsRGB = function checkContrastHelper_getsRGB(c) {
	c = c / 255;
	c = (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
	return c;
}
// Adapted by: https://webaim.org/resources/contrastchecker/
npchaonay_website.shared.checkContrastHelper_getL = function checkContrastHelper_getL(r, g, b) {
	return (0.2126 * npchaonay_website.shared.checkContrastHelper_getsRGB(r) + 0.7152 * npchaonay_website.shared.checkContrastHelper_getsRGB(g) + 0.0722 * npchaonay_website.shared.checkContrastHelper_getsRGB(b));
}
// Adapted by: https://webaim.org/resources/contrastchecker/
npchaonay_website.shared.checkContrast = function checkContrast(fg, bg) {
	var L1 = npchaonay_website.shared.checkContrastHelper_getL(fg[0], fg[1], fg[2]), L2 = npchaonay_website.shared.checkContrastHelper_getL(bg[0], bg[1], bg[2]), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
	return (ratio >= 4.5);
}
npchaonay_website.shared.compareColorL = function compareColorL(fColor, lColor) {
	color = fColor;
	cmin = Math.min(color[0], color[1], color[2]) / 255;
	cmax = Math.max(color[0], color[1], color[2]) / 255;
	tmp1 = (cmin + cmax) / 2;
	color = lColor;
	cmin = Math.min(color[0], color[1], color[2]) / 255;
	cmax = Math.max(color[0], color[1], color[2]) / 255;
	tmp2 = (cmin + cmax) / 2;
	if (tmp1 < tmp2) { return -1; }
	else if (tmp1 > tmp2) { return 1; }
	else { return 0; }
}
// adapted from above
npchaonay_website.shared.checkHalfContrast = function checkHalfContrast(fg, bg) {
	var L1 = npchaonay_website.shared.checkContrastHelper_getL(fg[0], fg[1], fg[2]), L2 = npchaonay_website.shared.checkContrastHelper_getL(bg[0], bg[1], bg[2]), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
	return (ratio >= 2.25);
}
npchaonay_website.shared.checkColorIfSuggestedForDarkLightScheme = function checkColorIfSuggestedForDarkLightScheme(fg, bg, doDarkMode) {
	cmin = Math.min(bg[0], bg[1], bg[2]) / 255;
	cmax = Math.max(bg[0], bg[1], bg[2]) / 255;
	if (doDarkMode) {
		return ((cmin + cmax) / 2 <= 1 / 3);
	} else {
		return ((cmin + cmax) / 2 >= 2 / 3);
	}
}
npchaonay_website.shared.get_rand_dark_style = function get_rand_dark_style() {
	while (true) {
		tmp2 = [npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255()];
		tmp3 = [npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255()];
		if (npchaonay_website.shared.checkColorIfSuggestedForDarkLightScheme(tmp3, tmp2, true) && npchaonay_website.shared.checkContrast(tmp3, tmp2)) { break; }
	}
	return [tmp3, tmp2];
}
// little adapt from above
npchaonay_website.shared.get_rand_light_style = function get_rand_light_style() {
	while (true) {
		tmp2 = [npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255()];
		tmp3 = [npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255(), npchaonay_website.shared.rand_255()];
		if (npchaonay_website.shared.checkColorIfSuggestedForDarkLightScheme(tmp3, tmp2, false) && npchaonay_website.shared.checkContrast(tmp3, tmp2)) { break; }
	}
	return [tmp3, tmp2];
}
npchaonay_website.shared.get_rand_lightdark_style = function get_rand_lightdark_style() {
	temp = [npchaonay_website.shared.get_rand_light_style(), npchaonay_website.shared.get_rand_dark_style()];
	// if true then generate dark theme else generate light theme
	if (npchaonay_website.shared.npc_random_bool()) {
		temp[0][0][0] = 255 - temp[1][0][0];
		temp[0][0][1] = 255 - temp[1][0][1];
		temp[0][0][2] = 255 - temp[1][0][2];
		temp[0][1][0] = 255 - temp[1][1][0];
		temp[0][1][1] = 255 - temp[1][1][1];
		temp[0][1][2] = 255 - temp[1][1][2];
	} else {
		temp[1][0][0] = 255 - temp[0][0][0];
		temp[1][0][1] = 255 - temp[0][0][1];
		temp[1][0][2] = 255 - temp[0][0][2];
		temp[1][1][0] = 255 - temp[0][1][0];
		temp[1][1][1] = 255 - temp[0][1][1];
		temp[1][1][2] = 255 - temp[0][1][2];
	}
	return temp;
}
// [Var Zone]
npchaonay_website.shared.forceColorMode = 0;
npchaonay_website.shared.temp.colorSchemeChanging = Object();
npchaonay_website.shared.rickroll = Object();
npchaonay_website.shared.rickroll.speechText = "We're no strangers to love\nYou know the rules and so do I (do I)\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching, but you're too shy to say it (say it)\nInside, we both know what's been going on (going on)\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching, but you're too shy to say it (to say it)\nInside, we both know what's been going on (going on)\nWe know the game and we're gonna play it\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you".split("\n");
npchaonay_website.shared.elementAds = document.getElementById("ReservedNameForSharedJS_ADS");
if (this.hasOwnProperty("npchaonay_website_script_env__shared")) {
	if (npchaonay_website_script_env__shared["doNotSetRegularStyle"]) { npchaonay_website.shared.doNotSetRegularStyle = true; }
	else { npchaonay_website.shared.doNotSetRegularStyle = false; }
} else { npchaonay_website.shared.doNotSetRegularStyle = false; }
npchaonay_website.shared.mainCSSmessage = null;

// [Func Zone]
npchaonay_website.shared.rickroll.doMainSpeech = function doMainSpeech() {
	//tmp = npchaonay_website.shared.rickroll.doMainSpeech;
	//npchaonay_website.shared.rickroll.doMainSpeech = function dummy() { };
	for (i = 0; i < npchaonay_website.shared.rickroll.speechText.length; i++) {
		speech = new SpeechSynthesisUtterance(npchaonay_website.shared.rickroll.speechText[i]);
		// if no random method?: rate,pitch=1.5,1.25
		speech.rate = 0.5 + 1.5 * npchaonay_website.shared.npc_random();
		speech.pitch = 0.5 + 1.5 * npchaonay_website.shared.npc_random();
		speechSynthesis.speak(speech);
	}
	//npchaonay_website.shared.rickroll.doMainSpeech = tmp;
}
// [Execute Zone]
if (npchaonay_website.shared.elementAds) { npchaonay_website.shared.elementAds.classList.add("uses-adaptive-color-scheme-ReservedNameForSharedJS_ADS"); }
document.getElementById("jsAlertDiv").hidden = true;
document.getElementById("mainDiv").hidden = false;
if (!npchaonay_website.shared.doNotSetRegularStyle) {
	npchaonay_website.shared.temp.colorSchemeChanging.is_functmp1_blocked = false;
	npchaonay_website.shared.temp.colorSchemeChanging.functmp1 = function functmp1() {
		if (npchaonay_website.shared.temp.colorSchemeChanging.is_functmp1_blocked) { return; }
		else { npchaonay_website.shared.temp.colorSchemeChanging.is_functmp1_blocked = true; }
		forceMode = npchaonay_website.shared.forceColorMode;
		npchaonay_website.shared.mainCSSmessage = "\
			@media (prefers-color-scheme: light) {\n\
				.uses-adaptive-color-scheme {\n\
					color-scheme: light; color: $LIGHTFGCOLOR; background-color: $LIGHTBGCOLOR;\n\
				}\n\
				.uses-adaptive-color-scheme-ReservedNameForSharedJS_ADS {\n\
					color-scheme: light; color: $LIGHTFGCOLOR_ADS; background-color: $LIGHTBGCOLOR_ADS;\n\
				}\n\
			}\n\
			@media (prefers-color-scheme: dark) {\n\
				.uses-adaptive-color-scheme {\n\
					color-scheme: dark; color: $DARKFGCOLOR; background-color: $DARKBGCOLOR;\n\
				}\n\
				.uses-adaptive-color-scheme-ReservedNameForSharedJS_ADS {\n\
					color-scheme: dark; color: $DARKFGCOLOR_ADS; background-color: $DARKBGCOLOR_ADS;\n\
				}\n\
			}"
		if (forceMode === null || forceMode === 0) { }
		else if (forceMode > 0) {
			npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("$DARK", "$LIGHT");
			npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("color-scheme: dark;", "color-scheme: light;");
		}
		else if (forceMode < 0) {
			npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("$LIGHT", "$DARK");
			npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("color-scheme: light;", "color-scheme: dark;");
		}
		npchaonay_website.shared.mainCSSmessageBak = npchaonay_website.shared.mainCSSmessage;
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme = [npchaonay_website.shared.get_rand_lightdark_style(), npchaonay_website.shared.get_rand_lightdark_style()];
		while (true) {
			if (npchaonay_website.shared.compareColorL(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][1], npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][1]) < 0 && npchaonay_website.shared.compareColorL(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][1], npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][1]) > 0) { break; }
			npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1] = npchaonay_website.shared.get_rand_lightdark_style();
		}
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][0] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][0]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][1] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][1]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][0] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][0]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][1] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][1]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][0] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][0]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][1] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][1]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][0] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][0]);
		npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][1] = npchaonay_website.shared.make_rgb_str(npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][1]);
		npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("$LIGHTFGCOLOR_ADS", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][0]).replaceAll("$LIGHTBGCOLOR_ADS", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][0][1]).replaceAll("$DARKFGCOLOR_ADS", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][0]).replaceAll("$DARKBGCOLOR_ADS", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[1][1][1]);
		npchaonay_website.shared.mainCSSmessage = npchaonay_website.shared.mainCSSmessage.replaceAll("$LIGHTFGCOLOR", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][0]).replaceAll("$LIGHTBGCOLOR", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][0][1]).replaceAll("$DARKFGCOLOR", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][0]).replaceAll("$DARKBGCOLOR", npchaonay_website.shared.temp.colorSchemeChanging.colorScheme[0][1][1]);
		document.getElementById("mainCSS").innerHTML = npchaonay_website.shared.mainCSSmessage;
		npchaonay_website.shared.temp.colorSchemeChanging.is_functmp1_blocked = false;
	}
	npchaonay_website.shared.temp.colorSchemeChanging.functmp1()
}