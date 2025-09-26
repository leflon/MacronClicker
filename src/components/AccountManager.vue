<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores';
import { useGameStore } from '@/stores/gameStore';
import Leaderboard from './Leaderboard.vue';

const authStore = useAuthStore();

const showMenu = ref(false);
const showLeaderboard = ref(false);
const showCreateForm = ref(false);
const showLoginForm = ref(false);
const username = ref('');
const errorMessage = ref('');

function toggleMenu() {
  showMenu.value = !showMenu.value;
  if (!showMenu.value) {
    closeAllForms();
  }
}

function closeAllForms() {
  showCreateForm.value = false;
  showLoginForm.value = false;
  showLeaderboard.value = false;
  errorMessage.value = '';
  username.value = '';
}

function openLeaderboard() {
  showLeaderboard.value = true;
  showMenu.value = false;
}

function closeLeaderboard() {
  showLeaderboard.value = false;
}

function showCreate() {
  showCreateForm.value = true;
  showLoginForm.value = false;
  showMenu.value = false;
  errorMessage.value = '';
  username.value = '';
}

function showLogin() {
  showLoginForm.value = true;
  showCreateForm.value = false;
  showMenu.value = false;
  errorMessage.value = '';
  username.value = '';
}

const availableUsers = computed(() => {
  return authStore
    .getAllUsers()
    .filter((user) => user.username !== 'Guest')
    .map((user) => user.username);
});

function handleLoginUserClick(user: string) {
  const success = authStore.loginUser(user);
  if (success) {
    closeAllForms();
  } else {
    errorMessage.value = 'Account not found';
  }
}

function handleCreateAccount() {
  if (!username.value.trim()) {
    errorMessage.value = 'Please enter a username';
    return;
  }

  const success = authStore.createAccount(username.value);
  if (success) {
    closeAllForms();
  } else {
    errorMessage.value = 'Username already exists or is invalid';
  }
}

function handleLogin() {
  if (!username.value.trim()) {
    errorMessage.value = 'Please enter a username';
    return;
  }

  const success = authStore.loginUser(username.value);
  if (success) {
    closeAllForms();
  } else {
    errorMessage.value = 'Account not found';
  }
}

function handleDeleteAccount() {
  if (
    confirm(
      'Are you sure you want to delete your account? This cannot be undone!',
    )
  ) {
    authStore.deleteAccount();
    authStore.loginAsGuest();
  }
}

function handleLogout() {
  authStore.logout();
  authStore.loginAsGuest();
  closeAllForms();
}

function handleReset() {
  const gameStore = useGameStore();
  const isGuest = authStore.isGuest;
  const message = isGuest
    ? 'Are you sure you want to reset your guest progress? This cannot be undone!'
    : 'Are you sure you want to reset your account progress? Your score and items will be lost, but your username will be kept. This cannot be undone!';

  if (confirm(message)) {
    authStore.resetCurrentAccount();
    gameStore.resetGame();
    closeAllForms();
  }
}

// Close popups when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.account-manager') && !target.closest('.popup')) {
    showMenu.value = false;
    closeAllForms();
  }
}

// Add event listener for clicking outside
document.addEventListener('click', handleClickOutside);
</script>

