import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log(
    `http://localhost:%d in %s mode`,
    app.get('port'),
    app.get('env')
  );
});
