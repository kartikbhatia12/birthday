/* ==========================================
   OPERATION BIRTHDAY GIRL
   Scene Manager
========================================== */

const portal = document.getElementById("portal");
const verify = document.getElementById("verify");
const loadingScreen = document.getElementById("loadingScreen");
const caseFile = document.getElementById("caseFile");
const evidenceScreen = document.getElementById("evidenceScreen");
const overlay = document.getElementById("overlay");

const accessBtn = document.getElementById("accessBtn");
const answers = document.querySelectorAll(".answer");
const evidenceBtn = document.getElementById("evidenceBtn");

const profileScreen=document.getElementById("profileScreen");

const friendshipProfile=document.getElementById("friendshipProfile");



/* ==========================================
   SAVE & RESTORE SCREEN (FIXED)
   - If there's no saved screen, or the saved
     screen id no longer exists in the DOM,
     we fall back to the portal screen instead
     of leaving every screen hidden.
========================================== */

window.addEventListener("DOMContentLoaded", () => {

    const savedScreen = localStorage.getItem("currentScreen");

    const screen = savedScreen && document.getElementById(savedScreen);

    // Remove "active" from every screen first
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
    });

    if (screen) {

        screen.classList.add("active");

    } else {

        // Saved value was missing/invalid -> clean it up and show portal
        localStorage.removeItem("currentScreen");

        if (portal) {
            portal.classList.add("active");
        }

    }

    window.scrollTo(0, 0);

});


/* ==========================================
   Scene Switch Function
========================================== */