<template>
  <div class="account-manager">
    <div class="account-button" @click="toggleMenu">
      <div class="user-icon">👤</div>
      <div class="user-info">
        <div class="username">{{ authStore.currentUser }}</div>
        <div class="user-type">
          {{ authStore.isGuest ? 'Guest' : 'Player' }}
        </div>
      </div>
    </div>

    <div v-if="showMenu" class="account-menu" @click.stop>
      <div class="menu-item" @click="openLeaderboard">🏆 Leaderboard</div>
      <div v-if="authStore.isGuest" class="menu-item" @click="showCreate">
        ➕ Create Account
      </div>
      <div v-if="authStore.isGuest" class="menu-item" @click="showLogin">
        🔑 Login
      </div>
      <div
        v-if="!authStore.isGuest"
        class="menu-item danger"
        @click="handleReset"
      >
        🔄 Reset Account
      </div>
      <div
        v-if="!authStore.isGuest"
        class="menu-item danger"
        @click="handleDeleteAccount"
      >
        🗑️ Delete Account
      </div>
      <div v-if="authStore.isGuest" class="menu-item" @click="handleReset">
        🔄 Reset Guest
      </div>
      <div v-if="!authStore.isGuest" class="menu-item" @click="handleLogout">
        👋 Logout
      </div>
    </div>

    <div v-if="showLeaderboard" class="popup-overlay" @click="closeLeaderboard">
      <div class="popup" @click.stop>
        <div class="popup-header">
          <h2 class="popup-title">🏆 Leaderboard</h2>
          <button @click="closeLeaderboard" class="close-btn">✕</button>
        </div>
        <Leaderboard />
      </div>
    </div>

    <div v-if="showCreateForm" class="popup-overlay" @click="closeAllForms">
      <div class="popup form-popup" @click.stop>
        <div class="popup-header">
          <h3 class="popup-title">Create Account</h3>
          <button @click="closeAllForms" class="close-btn">✕</button>
        </div>
        <form @submit.prevent="handleCreateAccount" class="account-form">
          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            maxlength="20"
            class="username-input"
          />
          <button type="submit" class="submit-btn">Create Account</button>
          <p class="form-note">
            No password required - save your progress locally
          </p>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>

    <div v-if="showLoginForm" class="popup-overlay" @click="closeAllForms">
      <div class="popup form-popup" @click.stop>
        <div class="popup-header">
          <h3 class="popup-title">Login</h3>
          <button @click="closeAllForms" class="close-btn">✕</button>
        </div>
        <div class="account-form">
          <div class="user-grid-label">Select an account to login:</div>
          <div class="user-grid">
            <button
              v-for="user in availableUsers"
              :key="user"
              class="user-grid-btn"
              @click="handleLoginUserClick(user)"
            >
              {{ user }}
            </button>
          </div>
        </div>
        <div class="account-form create-account-section">
          <div class="create-label">Or create an account:</div>
          <form @submit.prevent="handleLogin" class="account-form">
            <input
              v-model="username"
              type="text"
              placeholder="Enter username"
              class="username-input"
            />
            <button type="submit" class="submit-btn">Login</button>
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-manager {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

.account-button {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  min-width: 140px;
}

.account-button:hover {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.user-icon {
  font-size: 24px;
  margin-right: 8px;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.username {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-type {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.account-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(6px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px 0;
  margin-bottom: 8px;
  min-width: 180px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.menu-item {
  padding: 10px 16px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.danger {
  color: #ff6b6b;
}

.menu-item.danger:hover {
  background: rgba(220, 53, 69, 0.2);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.popup {
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  color: white;
}

.form-popup {
  width: 400px;
  max-width: 90vw;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  min-height: 44px;
  height: 44px;
}

.popup-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(
    121deg,
    rgba(0, 33, 83, 1) 0%,
    rgba(255, 255, 255, 1) 33%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 66%,
    rgba(207, 8, 33, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 22px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin-right: 0;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.account-form {
  padding: 0 20px 20px 20px;
}

.username-input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  box-sizing: border-box;
}

.username-input:focus {
  outline: none;
  border-color: #007bff;
}

.submit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #0056b3;
}

.form-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 10px 0 0 0;
  text-align: center;
  font-style: italic;
}

.error-message {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  padding: 8px 12px;
  border-radius: 6px;
  margin-top: 10px;
  border: 1px solid rgba(220, 53, 69, 0.3);
  font-size: 14px;
  text-align: center;
}

.user-grid-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}

.user-grid-btn {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  padding: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.user-grid-btn:hover {
  background: rgba(255, 255, 255, 0.13);
}

.create-account-section {
  margin-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 16px;
}

.create-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  text-align: center;
}

@media (max-width: 768px) {
  .account-manager {
    bottom: 10px;
    left: 10px;
  }

  .account-button {
    min-width: 120px;
    padding: 6px 10px;
  }

  .user-icon {
    font-size: 20px;
  }

  .username {
    font-size: 12px;
  }

  .user-type {
    font-size: 10px;
  }

  .form-popup {
    width: 90vw;
    margin: 0 5vw;
  }
  .user-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
}
</style>
