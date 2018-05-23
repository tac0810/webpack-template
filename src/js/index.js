import 'js/_header';

import App from "./app/App";
import FxRouter from "./app/routes/FxRouter";
import VcRouter from "./app/routes/VcRouter";

window.APP = new App( FxRouter, VcRouter, true );
APP.debug = process.env.NODE_ENV === 'development';
APP.boot();