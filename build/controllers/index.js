"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var TestController = {
  test: function test(req, res, next) {
    // if(err) {
    //     return res.status(400).json({
    //         status: 'error',
    //         error: 'test setup has some error'
    //     });
    // }
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