// src/config/firebase-service.ts
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin'; // Import the type
import serviceAccount from '../../service-account-file.json'; // Import JSON as a module

// Type assertion to ensure TypeScript recognizes it as a ServiceAccount type
const serviceAccountTyped: ServiceAccount = serviceAccount as ServiceAccount;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountTyped),
});

export class FirebaseService {
    static getInstance() {
        return new FirebaseService();
    }

    private messaging = admin.messaging();
    sendNotification(token: string, title: string, message: string) {
        const data = { username: "Phatthanaphone" }
        const payload: admin.messaging.Message = {
            notification: {
                title: title,
                body: message,
            },
            token: token,
            data: data
                || {}, // Fallback to an empty object if no custom data is provided
        };
        return this.messaging.send(payload);
    }
}
