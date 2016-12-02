import { Logger } from "/server/api";
import { Audio } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export function uploadAudio(files, productId) {

}

export function getFile(fileId) {
  check(fileId, String);

  return Audio.findOne({_id: fileId});
}
