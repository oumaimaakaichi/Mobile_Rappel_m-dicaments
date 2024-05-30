import { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const sendNotification = async (title, body, data) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission for notifications not granted");
    return;
  }

  const notificationId = await Notifications.presentLocalNotificationAsync({
    title: title,
    body: body,
    data: data,
  });

  console.log("Notification ID:", notificationId);
};

const YourComponent = () => {
  useEffect(() => {
    // Exemple d'utilisation de la fonction sendNotification
    sendNotification("Rappel", "Votre rendez-vous est dans deux heures", {
      rendezVousId: "123",
    });
  }, []);

  return (
    <>
      <div>
        <p>hello</p>
      </div>
    </>
  );
};

export default YourComponent;
