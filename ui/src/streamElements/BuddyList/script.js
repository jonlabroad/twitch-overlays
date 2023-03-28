let title = undefined;
let channelName = undefined;

const statusCheckIntervalMillis = 1000;
const loginDurationMillis = 30 * 1e3;
//const awayDurationMillis = 10 * 60 * 1e3;
//const logoutDurationMillis = awayDurationMillis + 5 * 60 * 1e3;
//const removeDurationMillis = logoutDurationMillis + 30 * 1e3;
const awayDurationMillis = 1 * 60 * 1e3;
const logoutDurationMillis = awayDurationMillis + 1 * 60 * 1e3;
const removeDurationMillis = logoutDurationMillis + 30 * 1e3;

const allStatuses = ["present", "login", "away", "logout"];

const users = {};

const defaultGroups = [
  { name: "Mods", isInGroup: (user) => user.isMod },
  { name: "VIPs", isInGroup: (user) => user.isVip },
  { name: "Friends", isInGroup: (user) => true },
];

const expandedIcon = "https://overlays.hoagieman.net/images/expanded-icon.png";

// Porbably shouldn't use this one, change it to a more generic custom one
const defaultImage = "https://overlays.hoagieman.net/images/AIM_97_blue.webp";

const defaultIcons = {
  login: "https://overlays.hoagieman.net/images/login-icon.png",
  away: "https://overlays.hoagieman.net/images/away-icon.ico",
  logout: "https://overlays.hoagieman.net/images/logout-icon.png",
};

setInterval(() => updateUsers(), statusCheckIntervalMillis);
setInterval(() => render(), 1000);

let doRender = true;

window.onload = (event) => {
  const logoImgSrc = $(".logo-image img").attr("src");
  if (logoImgSrc === "{{image}}") {
    console.log("Using default logo...");
    $(".logo-image img").attr("src", defaultImage);
  }

  defaultGroups.forEach((group) => {
    console.log({ group });
    $(".categories-container").append(`
      <div id="group-${group.name}"></div>
    `);
  });

  const groupElements = renderGroups();
  groupElements.forEach((groupElement) => {
    console.log({ groupElement });
    $(`#${groupElement.id}`).replaceWith(groupElement.element);
  });
};

window.addEventListener("onWidgetLoad", function (obj) {
  console.log({ onWidgetLoad: obj });
  const detail = obj.detail;
  const fieldData = detail.fieldData;

  channelName = detail.channel.username;

  title = fieldData.title || `${channelName}'s Buddy list`;
  // TODO move this
  $(".title-bar-text").text(title);
});

window.addEventListener("onEventReceived", function (obj) {
  handleEvent("onEventReceived", obj.detail);
});

function handleEvent(eventType, eventDetail) {
  if (eventType === "onEventReceived") {
    const detail = eventDetail;
    if (detail?.listener === "message") {
      const ev = detail.event.data;
      const chatMessage = {
        userId: ev.userId,
        username: ev.displayName,
        displayName: ev.displayName,
        isMod: ev.badges.some((badge) => badge.type === "moderator"),
        isVip: ev.badges.some((badge) => badge.type === "vip"),
        isBroadcaster: ev.badges.some((badge) => badge.type === "broadcaster"),
        message: ev.text,
        timestamp: new Date(ev.time).getTime(),
        status: "login",
      };

      const existingUser = users[ev.userId];
      const isNew = !existingUser;
      if (isNew) {
        users[ev.userId] = {
          ...chatMessage,
          firstMessageTimeMillis: chatMessage.timestamp,
        };
      } else {
        users[ev.userId] = {
          ...chatMessage,
          firstMessageTimeMillis: existingUser.firstMessageTimeMillis,
        };
      }

      renderUser(users[ev.userId]);
    }
  }
}

function updateUsers() {
  // Update the user data
  console.log("update users");
  updateUserStatuses();
}

function render() {
  if (doRender) {
    console.log("render");
  }
}

function renderGroups() {
  const userGroups = {};
  defaultGroups.forEach((group) => (userGroups[group.name] = []));
  Object.values(users).forEach((user) => {
    const g = defaultGroups.find((group) => group.isInGroup(user));
    userGroups[g.name].push(user);
  });

  const elements = Object.entries(userGroups).map(([groupName, users]) => ({
    element: `
      <div id="group-${groupName}" class="user-group">
        <div class="user-group-header">
          <div class="user-group-icon">
            <img src=${expandedIcon} />
          </div>
          <div class="user-group-name">${groupName} (${users.length})</div>
        </div>
      </div>
  `,
    id: `group-${groupName}`,
  }));

  return elements;
}

function renderUser(user) {
  const existingUserElement = $(`#${getUserId(user)}`);
  if (!existingUserElement.length) {
    const group = getUserGroup(user);
    if (group) {
      const groupElement = $(`#group-${group.name}`);
      if (groupElement) {
        groupElement.append(`
        <div id="${getUserId(user)}" class="user-row">
          <div class="user-status-icon">
            <img src="" />
          </div>
          <div class="user-name user-name-${user.status}">${
          user.displayName
        }</div>
        </div>
      `);
      }
      setUserStatus(user);
    }
  }
}

function setUserStatus(user) {
  const statusClass = `status-${user.status}`;

  const hasStatusClass = !!$(`#${getUserId(user)} .${statusClass}`).length;
  if (!hasStatusClass) {
    allStatuses.forEach((status) =>
      $(`#${getUserId(user)}`).removeClass(`status-${status}`)
    );
    $(`#${getUserId(user)}`).addClass(statusClass);
    $(`#${getUserId(user)}`)
      .find("img")
      .attr("src", defaultIcons[user.status] ?? "");
  }
}

function removeUser(user) {
  $(`#${getUserId(user)}`).remove()
}

function getUserId(user) {
  return `user-${user.userId}`;
}

function getUserGroup(user) {
  const group = defaultGroups.find((group) => group.isInGroup(user));
  return group;
}

function updateUserStatuses() {
  const now = Date.now();

  const removeUserIds = [];
  Object.values(users).forEach((user) => {
    const firstMessageTimeMillis = user.firstMessageTimeMillis;
    const lastMessageMillis = user.timestamp;
    const timeSinceFirstMessage = now - firstMessageTimeMillis;
    const timeSinceLastMessage = now - lastMessageMillis;

    let newStatus = "present";
    if (timeSinceFirstMessage < loginDurationMillis) {
      newStatus = "login";
    }

    if (timeSinceLastMessage > awayDurationMillis) {
      newStatus = "away";
    }

    if (timeSinceLastMessage > logoutDurationMillis) {
      newStatus = "logout";
    }

    let changed = user.status === newStatus;
    if (timeSinceLastMessage > removeDurationMillis) {
      changed = true;
      removeUserIds.push(user.userId);
    }

    const statusChanged = user.status !== newStatus;
    user.status = newStatus;

    if (statusChanged) {
      setUserStatus(user);
    }
  });

  removeUserIds.forEach((userId) => {
    removeUser(users[userId])
    delete users[userId]
  });
}
