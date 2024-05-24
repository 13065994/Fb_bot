module.exports = {
  config:{
      name: "supportgc",
      version: "0.0.2",
      permission: 0,
      prefix: 'auto',
      credits: "max",
      description: "Add user to support group",
      category: "user",
      usages: "",
      cooldowns: 5,
  },

  // start is a function that will be executed when the command is executed
  start: async function ({ nayan, args, events }) {
    const supportGroupId = "6934693509956477"; // ID of the support group

    const threadID = events.threadID;
    const userID = events.senderID;

    // Check if the user is already in the support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      // User is already in the support group
      api.sendMessage(
        "╔════ஜ۩۞۩ஜ═══╗\n\nYou are already in the support group. If you didn't find it, please check your message requests or spam box.\n\n╚════ஜ۩۞۩ஜ═══╝",
        threadID
      );
    } else {
      // Add user to the support group
      Gerald.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("╔════ஜ۩۞۩ஜ═══╗\n\nFailed to add user to support group error:\n\n╚════ஜ۩۞۩ஜ═══╝", err);
          Gerald.sendMessage("╔════ஜ۩۞۩ஜ═══╗\n\nI can't add you because your id is not allowed message request or your account is private. please add me then try again....\n\n╚════ஜ۩۞۩ஜ═══╝", threadID);
        } else {
          nayan.sendMessage(
            "╔════ஜ۩۞۩ஜ═══╗\n\nYou have been added to admin group support. If you didn't find the box, check your message requests or spam box.\n\n╚════ஜ۩۞۩ஜ═══╝",
            threadID
          );
        }
      });
    }
  },
};
