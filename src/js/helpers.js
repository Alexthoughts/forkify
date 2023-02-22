import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

//function that we are reuse in our project

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    //set timeout after which we reject promise
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}, status: ${res.status}`);
    return data;
  } catch (err) {
    throw err; //reject promise -> go to catch at the place, where we call the function
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPromise = fetch(url);
    //set timeout after which we reject promise
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}, status: ${res.status}`);
    return data;
  } catch (err) {
    throw err; //reject promise -> go to catch at the place, where we call the function
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    //set timeout after which we reject promise
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}, status: ${res.status}`);
    return data;
  } catch (err) {
    throw err; //reject promise -> go to catch at the place, where we call the function
  }
};
*/
