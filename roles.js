const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("view").readAny("records");

  ac.grant("search").readAny("records");

  ac.grant("list").readAny("records");

  ac.grant("add").createAny("records");

  ac.grant("update").updateAny("records");

  ac.grant("delete").deleteAny("records");

  ac.grant("read-only")
    .extend("view")
    .extend("search")
    .extend("list");

  ac.grant("write")
    .extend("read-only")
    .extend("add")
    .extend("update")
    .extend("delete");

  ac.grant("admin")
    .extend("read-only")
    .extend("write")
    .createAny("users")
    .readAny("users")
    .updateAny("users")
    .deleteAny("users");

  return ac;
})();
