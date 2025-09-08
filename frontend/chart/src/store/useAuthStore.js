import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoginIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,
    checkAuth: async () => {
        try {
            const res=await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
        } catch (error) {
            console.error('Error checking authentication:', error);
            set({ authUser: null });
        }finally {
            set({ isCheckingAuth: false });
        }
    },
}));