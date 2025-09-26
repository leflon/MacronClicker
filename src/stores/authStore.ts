import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface UserData {
  username: string;
  currentScore: number;
  cumulatedScore: number;
  ownedPowerUps: [string, number][];
  ownedMultipliers: string[];
  createdAt: number;
  lastLogin: number;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const currentUser = ref<string | null>(null);
  const isGuest = ref<boolean>(false);
  const isLoggedIn = computed(() => currentUser.value !== null);

  // Initialize auth immediately - check for existing user or create guest
  const lastUser = localStorage.getItem('macronclicker:lastUser');
  if (lastUser && localStorage.getItem(`macronclicker:${lastUser}`)) {
    currentUser.value = lastUser;
    isGuest.value = lastUser === 'Guest';
  } else {
    // Create guest account and set as current user
    const guestName = 'Guest';
    if (!localStorage.getItem(`macronclicker:${guestName}`)) {
      const userData: UserData = {
        username: guestName,
        currentScore: 0,
        cumulatedScore: 0,
        ownedPowerUps: [],
        ownedMultipliers: [],
        createdAt: Date.now(),
        lastLogin: Date.now(),
      };
      localStorage.setItem(
        `macronclicker:${guestName}`,
        JSON.stringify(userData),
      );
    }
    currentUser.value = guestName;
    isGuest.value = true;
    localStorage.setItem('macronclicker:lastUser', guestName);
  }

  // Actions
  function loginAsGuest() {
    const guestName = 'Guest';

    // Create guest account if it doesn't exist
    if (!getUserData(guestName)) {
      const userData: UserData = {
        username: guestName,
        currentScore: 0,
        cumulatedScore: 0,
        ownedPowerUps: [],
        ownedMultipliers: [],
        createdAt: Date.now(),
        lastLogin: Date.now(),
      };
      localStorage.setItem(
        `macronclicker:${guestName}`,
        JSON.stringify(userData),
      );
    }

    currentUser.value = guestName;
    isGuest.value = true;
    localStorage.setItem('macronclicker:lastUser', guestName);
  }

  function createAccount(username: string): boolean {
    if (!username || username.trim() === '') {
      return false;
    }

    const trimmedUsername = username.trim();

    if (getUserData(trimmedUsername)) {
      return false;
    }

    // Transfer guest data if available
    const guestData = getUserData('Guest');
    const userData: UserData = {
      username: trimmedUsername,
      currentScore: guestData?.currentScore ?? 0,
      cumulatedScore: guestData?.cumulatedScore ?? 0,
      ownedPowerUps: guestData?.ownedPowerUps ?? [],
      ownedMultipliers: guestData?.ownedMultipliers ?? [],
      createdAt: Date.now(),
      lastLogin: Date.now(),
    };

    // Reset guest account
    if (guestData) {
      guestData.currentScore = 0;
      guestData.cumulatedScore = 0;
      guestData.ownedPowerUps = [];
      guestData.ownedMultipliers = [];
      localStorage.setItem(`macronclicker:Guest`, JSON.stringify(guestData));
    }

    localStorage.setItem(
      `macronclicker:${trimmedUsername}`,
      JSON.stringify(userData),
    );

    currentUser.value = trimmedUsername;
    isGuest.value = false;
    localStorage.setItem('macronclicker:lastUser', trimmedUsername);

    return true;
  }

  function loginUser(username: string): boolean {
    if (!username || username.trim() === '') {
      return false;
    }

    const trimmedUsername = username.trim();
    const userData = getUserData(trimmedUsername);

    if (!userData) {
      return false;
    }

    userData.lastLogin = Date.now();
    localStorage.setItem(
      `macronclicker:${trimmedUsername}`,
      JSON.stringify(userData),
    );

    currentUser.value = trimmedUsername;
    isGuest.value = false;
    localStorage.setItem('macronclicker:lastUser', trimmedUsername);

    return true;
  }

  function logout() {
    currentUser.value = null;
    isGuest.value = false;
    localStorage.removeItem('macronclicker:lastUser');
  }

  function deleteAccount(): boolean {
    if (!currentUser.value) {
      return false;
    }

    localStorage.removeItem(`macronclicker:${currentUser.value}`);

    currentUser.value = null;
    isGuest.value = false;
    localStorage.removeItem('macronclicker:lastUser');

    return true;
  }

  function resetCurrentAccount(): boolean {
    if (!currentUser.value) {
      return false;
    }

    const userData = getUserData(currentUser.value);
    if (!userData) {
      return false;
    }

    userData.currentScore = 0;
    userData.cumulatedScore = 0;
    userData.ownedPowerUps = [];
    userData.ownedMultipliers = [];

    localStorage.setItem(
      `macronclicker:${currentUser.value}`,
      JSON.stringify(userData),
    );

    return true;
  }

  function getUserData(username: string): UserData | null {
    const data = localStorage.getItem(`macronclicker:${username}`);
    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  }

  function updateUserData(userData: Partial<UserData>) {
    if (!currentUser.value) {
      return;
    }

    const existingData = getUserData(currentUser.value);
    if (!existingData) {
      return;
    }

    const updatedData = { ...existingData, ...userData };
    localStorage.setItem(
      `macronclicker:${currentUser.value}`,
      JSON.stringify(updatedData),
    );
  }

  function getAllUsers(): UserData[] {
    const users: UserData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        key.startsWith('macronclicker:') &&
        key !== 'macronclicker:lastUser'
      ) {
        const userData = getUserData(key.replace('macronclicker:', ''));
        if (userData) {
          users.push(userData);
        }
      }
    }

    return users;
  }

  function getCurrentUserData(): UserData | null {
    if (!currentUser.value) {
      return null;
    }
    return getUserData(currentUser.value);
  }

  function loadLastUser(): boolean {
    const lastUser = localStorage.getItem('macronclicker:lastUser');
    if (lastUser && getUserData(lastUser)) {
      currentUser.value = lastUser;
      isGuest.value = lastUser === 'Guest';
      return true;
    }
    return false;
  }

  function initializeAuth() {
    // Try to load last user, if none found, login as guest
    if (!loadLastUser()) {
      loginAsGuest();
    }
  }

  return {
    // State
    currentUser,
    isGuest,
    isLoggedIn,

    // Actions
    loginAsGuest,
    createAccount,
    loginUser,
    logout,
    deleteAccount,
    resetCurrentAccount,
    getUserData,
    updateUserData,
    getAllUsers,
    getCurrentUserData,
    loadLastUser,
    initializeAuth,
  };
});
