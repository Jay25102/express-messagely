const Router = require("express").Router;
const router = new Router();
const {ensureLoggedIn, ensureCorrectuser} = require("../middleware/auth");

const User = require("../models/user");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", ensureLoggedIn, async function(req, res, next) {
    try {
        let users = await User.all();
        return res.json({users});
    }
    catch(err) {
        return next(err);
    }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureCorrectuser, async function(req, res, next) {
    try {
        let details = await User.get(req.params.username);
        return res.json({details});
    }
    catch(err) {
        return next(err);
    }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectuser, async function(req, res, next) {
    try {
        let messagesTo = await User.messagesTo(req.params.username);
        return res.json({messagesTo});
    }
    catch(err) {
        return next(err);
    }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectuser, async function(req, res, next) {
    try {
        let messagesFrom = await User.messagesFrom(req.params.username);
        return res.json({messagesFrom});
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;