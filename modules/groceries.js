exports.handle = function(sender, pieces, db, callback) {
  db.run(
    "CREATE TABLE IF NOT EXISTS groceries (" +
      "item text NOT NULL," +
      "requester text NOT NULL," +
      "create_date datetime DEFAULT current_timestamp" +
      ");"
  );

  var item = pieces.join(" ");

  if (item) {
    // we want to add an item to the grocery list
    db.run("insert into groceries (item, requester) values (?, ?)", [
      item,
      sender.profile.display_name
    ]);

    callback({
      message: "Added " + item + " to the grocery list"
    });
  } else {
    // we just want to show what's been added to the list in the last week
    db.all(
      "select * from groceries where create_date > (SELECT DATETIME('now', '-7 day')) order by create_date desc limit 25",
      [],
      function(err, rows) {
        if (rows.length === 0) {
          callback({ message: "Nothing added to the grocery list this week!" });
          return;
        }

        var msg = "*This week's grocery list*\n";
        var list = [];
        rows.forEach(row => {
          list.push(" - " + row.item + " (" + row.requester + ")");
        });
        msg += list.join("\n");
        callback({ message: msg });
      }
    );
  }
};
