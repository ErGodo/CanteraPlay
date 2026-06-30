import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let projectRoot = path.dirname(__filename);

if (projectRoot.endsWith('.next') || projectRoot.includes('.next' + path.sep)) {
  projectRoot = path.resolve(projectRoot, '..');
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: projectRoot,
    },
  },
};

export default config;

