"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const speakeasy = __importStar(require("speakeasy"));
const fs_1 = require("fs");
const crypto = __importStar(require("crypto"));
const secret = speakeasy.generateSecret({ length: 20 });
// Шифрование файла
function encryptFile(filePath, secret) {
    const fileContents = (0, fs_1.readFileSync)(filePath, 'utf8');
    const cipher = crypto.createCipheriv('aes-256-ctr', secret.base32, Buffer.alloc(16, 0));
    const encrypted = Buffer.concat([cipher.update(fileContents), cipher.final()]);
    (0, fs_1.writeFileSync)(filePath + '.enc', encrypted);
    console.log('Файл зашифрован.', secret);
}
// Путь к JSON файлу, который нужно зашифровать
const filePath = 'settings.json';
encryptFile(filePath, secret);
