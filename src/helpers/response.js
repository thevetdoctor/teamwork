exports.values = (res, status, message) => {
  if (status < 400) {
    return res.status(status).json({ status: 'success', data: message });
  }
  return res.status(status).json({ status: 'error', error: message });
};
