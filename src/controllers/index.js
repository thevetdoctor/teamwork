const TestController = {
    test: (req, res, next) => {

        res.status(200).json({
            status: 'success',
            data: {
                test: 'Test setup complete'
            }
        });
    }
}

export default  TestController;