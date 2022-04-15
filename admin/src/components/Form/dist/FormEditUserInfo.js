"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserTextRule = void 0;
var antd_1 = require("antd");
var reg_1 = require("@/constant/reg");
var system_1 = require("@/api/system");
var db_1 = require("@/config/db");
exports.UserTextRule = {
    message: '只允许包含数字、字母、下划线',
    pattern: reg_1.CONSTANT_REG.NUMBER_LETTER
};
;
/**
 * @name FormEditUserInfo Form组件 用户基本信息编辑
 */
var FormEditUserInfo = function (_a) {
    var id = _a.id;
    var edit = Boolean(id);
    function checkFields(field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var bol;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, system_1.checkAdminUserField((_a = {}, _a[db_1.DB_PRIMARY_KEY] = id, _a[field] = value, _a))];
                    case 1:
                        bol = _b.sent();
                        return [2 /*return*/, bol ? bol : Promise.reject('该字符已被占用，请更换后重试')];
                }
            });
        });
    }
    ;
    return (React.createElement(React.Fragment, null,
        React.createElement(antd_1.Form.Item, { label: '\u767B\u5F55\u8D26\u53F7', name: 'account', rules: [
                { required: true, message: '请输入登录账号' },
                exports.UserTextRule,
            ] },
            React.createElement(antd_1.Input, { disabled: edit, placeholder: '\u8BF7\u8F93\u5165\u8D26\u53F7(\u4EC5\u652F\u6301\u6570\u5B57\u3001\u5B57\u6BCD\u3001\u4E0B\u5212\u7EBF)', allowClear: true })),
        edit ? null : React.createElement(antd_1.Form.Item, { label: '\u767B\u5F55\u5BC6\u7801', name: 'password', rules: [
                { required: true, message: '请输入登录密码' }, exports.UserTextRule
            ] },
            React.createElement(antd_1.Input.Password, { placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801(\u4EC5\u652F\u6301\u6570\u5B57\u3001\u5B57\u6BCD\u3001\u4E0B\u5212\u7EBF)', type: 'password', allowClear: true })),
        React.createElement(antd_1.Form.Item, { label: '\u7528\u6237\u540D\u79F0', name: 'name', rules: [
                { required: true, min: 2, max: 4, message: '请输入用户昵称' },
            ] },
            React.createElement(antd_1.Input, { placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0(2-4\u4E2A\u5B57\u7B26)', allowClear: true })),
        React.createElement(antd_1.Form.Item, { label: '\u8054\u7CFB\u7535\u8BDD', name: 'phone', rules: [
                { required: true, message: '请输入登录密码' },
                { message: '仅支持11位手机号', pattern: reg_1.CONSTANT_REG.PHONE_NUMBER },
            ] },
            React.createElement(antd_1.Input, { placeholder: '\u8BF7\u8F93\u516511\u4F4D\u7535\u8BDD\u53F7\u7801', allowClear: true }))));
};
exports["default"] = FormEditUserInfo;
