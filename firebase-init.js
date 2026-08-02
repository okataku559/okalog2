// ============================================================================
// firebase-init.js
// 「おかログ」共通のFirebase初期化ファイル。
// index.html（検索画面）と import.html（データ取込ツール）の両方から読み込みます。
//
// 本番/検証(staging)の自動切り替え：
// アクセスしているURLのホスト名を見て、Firebase設定を自動的に切り替えます。
//   - 本番URL（okalog2.vercel.app、独自ドメインなど）→ 本番Firebase（okalog2）
//   - ホスト名に "staging" を含む、または localhost / 127.0.0.1 → 検証Firebase（okalog2-staging）
// ============================================================================

const PROD_CONFIG = {
  apiKey: "AIzaSyCASSY00FdrBv5RhRws6X-jYdQeyVg4FSo",
  authDomain: "okalog2.firebaseapp.com",
  projectId: "okalog2",
  storageBucket: "okalog2.firebasestorage.app",
  messagingSenderId: "252458333071",
  appId: "1:252458333071:web:b703307b37125b6a85d1fa",
  measurementId: "G-B0MQ58E1JY",
};

const STAGING_CONFIG = {
  apiKey: "AIzaSyAzWmjAIZXX9q_X1un9Ybe_fAtOshWoyZU",
  authDomain: "okalog2-staging.firebaseapp.com",
  projectId: "okalog2-staging",
  storageBucket: "okalog2-staging.firebasestorage.app",
  messagingSenderId: "900437272341",
  appId: "1:900437272341:web:6c25f1a31e9df32e02eb1c",
};

function isStagingHost(hostname) {
  return (
    hostname.includes("staging") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

const isStaging =
  typeof window !== "undefined" && isStagingHost(window.location.hostname);

export const firebaseConfig = isStaging ? STAGING_CONFIG : PROD_CONFIG;

console.log(
  `[おかログ] Firebase環境: ${isStaging ? "検証(staging)" : "本番(production)"} (projectId: ${firebaseConfig.projectId})`
);

export const GOOGLE_MAPS_API_KEY = "AIzaSyCnVGWGUIUMgqOw2UbjeAWKfJRsoOkgIkw";

// 削除依頼メール通知用（EmailJS）
export const EMAILJS_PUBLIC_KEY = "atB1vP1gEA7QY80dx";
export const EMAILJS_SERVICE_ID = "service_u4dvepf";
export const EMAILJS_TEMPLATE_ID = "template_vqco75e";

// ★行きたい店リストへの感想通知用（新しいテンプレートを作成後、ここに貼り付け）
export const EMAILJS_WISHLIST_TEMPLATE_ID = "ここに自分のEmailJS Template ID（行きたい店リスト用）を貼り付け";

// ★行きたい店の共有通知用（新しいテンプレートを作成後、ここに貼り付け）
export const EMAILJS_SHARE_TEMPLATE_ID = "ここに自分のEmailJS Template ID（共有通知用）を貼り付け";

// --- 以下は書き換え不要（共通の初期化処理） ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getAnalytics, isSupported as isAnalyticsSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// アクセス解析（本番のみmeasurementIdを設定済み。未対応環境やstagingではnullのまま）
export let analytics = null;
if (firebaseConfig.measurementId) {
  isAnalyticsSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}
