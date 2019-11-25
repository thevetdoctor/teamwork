"use strict";

exports.values = function (res, status, message) {
  if (status < 400) {
    return res.status(status).json({
      status: 'success',
      data: message
    });
  } else {
    return res.status(status).json({
      status: 'error',
      error: message
    });
  }
};