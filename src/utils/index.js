// function to validate if text input is time
export const validateHhMm = (inputField) => {
  var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
    inputField
  );
  return isValid;
};
// function to validate if start time and end time is inside intervale of video:
export const validateDurationOfVideo = (duration, start, end) => {
  return start < end && end - start <= duration;
};
// function to return time as string
export const convertSecondsToString = (seconds) => {
  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
};
// function to return secons of time ;
export const getSecondsFromTime = (stringOfTime) => {
  return stringOfTime?.split(":").reduce((acc, time) => 60 * acc + +time);
};
// function to load video
export const loadVideo = (file) =>
  new Promise((resolve, reject) => {
    try {
      let video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        resolve(this);
      };
      video.onerror = function () {
        reject("Invalid video. Please select a video file.");
      };
      video.src = window.URL.createObjectURL(file);
    } catch (e) {
      reject(e);
    }
  });
