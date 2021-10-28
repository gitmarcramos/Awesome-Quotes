const hbs = require("hbs");

// CUSTOM HELPERS
hbs.registerHelper("isInArray", function (needle, haystack, options) {
  console.log('AAA');
  if (haystack !== undefined) {
    const isInArray = haystack.some((id) => {
      console.log(id, needle);
      return needle.equals(id);
    })
    if (isInArray)
      return options.fn(this);
}
    return options.inverse(this);
});
