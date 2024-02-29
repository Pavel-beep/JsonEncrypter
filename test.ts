import * as speakeasy from 'speakeasy';
import { writeFileSync, readFileSync } from 'fs';
import * as crypto from 'crypto';

const secret = speakeasy.generateSecret({ length: 20 });

// Шифрование файла
function encryptFile(filePath: string, secret: speakeasy.GeneratedSecret) {
  const fileContents = readFileSync(filePath, 'utf8');
  const cipher = crypto.createCipheriv('aes-256-ctr', secret.base32,Buffer.alloc(16, 0));
  const encrypted = Buffer.concat([cipher.update(fileContents), cipher.final()]);
  writeFileSync(filePath + '.enc', encrypted);
  console.log('Файл зашифрован.',secret);
}

// Путь к JSON файлу, который нужно зашифровать
const filePath = 'settings.json';
encryptFile(filePath, secret);