"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_EXTENSIONS = exports.CONTENT_TYPES = exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["AUDIO"] = "audio";
    MediaType["TEXT"] = "text";
})(MediaType || (exports.MediaType = MediaType = {}));
exports.CONTENT_TYPES = {
    [MediaType.IMAGE]: "image/jpeg",
    [MediaType.AUDIO]: "audio/mpeg",
    [MediaType.TEXT]: "text/plain",
};
exports.FILE_EXTENSIONS = {
    [MediaType.IMAGE]: ".jpg",
    [MediaType.AUDIO]: ".mp3",
    [MediaType.TEXT]: ".txt",
};
