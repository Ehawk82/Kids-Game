// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	var ViewManagement = Windows.UI.ViewManagement;
	var ApplicationViewWindowingMode = ViewManagement.ApplicationViewWindowingMode;
	var ApplicationView = ViewManagement.ApplicationView;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
			ApplicationView.preferredLaunchWindowingMode = ApplicationViewWindowingMode.fullScreen;
            UI.startup();//starts general program here
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};
	var UI;

	UI = {
	    createEle: (x) => { return document.createElement(x); },
	    startup: () => {
	        var startBTN = UI.createEle("button");
	        //console.log("startup");
	        startBTN.innerHTML = "Start";
	        startBTN.id = "startBTN";
	        startBTN.onclick = UI.beginningGame(startBTN);

	        hub.appendChild(startBTN);

	        setTimeout(() => { startBTN.id = "startBTN_full" }, 500);
	    },
	    beginningGame: (startBTN) => {//putting away the start button and then removing it, then triggering the loading screen; possibly ansycroniously loading userdata check here?
	        return () => {
	            //console.log(startBTN);
	            startBTN.id = "startBTN";

	            setTimeout(() => {
	                UI.triggerLoadScreen();
	                startBTN.remove();
	            }, 500);
	        }
	    },
	    triggerLoadScreen: () => {//trigger the load screen at any time, it will stay until you call to remove it
	        var ldScrn = UI.createEle("div"),
	            ldGif = UI.createEle("div");

	        ldScrn.className = "ldScrn";
	        ldScrn.innerHTML = "Loading";

	        ldGif.className = "ldGif";
	        ldGif.innerHTML = "&nbsp;";

	        hub.appendChild(ldScrn);
	        hub.appendChild(ldGif);

	        setTimeout(() => {
	            ldScrn.className = "ldScrn_full";
	            ldGif.className = "ldGif_full";

	            UI.loadUserData(ldScrn, ldGif);
	        }, 50);
	    },
	    killLoadScreen: (ldScrn, ldGif) => {//kills the loading elements

	        ldScrn.className = "ldScrn";
	        ldGif.className = "ldGif";

            setTimeout(() => {
	           ldScrn.remove();
	           ldGif.remove();
            }, 500);
	    },
        loadUserData: (ldScrn, ldGif) => {//here is where the game checks the user data

                console.log("loading user status..");
                setTimeout(() => { UI.killLoadScreen(ldScrn, ldGif); }, 2000);
            
	    }
	};
	app.start();

})();
