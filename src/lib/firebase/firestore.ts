import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import type { Influencer } from '../data';

const INFLUENCERS_COLLECTION = 'influencers';
const USERS_COLLECTION = 'users';

export const addInfluencer = async (userId: string, influencer: Influencer): Promise<void> => {
    const influencerRef = doc(db, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION, influencer.handle);
    await setDoc(influencerRef, influencer);
};

export const removeInfluencer = async (userId: string, handle: string): Promise<void> => {
    const influencerRef = doc(db, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION, handle);
    await deleteDoc(influencerRef);
};

export const getInfluencers = async (userId: string): Promise<Influencer[]> => {
    const influencersCol = collection(db, USERS_COLLECTION, userId, INFLUENCERS_COLLECTION);
    const influencerSnapshot = await getDocs(influencersCol);
    const influencerList = influencerSnapshot.docs.map(doc => doc.data() as Influencer);
    return influencerList;
};
