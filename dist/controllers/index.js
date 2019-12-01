"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TestController = {
  test: function test(req, res, next) {
    res.status(200).json({
      status: 'success',
      data: {
        test: 'Test setup complete'
      }
    });
  }
};
var _default = TestController;
exports["default"] = _default;