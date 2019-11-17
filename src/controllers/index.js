const TestController = {
    test: (req, res, next) => {


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
}

export default  TestController;