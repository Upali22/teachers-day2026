/* =========================================================
   HAPPY TEACHER'S DAY
   FINAL SCRIPT
   ========================================================= */


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TAP TO CONTINUE
       Opening → Guiding Pillars
       ===================================================== */

    const continueButton =
        document.getElementById("continueButton");

    const guidingPillars =
        document.getElementById("guiding-pillars");


    if (continueButton && guidingPillars) {

        continueButton.addEventListener("click", function (event) {

            event.preventDefault();

            guidingPillars.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       GUIDING PILLARS
       ===================================================== */

    const pillarSlider =
        document.querySelector(".pillars-slider");

    const pillarCards =
        document.querySelectorAll(".pillar-card");

    const pillarDots =
        document.querySelectorAll(".pillar-dots span");


    if (!pillarSlider || !pillarCards.length || !pillarDots.length) {
        return;
    }


    /* =====================================================
       UPDATE GUIDING PILLARS DOT
       ===================================================== */

    function updatePillarDots() {

        const sliderRect =
            pillarSlider.getBoundingClientRect();

        const sliderCenter =
            sliderRect.left +
            sliderRect.width / 2;


        let activeIndex = 0;
        let closestDistance = Infinity;


        pillarCards.forEach(function (card, index) {

            const cardRect =
                card.getBoundingClientRect();

            const cardCenter =
                cardRect.left +
                cardRect.width / 2;


            const distance =
                Math.abs(sliderCenter - cardCenter);


            if (distance < closestDistance) {

                closestDistance = distance;
                activeIndex = index;

            }

        });


        /* Prevent index from going outside available dots */

        activeIndex =
            Math.min(
                activeIndex,
                pillarDots.length - 1
            );


        pillarDots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    }


    /* =====================================================
       INITIAL ACTIVE DOT
       ===================================================== */

    updatePillarDots();


    /* =====================================================
       UPDATE WHILE SWIPING
       ===================================================== */

    pillarSlider.addEventListener(
        "scroll",
        function () {

            requestAnimationFrame(
                updatePillarDots
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       DOT CLICK
       ===================================================== */

    pillarDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            const targetCard =
                pillarCards[index];


            if (!targetCard) {
                return;
            }


            targetCard.scrollIntoView({

                behavior: "smooth",

                block: "nearest",

                inline: "center"

            });


            /* Immediately activate clicked dot */

            pillarDots.forEach(function (item, dotIndex) {

                item.classList.toggle(
                    "active",
                    dotIndex === index
                );

            });

        });

    });


    /* =====================================================
       TOUCH END
       ===================================================== */

    pillarSlider.addEventListener(
        "touchend",
        function () {

            setTimeout(
                updatePillarDots,
                150
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        updatePillarDots
    );


});
