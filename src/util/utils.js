import { routers } from "../components/Router/router.config";
import { USER, ADMIN } from "../constants/LookupConst";
import sessionService from "../services/session/sessionService";
class Utils {
    loadScript(url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }

    getRoute = (path) => {
        return routers.filter((route) => route.path === path)[0];
    };

    getPageTitle = (pathname) => {
        const route = routers.filter((route) => route.path === pathname);
        return route[0].title;
    };

    getLoggedUserRedirectURL = () => {
        let dashboard;
        const user = sessionService.getLoggedUserData();

        //Login user role in the system
        let userrole = user.roles ? user.roles[0] : "";
        switch (userrole) {
            case ADMIN:
                dashboard = "/admin/manage-candidates";
                break;
            case USER:
                dashboard = "/ridings-map";
                break;
            default:
                dashboard = "";
        }
        return dashboard;
    };

    getLoggedUserRole = () => {
        const user = sessionService.getLoggedUserData();

        //find logged in user role
        let userrole = user.roles ? user.roles[0] : "";
        return userrole;
    };

    getLoggedUserTranscriptionStatus = () => {
        const user = sessionService.getLoggedUserData();
        const hidetranscript = user.hidetranscript ? user.hidetranscript : false;
        return hidetranscript;
    };

    getExpiryDate = () => {
        var validity_days = 30;
        var expires = validity_days * 1000 * 60 * 60 * 24;
        var tokenExpireDate = new Date(new Date().getTime() + expires);
        return tokenExpireDate;
    };

    generateRandomPassword = (length) => {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    ObjectId = (m = Math, d = Date, h = 16, s = (s) => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

    removeProtocolFromURL = (url) => {
        if (!url) return;
        let updatedURL = url.replace(/(^\w+:|^)\/\//, "");
        let splittedURLS = updatedURL.split(".");
        if (splittedURLS && splittedURLS.length) {
            if (splittedURLS[0] === "www") {
                return splittedURLS[1];
            } else {
                return splittedURLS[0];
            }
        }
        return "error";
    };

    convertTimeToHMSFormat = (input, separator) => {
        var pad = function (input) {
            return input < 10 ? "0" + input : input;
        };
        const convertTime = [
            Math.floor(input / 3600),
            pad(Math.floor((input % 3600) / 60)),
            pad(Math.floor(input % 60)),
        ].join(typeof separator !== "undefined" ? separator : ":");

        return convertTime;
    };

    validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
}

export default new Utils();
