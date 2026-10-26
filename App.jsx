
#root {
  min-height: 100vh;
}

.app-shell {
  --bg: #080a12;
  --sidebar: #0b0d17;
  --panel: #101321;
  --border: rgba(158, 169, 211, 0.12);
  --text: #f2f3ff;
  --muted: #9298b2;
  --cyan: #72e7ff;
  --purple: #a78bfa;

  min-height: 100vh;
  display: flex;
  color: var(--text);
  background:
    radial-gradient(ellipse at 75% 0%, rgba(64, 52, 139, 0.11), transparent 38%),
    var(--bg);
  font-size: 14px;
}

button,
textarea {
  font: inherit;
}

button {
  color: inherit;
}

button:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}

.sidebar {
  width: 268px;
  flex: 0 0 268px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 25px 16px 12px;
  background: linear-gradient(180deg, #0d0f1a, #090b13);
  border-right: 1px solid var(--border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 4px;
  margin-bottom: 31px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  position: relative;
  font-size: 22px;
  font-weight: 900;
  border-radius: 13px;
  color: white;
  background: linear-gradient(135deg, #7068ff, #28d8ee);
  box-shadow: 0 0 23px #6d6bff35;
}

.brand-logo span {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  color: #d9ffff;
}

.brand-name {
  display: flex;
  flex-direction: column;
  gap: 4px;
  letter-spacing: 1.3px;
}

.brand-name strong {
  font-size: 13px;
}

.brand-name strong span {
  color: var(--cyan);
}

.brand-name small {
  color: #767e9c;
  font-size: 8px;
  letter-spacing: 1.15px;
}

.icon-button {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  color: #a0a6c1;
  background: transparent;
  cursor: pointer;
  font-size: 19px;
}

.icon-button:hover {
  color: white;
  background: #ffffff0b;
  border-color: var(--border);
}

.sidebar-close {
  display: none;
  margin-left: auto;
}

.new-chat-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin-bottom: 32px;
  border: 1px solid #6e78eb42;
  border-radius: 11px;
  background: linear-gradient(110deg, #6f65ff19, #52dffb09);
  cursor: pointer;
  text-align: left;
  transition: 0.2s ease;
}

.new-chat-button:hover {
  border-color: #8d83ff;
  box-shadow: 0 0 20px #7967ff15;
}

.new-chat-button > span {
  font-size: 20px;
  color: var(--cyan);
}

.new-chat-button kbd {
  margin-left: auto;
  color: #858ba6;
  font-size: 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 3px 5px;
}

.sidebar-label {
  padding: 0 9px;
  margin-bottom: 13px;
  color: #747c98;
  font-size: 10px;
  letter-spacing: 1.7px;
}

.chat-history {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.empty-history {
  padding: 0 9px;
  color: #747b93;
  font-size: 12px;
  line-height: 1.7;
}

.history-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 9px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #adb3ca;
  text-align: left;
  cursor: pointer;
}

.history-item > span:last-child {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.history-item:hover,
.history-item.selected {
  background: #ffffff08;
  border-color: var(--border);
  color: white;
}

.history-icon {
  color: #8f86ff;
}

.sidebar-bottom {
  margin-top: auto;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #ffffff04;
}

.status-dot,
.online-indicator span {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #65e5b1;
  box-shadow: 0 0 9px #65e5b17c;
}

.status-card div,
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-card strong,
.profile-info strong {
  font-size: 12px;
  font-weight: 500;
}

.status-card small,
.profile-info small {
  font-size: 10px;
  color: #838aa6;
}

.clear-button {
  width: 100%;
  padding: 10px 9px;
  margin-bottom: 13px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: #9298b0;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
}

.clear-button:hover {
  color: #ff9eae;
  background: #ff80900b;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 3px 6px;
  border-top: 1px solid var(--border);
}

.avatar {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid #8b82ff66;
  border-radius: 11px;
  background: linear-gradient(135deg, #7765ff44, #3bd9e322);
  color: #d8d3ff;
  font-weight: 700;
}

.profile-dots {
  margin-left: auto;
  color: #838aa6;
  letter-spacing: 2px;
}

.main-panel {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.topbar {
  height: 69px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid var(--border);
  background: #0b0d160b;
}

.topbar-left,
.topbar-right,
.model-selector,
.online-indicator {
  display: flex;
  align-items: center;
}

.topbar-left {
  gap: 12px;
}

.model-selector {
  gap: 10px;
  font-size: 13px;
}

.model-spark {
  color: var(--cyan);
  font-size: 19px;
  text-shadow: 0 0 14px #72e7ff80;
}

.model-tag {
  padding: 3px 6px;
  border: 1px solid #9c8bff42;
  border-radius: 5px;
  color: #b6a9ff;
  background: #9c8bff0d;
  font-size: 9px;
  letter-spacing: 1px;
}

.chevron {
  color: #7e86a4;
}

.topbar-right {
  gap: 14px;
}

.online-indicator {
  gap: 8px;
  color: #a5abc0;
  font-size: 11px;
}

.online-indicator span {
  width: 6px;
  height: 6px;
}

.chat-area {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.welcome-screen {
  width: min(780px, 100%);
  margin: auto;
  padding: 48px 28px 34px;
  text-align: center;
}

.hero-orb {
  width: 116px;
  height: 116px;
  display: grid;
  place-items: center;
  position: relative;
  margin: 0 auto 27px;
}

.orb-ring,
.orb-core {
  position: absolute;
  border-radius: 50%;
}

.orb-ring {
  inset: 4px;
  border: 1px solid #8d83ff35;
  animation: orbit 16s linear infinite;
}

.ring-one {
  transform: rotateX(60deg) rotateZ(35deg);
  border-color: #74e6ff70;
}

.ring-two {
  inset: 12px -5px;
  transform: rotateX(60deg) rotateZ(-45deg);
  border-color: #a78bfa55;
  animation-direction: reverse;
}

.orb-core {
  width: 66px;
  height: 66px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 31px;
  background: radial-gradient(circle at 35% 25%, #a7f3ff, #8a73ff 48%, #4331a8);
  box-shadow: 0 0 22px #8b78ff70, 0 0 65px #5b54ff35;
}

@keyframes orbit {
  to { transform: rotateX(60deg) rotateZ(395deg); }
}

.welcome-eyebrow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  margin-bottom: 17px;
  color: #a7a0ff;
  font-size: 9px;
  letter-spacing: 2.6px;
}

.welcome-eyebrow span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 9px var(--cyan);
}

.welcome-screen h1 {
  margin: 0;
  font-size: clamp(33px, 4.5vw, 53px);
  line-height: 1.16;
  font-weight: 650;
  letter-spacing: -2.3px;
}

.welcome-screen h1 span {
  color: transparent;
  background: linear-gradient(100deg, #82edff 8%, #9f9aff 52%, #d1a5ff 92%);
  background-clip: text;
  -webkit-background-clip: text;
}

.welcome-description {
  max-width: 450px;
  margin: 18px auto 34px;
  color: #989fb9;
  font-size: 13px;
  line-height: 1.9;
}

.prompt-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  text-align: left;
}

.prompt-card {
  position: relative;
  min-height: 117px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 17px 16px;
  border: 1px solid #9ea8e21b;
  border-radius: 13px;
  background: linear-gradient(135deg, #ffffff06, #ffffff02);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
}

.prompt-card:hover {
  transform: translateY(-2px);
  border-color: #8c86ff85;
  background: linear-gradient(135deg, #8b7aff12, #5bdfff08);
}

.prompt-icon {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  margin-bottom: 11px;
  border: 1px solid #8b80ff35;
  border-radius: 8px;
  background: #8b80ff0e;
  color: #b2a6ff;
  font-size: 15px;
}

.prompt-title {
  margin-bottom: 5px;
  color: #e6e8f8;
  font-size: 12px;
  font-weight: 600;
}

.prompt-description {
  max-width: 90%;
  color: #8f96b1;
  font-size: 10px;
  line-height: 1.6;
}

.prompt-arrow {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #7c82a1;
  font-size: 14px;
}

.hero-footnote {
  margin-top: 26px;
  color: #777e99;
  font-size: 10px;
  letter-spacing: 0.4px;
}

.hero-footnote span {
  color: #9e92ff;
  margin-right: 5px;
}

.composer-section {
  width: min(780px, 100%);
  padding: 12px 28px 22px;
  margin: 0 auto;
}

.composer {
  padding: 13px 14px 10px 17px;
  border: 1px solid #9297ca35;
  border-radius: 16px;
  background: linear-gradient(145deg, #131625, #0e101b);
  box-shadow: 0 0 35px #6b5aff08, 0 12px 35px #00000020;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.composer:focus-within {
  border-color: #8e85ff83;
  box-shadow: 0 0 24px #7568ff12;
}

.composer textarea {
  width: 100%;
  min-height: 39px;
  max-height: 160px;
  display: block;
  resize: vertical;
  padding: 4px 2px 12px;
  border: 0;
  outline: none;
  background: transparent;
  color: #f3f3ff;
  font-size: 13px;
  line-height: 1.6;
}

.composer textarea::placeholder {
  color: #737b98;
}

.composer textarea:focus-visible {
  outline: none;
}

.composer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.composer-hints {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  color: #7f87a4;
  font-size: 9px;
}

.hint-spark {
  color: var(--cyan);
  font-size: 14px;
}

.hint-separator {
  color: #525a78;
}

.send-button {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #8c7bff, #4bceee);
  color: #0a0c17;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 15px #8b7bff24;
  transition: 0.2s;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 0 24px #8b7bff60;
}

.send-button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
  box-shadow: none;
}

.disclaimer {
  margin: 12px 0 0;
  text-align: center;
  color: #6f7690;
  font-size: 9px;
  line-height: 1.6;
}

.messages-container {
  width: min(760px, 100%);
  margin: 0 auto;
  padding: 30px 26px 22px;
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-bottom: 27px;
}

.message-avatar {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 1px solid #8c84ff38;
  border-radius: 11px;
  background: #9c8bff12;
  color: #b7adff;
  font-weight: 600;
}

.message-avatar.user {
  background: linear-gradient(135deg, #272e4c, #20283d);
  border-color: #72e7ff24;
  color: #9cecff;
}

.message-content {
  min-width: 0;
  flex: 1;
}

.message-author {
  margin: 2px 0 9px;
  color: #cdd1e7;
  font-size: 12px;
  font-weight: 600;
}

.message-text {
  color: #c2c7dd;
  font-size: 13px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.message-text pre {
  max-width: 100%;
  overflow-x: auto;
  margin: 12px 0;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #080a11;
  color: #9cecff;
  font-size: 12px;
  line-height: 1.7;
}

.message-actions {
  margin-top: 11px;
}

.message-actions button {
  padding: 5px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: #8e96b2;
  font-size: 10px;
  cursor: pointer;
}

.message-actions button:hover {
  color: var(--cyan);
  border-color: #72e7ff55;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 0;
}

.typing-indicator > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9e91ff;
  animation: typing 0.9s infinite alternate;
}

.typing-indicator > span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator > span:nth-child(3) {
  animation-delay: 0.4s;
}

.typing-indicator small {
  margin-left: 7px;
  color: #939ab4;
  font-size: 11px;
}

@keyframes typing {
  to { opacity: 0.3; transform: translateY(-3px); }
}

.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  max-width: calc(100vw - 44px);
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 13px 16px;
  border: 1px solid #8c84ff50;
  border-radius: 11px;
  background: #17192a;
  color: #e4e5f8;
  box-shadow: 0 8px 35px #0005;
  z-index: 10;
  font-size: 12px;
}

.toast button {
  border: 0;
  background: transparent;
  color: #a6adca;
  cursor: pointer;
  font-size: 18px;
}

@media (min-width: 1200px) {
  .welcome-screen {
    padding-top: 58px;
  }
}

@media (max-width: 850px) {
  .sidebar {
    width: 240px;
    flex-basis: 240px;
  }

  .topbar {
    padding: 0 20px;
  }

  .welcome-screen {
    padding-top: 35px;
  }
}

@media (max-width: 640px) {
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 20;
    width: min(290px, 86vw);
    min-height: 100dvh;
    box-shadow: 15px 0 50px #0008;
  }

  .sidebar-close {
    display: grid;
  }

  .topbar {
    height: 60px;
    padding: 0 13px;
  }

  .topbar-right {
    gap: 4px;
  }

  .online-indicator {
    font-size: 0;
    gap: 0;
  }

  .online-indicator span {
    width: 7px;
    height: 7px;
  }

  .model-selector {
    gap: 7px;
    font-size: 12px;
  }

  .welcome-screen {
    padding: 35px 17px 24px;
  }

  .hero-orb {
    width: 94px;
    height: 94px;
    margin-bottom: 22px;
  }

  .orb-core {
    width: 55px;
    height: 55px;
  }

  .welcome-screen h1 {
    font-size: clamp(32px, 8vw, 44px);
    letter-spacing: -1.5px;
  }

  .welcome-description {
    font-size: 12px;
    margin: 15px auto 26px;
  }

  .prompt-grid {
    gap: 9px;
  }

  .prompt-card {
    min-height: 125px;
    padding: 13px 11px;
  }

  .prompt-description {
    font-size: 9px;
  }

  .composer-section {
    padding: 8px 12px 14px;
  }

  .composer {
    padding: 11px 10px 9px 13px;
  }

  .composer-hints {
    max-width: calc(100% - 43px);
    gap: 5px;
    font-size: 8px;
  }

  .messages-container {
    padding: 23px 15px;
  }

  .message-row {
    gap: 9px;
  }

  .message-avatar {
    width: 30px;
    height: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
