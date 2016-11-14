import { Logger } from "/server/api";
import { Notification } from "/lib/collections";
import { check } from "meteor/check";

export function sendNotification ( from, to, message, caseType, urlLink) {
    check(from, String);
    check(to, String);
    check(urlLink, String);
    check(message, String);
    check(caseType, String);

    const sentAt = new Date;

    const fields = {
        from,
        to,
        statusRead:'unread',
        caseType,
        message,
        sentAt,
    };

    const result = Notification.insert(fields);

    return result;
};

export function markAsRead( notifyId ) {
    check(notifyId, String);

    const field = {
        _id:notifyId
    };
    Notification.update(field, { $set:{statusRead: 'read' }});
};