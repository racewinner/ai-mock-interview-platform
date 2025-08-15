import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import FbAdminConf from "../fbadminconfig.json"

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert(
        {
          projectId: FbAdminConf.project_id,
          clientEmail: FbAdminConf.client_email,
          // Replace newlines in the private key
          privateKey: FbAdminConf.private_key,
          // process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }
      ),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();