import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Influencer } from '../data';

const supabase = createClientComponentClient();

const INFLUENCERS_TABLE = 'influencers';

export const addInfluencer = async (userId: string, influencer: Influencer): Promise<boolean> => {
    const { error } = await supabase
        .from(INFLUENCERS_TABLE)
        .insert([{ user_id: userId, handle: influencer.handle, data: influencer }]);

    if (error) {
        console.error('Error adding influencer:', error);
        return false;
    }
    return true;
};

export const removeInfluencer = async (userId: string, handle: string): Promise<boolean> => {
    const { error } = await supabase
        .from(INFLUENCERS_TABLE)
        .delete()
        .match({ user_id: userId, handle: handle });
    
    if (error) {
        console.error('Error removing influencer:', error);
        return false;
    }
    return true;
};

export const getInfluencers = async (userId: string): Promise<Influencer[] | null> => {
    const { data, error } = await supabase
        .from(INFLUENCERS_TABLE)
        .select('data')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching influencers:', error);
        return null;
    }
    
    return data.map(item => item.data);
};
