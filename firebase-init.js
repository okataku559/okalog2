// ============================================================================
// firebase-init.js
// 「おかログ」共通のFirebase初期化ファイル。
// index.html（検索画面）と import.html（データ取込ツール）の両方から読み込みます。
//
// ★このファイルは編集不要です。このままGitHubにアップロードしてください。
// ============================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyCASSY00FdrBv5RhRws6X-jYdQeyVg4FSo",
  authDomain: "okalog2.firebaseapp.com",
  projectId: "okalog2",
  storageBucket: "okalog2.firebasestorage.app",
  messagingSenderId: "252458333071",
  appId: "1:252458333071:web:b703307b37125b6a85d1fa",
  measurementId: "G-B0MQ58E1JY",
};

export const GOOGLE_MAPS_API_KEY = "AIzaSyCnVGWGUIUMgqOw2UbjeAWKfJRsoOkgIkw";

// 削除依頼メール通知用（EmailJS）
export const EMAILJS_PUBLIC_KEY = "atB1vP1gEA7QY80dx";
export const EMAILJS_SERVICE_ID = "service_u4dvepf";
export const EMAILJS_TEMPLATE_ID = "template_vqco75e";

// --- 以下は書き換え不要（共通の初期化処理） ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
