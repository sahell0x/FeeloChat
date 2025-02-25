import getContacts from "./getContacts";

const onlineStatusProvider = async (
  userId: string,
  io: any,
  userMap: Map<string, string>,
  isOnline: boolean
) => {
  try {
    const contacts: string[] = (await getContacts(userId)) as string[];

    const currentUserSocketId = userMap.get(userId);

    if (isOnline) {
      const onlineStatusList = contacts.reduce((acc: any, contactId) => {
        acc[contactId] = userMap.has(contactId);
        return acc;
      }, {});

      io.to(currentUserSocketId).emit("status-update", onlineStatusList);
    }

    for (let i = 0; i < contacts.length; i++) {
      const userSocketId = userMap.get(contacts[i]);

      if (userSocketId) {
        const currentUserStatus: any = {};

        currentUserStatus[userId] = isOnline;

        io.to(userSocketId).emit("status-update", currentUserStatus);
      }
    }
  } catch {}
};

export default onlineStatusProvider;
