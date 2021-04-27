import App from "./App";


const port: number = 8000;
App.listen(port, () => {
  console.log("Server is up and running on port ", port);
});