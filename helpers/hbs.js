const hbs = require("hbs");

// CUSTOM HELPERS
hbs.registerHelper("isInArray", function (needle, haystack, options) {
  if (haystack !== undefined) {
    const isInArray = haystack.some((id) => {
      return needle.equals(id);
    })
    if (isInArray)
      return options.fn(this);
}
    return options.inverse(this);
});