function showScreen(current, next){

    if(!current){
        console.error("Current screen not found");
        return;
    }

    if(!next){
        console.error("Next screen not found");
        return;
    }

    overlay.classList.add("show");

    setTimeout(()=>{

        current.classList.remove("active");
        next.classList.add("active");

        window.scrollTo(0,0);

        const blockedScreens=[
            "portal",
            "verify",
            "loadingScreen",
            "caseFile",
            "evidenceScreen",
            "systemError",
            "bhatiaflixIntro",
            "bonusUnlock",
            "creditsScene"
        ];

        if(!blockedScreens.includes(next.id)){
            localStorage.setItem("currentScreen",next.id);
        }

        setTimeout(()=>{
            overlay.classList.remove("show");
        },150);

    },450);

}
    /* ==========================================
       Portal
    ========================================== */

    accessBtn.addEventListener("click", () => {

        showScreen(portal, verify);

    });

    /* ==========================================
       Identity Verification
    ========================================== */

    answers.forEach(button => {

        button.addEventListener("click", () => {

            answers.forEach(btn => btn.disabled = true);

            button.innerHTML = "✅ Correct";

            button.style.background =
                "linear-gradient(90deg,#ff4d8d,#7c5cff)";

            button.style.borderColor = "#ff4d8d";

            setTimeout(() => {

                verificationSequence();

            }, 1000);

        });

    });

    /* ==========================================
       Verification Sequence
    ========================================== */

    function verificationSequence() {

        showScreen(verify, loadingScreen);

        const bar = document.getElementById("loadingBar");

        const step1 = document.getElementById("step1");

        const step2 = document.getElementById("step2");

        const step3 = document.getElementById("step3");

        bar.style.width = "0%";

        step1.innerHTML = "⬜ Decrypting Friendship Records...";
        step2.innerHTML = "⬜ Checking Memories...";
        step3.innerHTML = "⬜ Preparing Classified File...";

        setTimeout(() => {

            step1.innerHTML = "✅ Friendship Records Found";
            bar.style.width = "35%";

        }, 700);

        setTimeout(() => {

            step2.innerHTML = "✅ Memories Verified";
            bar.style.width = "70%";

        }, 1600);

        setTimeout(() => {

            step3.innerHTML = "✅ Classified File Ready";
            bar.style.width = "100%";

        }, 2600);

        setTimeout(() => {

            showScreen(loadingScreen, caseFile);

    }, 3600);

    }   


    /* ==========================================
       Evidence Button
    ========================================== */

    if (evidenceBtn) {

        evidenceBtn.addEventListener("click", () => {

           if (!evidenceScreen) return;

            showScreen(caseFile, evidenceScreen);

            setTimeout(() => {

                startEvidenceScan();

            },600);

        });

    }

    /* ==========================================
        Evidence Scan
    ========================================== */

    function startEvidenceScan() {

        const bar = document.getElementById("evidenceBar");

        const photo = document.getElementById("photoStatus");

        const chat = document.getElementById("chatStatus");

        const memory = document.getElementById("memoryStatus");

        const timeline = document.getElementById("timelineStatus");

        if (!bar) return;

        bar.style.width = "0%";

        photo.innerHTML = "Searching...";
        chat.innerHTML = "Searching...";
        memory.innerHTML = "Searching...";
        timeline.innerHTML = "Searching...";

        setTimeout(() => {

            photo.innerHTML = "✅ Found";
            bar.style.width = "25%";

        }, 700);

        setTimeout(() => {

            chat.innerHTML = "✅ Found";
            bar.style.width = "50%";

        }, 1400);

        setTimeout(() => {

            memory.innerHTML = "✅ Found";
            bar.style.width = "75%";

        }, 2100);

        setTimeout(() => {

            timeline.innerHTML = "✅ Found";
            bar.style.width = "100%";

        }, 2800);

        // Next milestone

        setTimeout(()=>{
        
            showScreen(
                evidenceScreen,
                document.getElementById("systemError")
           );

            startSystemError();

        },4200);

    }

    function startSystemError(){

        const text=document.getElementById("errorLine");

        const bar=document.getElementById("errorBar");

        bar.style.width="0%";

        setTimeout(()=>{

            text.innerHTML="Attempting Recovery...";

            bar.style.width="30%";

        },700);

        setTimeout(()=>{

            text.innerHTML="Converting Memories...";

            bar.style.width="60%";

        },1700);

        setTimeout(()=>{

            text.innerHTML="Switching To Entertainment Mode...";

            bar.style.width="100%";

        },2700);

        setTimeout(()=>{

            document.body.classList.add("glitch");

        },3200);

        setTimeout(()=>{

            overlay.classList.add("show");

        },4200);

        setTimeout(()=>{

            document.body.classList.remove("glitch");

        },4200);

        setTimeout(()=>{

            showScreen(
               document.getElementById("systemError"),
                document.getElementById("bhatiaflixIntro")
            );

        },4700);

        setTimeout(()=>{

            startBhatiaflixIntro();

        },5200);

    }


    function startBhatiaflixIntro(){

        const logo=document.querySelector(".introLogo");

        const text=document.querySelector(".introText");

        logo.classList.add("logoAnimation");

        text.classList.add("textAnimation");

        setTimeout(()=>{

            showScreen(
               document.getElementById("bhatiaflixIntro"),
                profileScreen
            );

        },4000);

    }

    friendshipProfile.onclick=()=>{

        showScreen(

            profileScreen,

            document.getElementById("netflixHome")

        );

    }

    const watchSeriesBtn = document.getElementById("watchSeries");

    if(watchSeriesBtn){

        watchSeriesBtn.onclick = () => {

            showScreen(
                document.getElementById("netflixHome"),
                document.getElementById("episode1")
            );

        };

    }


    document.getElementById("nextEpisode").onclick=()=>{

        alert("Episode 2 Coming Next 😂");

    };

    const episodeCards = document.querySelectorAll(".episodeCard");

    episodeCards.forEach(card=>{

        card.onclick=()=>{

            const ep=card.dataset.episode;

            showScreen(
               document.getElementById("netflixHome"),
                document.getElementById("episode"+ep)
        );

        }

    });

document.getElementById("nextEpisode").onclick=()=>{

    showScreen(

        document.getElementById("episode1"),

        document.getElementById("episode2")

    );

};

document.getElementById("nextEpisode2").onclick = () => {

    showScreen(

        document.getElementById("episode2"),

        document.getElementById("episode3")

    );

};

const restartBtn=document.getElementById("restartStory");

if(restartBtn){

    restartBtn.onclick=()=>{

        localStorage.clear();

        location.reload();

    };

}

document.getElementById("backHome1").onclick = () => {

    showScreen(
        document.getElementById("episode1"),
        document.getElementById("netflixHome")
    );

};

