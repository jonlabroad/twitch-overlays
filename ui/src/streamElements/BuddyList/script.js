let title = undefined;
let channelName = undefined;

const statusCheckIntervalMillis = 1000;
const loginDurationMillis = 30 * 1e3;
const awayDurationMillis = 10 * 60 * 1e3;
const logoutDurationMillis = awayDurationMillis + 5 * 60 * 1e3;
const removeDurationMillis = logoutDurationMillis + 30 * 1e3;

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
    console.log({group});
    $(".categories-container").append(`
      <div id="group-${group.name}"></div>
    `)
  })
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
    const groupElements = renderGroups();
    groupElements.forEach(groupElement => {
      console.log({groupElement})
      $(`#${groupElement.id}`).replaceWith(groupElement.element);
    })
  }
  //doRender = false;
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
        ${users
          .map(
            (user) => `
          <div class="user-row">
            <div class="user-status-icon user-status-icon-${user.status}">
              <img src="${defaultIcons[user.status] ?? ""}" />
            </div>
            <div class="user-name user-name-${user.status}">${
              user.displayName
            }</div>
          </div>
        `
          )
          .join("")}
      </div>
  `,
    id: `group-${groupName}`,
  }));

  return elements;
}

function updateUserStatuses() {
  const now = Date.now();

  const removeUserIds = [];
  Object.values(users).forEach((user) => {
    const firstMessageTimeMillis = user.firstMessageTimeMillis;
    const lastMessageMillis = user.timestamp;
    const timeSinceFirstMessage = now - firstMessageTimeMillis;
    const timeSinceLastMessage = now - lastMessageMillis;

    user.status = "present";
    if (timeSinceFirstMessage < loginDurationMillis) {
      user.status = "login";
    }

    if (timeSinceLastMessage > awayDurationMillis) {
      user.status = "away";
    }

    if (timeSinceLastMessage > logoutDurationMillis) {
      user.status = "logout";
    }

    if (timeSinceLastMessage > removeDurationMillis) {
      removeUserIds.push(user.userId);
    }
  });

  removeUserIds.forEach((userId) => delete users[userId]);
}
