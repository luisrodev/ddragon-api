"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const _consts_1 = require("./_consts");
class API extends _consts_1.Constants {
    constructor(region) {
        super();
        this.region = region;
        this.getREALm();
    }
    parseURLRealm() {
        let parsed = _consts_1.Constants.REALMS.replace(`{region}`, this.region);
        return parsed;
    }
    getREALm() {
        let url = this.parseURLRealm();
        request(url, (err, res, body) => {
            if (err)
                console.log(err);
            let parsed = JSON.parse(body);
            this.version = parsed.v;
            this.language = parsed.l;
        });
    }
    getJSON(url, method, data) {
        return new Promise((success, fail) => {
            request(url, (err, res, body) => {
                if (err)
                    fail({ error: "Some error was appened" });
                if (res.statusCode == 200) {
                    success(body);
                }
                else {
                    fail({ code: res.statusCode, message: _consts_1.Constants.RESPONSE_CODES[res.statusCode] });
                }
            });
        });
    }
    makeARequest(url, method, data) {
        return new Promise((success, fail) => {
            this.getJSON(url, method, data).then((res) => {
                success(res);
            }).catch((err) => {
                fail(err);
            });
        });
    }
}
exports.API = API;