document.getElementById("backHome2").onclick = () => {

    showScreen(
        document.getElementById("episode2"),
        document.getElementById("netflixHome")
    );

};

document.getElementById("backHome3").onclick = () => {

    showScreen(

        document.getElementById("episode3"),

        document.getElementById("netflixHome")

    );

};

document.getElementById("nextEpisode3").onclick = () => {

    showScreen(

        document.getElementById("episode3"),

        document.getElementById("episode4")

    );

};

document.getElementById("backHome4").onclick = () => {

    showScreen(

        document.getElementById("episode4"),

        document.getElementById("netflixHome")

    );

};

document.getElementById("nextEpisode4").onclick = () => {

    showScreen(

        document.getElementById("episode4"),

        document.getElementById("netflixHome")

    );

};

/* ==========================================
   Bonus Episode — Unlock Sequence
========================================== */

const bonusCardBtn = document.getElementById("bonusCardBtn");
const bonusUnlock = document.getElementById("bonusUnlock");
const bonusEpisode = document.getElementById("bonusEpisode");
const backHomeBonus = document.getElementById("backHomeBonus");

if(bonusCardBtn){

    bonusCardBtn.onclick = () => {

        showScreen(
            document.getElementById("netflixHome"),
            bonusUnlock
        );

        setTimeout(()=>{

            startBonusUnlock();

        },600);

    };

}

function startBonusUnlock(){

    const lockEmoji = document.getElementById("lockEmoji");
    const unlockText = document.getElementById("unlockText");
    const bar = document.getElementById("unlockBar");

    if(!lockEmoji || !unlockText || !bar) return;

    // reset state every time it plays
    lockEmoji.textContent = "🔒";
    lockEmoji.classList.remove("shake","popOpen");
    unlockText.textContent = "Unlocking Bonus Episode...";
    bar.style.width = "0%";

    setTimeout(()=>{

        lockEmoji.classList.add("shake");
        unlockText.textContent = "Verifying Access Code...";
        bar.style.width = "30%";

    },500);

    setTimeout(()=>{

        unlockText.textContent = "Bypassing Chudail Firewall 👻...";
        bar.style.width = "65%";

    },1600);

    setTimeout(()=>{

        lockEmoji.classList.remove("shake");
        lockEmoji.classList.add("popOpen");
        lockEmoji.textContent = "🔓";
        unlockText.textContent = "Access Granted 🎉";
        bar.style.width = "100%";

    },2600);

    setTimeout(()=>{

        showScreen(bonusUnlock, bonusEpisode);

    },3600);

}

if(backHomeBonus){

    backHomeBonus.onclick = () => {

        showScreen(
            bonusEpisode,
            document.getElementById("netflixHome")
        );

    };

}

/* ==========================================
   Bonus Episode — Rolling Credits
========================================== */

const rollCreditsBtn = document.getElementById("rollCreditsBtn");
const creditsScene = document.getElementById("creditsScene");
const creditsRoll = document.getElementById("creditsRoll");
const backHomeCredits = document.getElementById("backHomeCredits");

if(rollCreditsBtn && creditsScene && creditsRoll){

    rollCreditsBtn.onclick = () => {

        showScreen(bonusEpisode, creditsScene);

        setTimeout(()=>{

            startCreditsRoll();

        },500);

    };

}

function startCreditsRoll(){

    if(!creditsRoll) return;

    // restart the CSS animation from scratch every time it plays
    creditsRoll.classList.remove("rolling");

    void creditsRoll.offsetWidth; // force reflow so the animation restarts

    creditsRoll.classList.add("rolling");

    // once the credits finish scrolling, head back home automatically
    creditsRoll.addEventListener("animationend", function onEnd(){

        creditsRoll.removeEventListener("animationend", onEnd);

        if(creditsScene && creditsScene.classList.contains("active")){

            showScreen(
                creditsScene,
                document.getElementById("netflixHome")
            );

        }

    });

}

if(backHomeCredits){

    backHomeCredits.onclick = () => {

        creditsRoll.classList.remove("rolling");

        showScreen(
            creditsScene,
            document.getElementById("netflixHome")
        );

    };

}