(function() {

// From http://www.w3schools.com/js/js_cookies.asp

        function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') c = c.substring(1);
                        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return "";
        }

        function getAPIURL() {
                return "https://" + window.location.hostname + ":8080/api/v1/"
        }

        window.DEFAULT_SETTINGS = {
                user_id: 0,
                max_attempts: 1,
                eid: getCookie("session_uuid"),
                api_url: getAPIURL(),
                bank: "assessment.Bank%3A57867b0dc89cd93f9e22cc2f%40ODL.MIT.EDU%40ODL.MIT.EDU",
                assessment_offered_id: "assessment.AssessmentOffered%3A5791382bc89cd96c58adf4cc%40ODL.MIT.EDU",
                assessment_kind: "SUMMATIVE",
                questions_per_section: 1,
                questions_per_page: 1,
                unlock_next: "ON_CORRECT",
                locale: "en",
                audio_recorder_timeout: 100
        };
        window.DEFAULT_JWT = null;
})();