exports.handle = function(sender, pieces, db, callback, moduleName) {
  const choices = pieces.join(" ").split(",");
  const index = Math.floor(Math.random() * choices.length);

  callback({ message: choices[index] });
  return;
};
