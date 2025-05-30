import '@testing-library/jest-dom';

import dotenv from "dotenv";
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from "util";

dotenv.config({ path: ".env.test" });

Object.assign(global, {
  TextDecoder: NodeTextDecoder as unknown as typeof globalThis.TextDecoder,
  TextEncoder: NodeTextEncoder as unknown as typeof globalThis.TextEncoder,
});

if (typeof window !== "undefined") {
  if (typeof window.TextEncoder === "undefined") {
    (window as any).TextEncoder = NodeTextEncoder;
  }
  if (typeof window.TextDecoder === "undefined") {
    (window as any).TextDecoder = NodeTextDecoder;
  }
}
