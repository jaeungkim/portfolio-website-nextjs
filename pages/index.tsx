import { useEffect } from "react";
import Layout from "../components/shared/layout";
import About from "../components/About";

const userInformation = {
  name: "123",
  password: "123",
  email: "123",
  theme: "123",
};

export default function Home() {
  useEffect(() => {
    async function encryptAndStoreData() {
      try {
        const enc = new TextEncoder();
        const encodedData = enc.encode(JSON.stringify(userInformation));

        const key = await window.crypto.subtle.generateKey(
          {
            name: "AES-GCM",
            length: 256,
          },
          true,
          ["encrypt", "decrypt"]
        );

        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv,
          },
          key,
          encodedData
        );

        const base64Data = btoa(
          String.fromCharCode.apply(null, new Uint8Array(encryptedData))
        );
        localStorage.setItem("encryptedUserInfo", base64Data);
        localStorage.setItem(
          "userInfoIV",
          btoa(String.fromCharCode.apply(null, new Uint8Array(iv)))
        );

        const exportedKey = await window.crypto.subtle.exportKey("raw", key);
        const base64Key = btoa(
          String.fromCharCode.apply(null, new Uint8Array(exportedKey))
        );
        localStorage.setItem("encryptionKey", base64Key);
      } catch (error) {
        console.error("Error encrypting or storing data:", error);
      }
    }

    encryptAndStoreData();
  }, []);

  return (
    <Layout>
      <About />
    </Layout>
  );
}
