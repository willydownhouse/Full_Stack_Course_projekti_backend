import app from "./app";
import config from "./utils/config";

app.listen(config.PORT, () => {
  console.log(`App listening port on ${config.PORT}`);
});
