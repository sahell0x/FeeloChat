//this funtion mainly handles the online status of contacts.

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

    console.log("inside online status provider", currentUserSocketId);

    //if the function is called from the connection the user also need the status of its contacts this block handles that

    if (isOnline) {
      const onlineStatusList = contacts.reduce((acc: any, contactId) => {
        acc[contactId] = userMap.has(contactId);
        return acc;
      }, {});

      console.log("sending data to this socket id: ",currentUserSocketId);

      io.to(currentUserSocketId).emit("status-update",onlineStatusList);
    }

    //this block handles update the online status to contacts if they are online

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
