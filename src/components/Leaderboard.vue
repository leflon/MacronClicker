<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import { useGameStore } from '@/stores/gameStore';
import { formatNumber } from '@/lib/utils';

const authStore = useAuthStore();
const gameStore = useGameStore();

const leaderboardData = computed(() => {
  const users = authStore.getAllUsers();

  // If the current user is not Guest, update their score with the reactive gameStore value
  return users
    .filter((user) => user.username !== 'Guest')
    .map((user) => {
      if (authStore.currentUser === user.username) {
        // Use the reactive score from gameStore
        return {
          ...user,
          currentScore: gameStore.currentScore,
        };
      }
      return user;
    })
    .sort((a, b) => b.currentScore - a.currentScore)
    .slice(0, 10); // Top 10 players
});

const currentUserRank = computed(() => {
  if (!authStore.currentUser || authStore.isGuest) return null;

  const users = authStore
    .getAllUsers()
    .filter((user) => user.username !== 'Guest')
    .map((user) => {
      if (authStore.currentUser === user.username) {
        return {
          ...user,
          currentScore: gameStore.currentScore,
        };
      }
      return user;
    });

  const sortedUsers = users.sort((a, b) => b.currentScore - a.currentScore);

  const rank =
    sortedUsers.findIndex((user) => user.username === authStore.currentUser) +
    1;
  return rank > 0 ? rank : null;
});

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString();
}

function isCurrentUser(username: string): boolean {
  return authStore.currentUser === username;
}
</script>

<template>
  <div class="leaderboard">
    <div
      v-if="authStore.isLoggedIn && currentUserRank"
      class="current-user-rank"
    >
      Your rank: #{{ currentUserRank }}
    </div>

    <div v-if="authStore.isGuest" class="guest-notice">
      Create an account to compete on the leaderboard!
    </div>

    <div v-if="leaderboardData.length === 0" class="no-data">
      No players yet. Be the first to create an account!
    </div>

    <div v-else class="leaderboard-list">
      <div
        v-for="(user, index) in leaderboardData"
        :key="user.username"
        :class="[
          'leaderboard-item',
          { 'current-user': isCurrentUser(user.username) },
        ]"
      >
        <div class="rank">
          <span v-if="index === 0" class="medal gold">🥇</span>
          <span v-else-if="index === 1" class="medal silver">🥈</span>
          <span v-else-if="index === 2" class="medal bronze">🥉</span>
          <span v-else class="rank-number">#{{ index + 1 }}</span>
        </div>

        <div class="player-info">
          <div class="username">{{ user.username }}</div>
          <div class="join-date">Joined {{ formatDate(user.createdAt) }}</div>
        </div>

        <div class="scores">
          <div class="cumulative-score">
            {{ formatNumber(user.currentScore) }}
          </div>
          <div class="score-label">Current Score</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leaderboard {
  color: white;
  padding: 0 20px 20px 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.current-user-rank {
  text-align: center;
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.3);
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #4caf50;
}

.guest-notice {
  text-align: center;
  background: rgba(33, 150, 243, 0.2);
  border: 1px solid rgba(33, 150, 243, 0.3);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
  color: #2196f3;
}

.no-data {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  padding: 40px 20px;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.leaderboard-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.leaderboard-item.current-user {
  background: rgba(76, 175, 80, 0.15);
  border-color: rgba(76, 175, 80, 0.3);
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
}

.rank {
  width: 50px;
  text-align: center;
  font-weight: bold;
}

.medal {
  font-size: 24px;
}

.rank-number {
  font-size: 18px;
  color: #ccc;
}

.player-info {
  flex: 1;
  margin-left: 15px;
}

.username {
  font-weight: 600;
  font-size: 16px;
  color: white;
}

.current-user .username {
  color: #4caf50;
}

.join-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.scores {
  text-align: right;
  min-width: 120px;
}

.cumulative-score {
  font-weight: 700;
  font-size: 16px;
  color: #e63322;
}

.score-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive design */
@media (max-width: 768px) {
  .leaderboard-item {
    padding: 8px;
  }

  .player-info {
    margin-left: 10px;
  }

  .username {
    font-size: 14px;
  }

  .cumulative-score {
    font-size: 14px;
  }

  .scores {
    min-width: 100px;
  }
}
</style>
