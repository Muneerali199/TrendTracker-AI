import { collection, doc, setDoc, getDocs, deleteDoc, Firestore } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import type { Influencer } from '../data';

const INFLUENCERS_COLLECTION = 'influencers';
const USERS_COLLECTION = 'users';

const ensureDb = (): Firestore => {
    if (!isFirebaseConfigured() || !db) {
        throw new Error("Firebase is not configured. Firestore operations are disabled.");
    }
    return db;
}

export const addInfluencer = async (userId: string, influencer: Influencer): Promise<void> => {
    const firestoreDb = ensureDb();
    const influencerRef = doc(firestoreDb, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION, influencer.handle);
    await setDoc(influencerRef, influencer);
};

export const removeInfluencer = async (userId: string, handle: string): Promise<void> => {
    const firestoreDb = ensureDb();
    const influencerRef = doc(firestoreDb, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION, handle);
    await deleteDoc(influencerRef);
};

export const getInfluencers = async (userId: string): Promise<Influencer[]> => {
    const firestoreDb = ensureDb();
    const influencersCol = collection(firestoreDb, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION);
    const influencerSnapshot = await getDocs(influencersCol);
    const influencerList = influencerSnapshot.docs.map(doc => doc.data() as Influencer);
    return influencerList;
};
