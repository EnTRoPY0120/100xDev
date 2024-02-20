// Common Use case in express in the BE

// enum ResponseStatus {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
// }
//
// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })

// Used for the usage of named constants

// enum direction {
//   Up,
//   Down,
//   Left,
//   Right,
// }
// function doSomething(keyPressed: direction) {
//   if (keyPressed == direction.Down) {
//   }
//   return direction.Down;
// }
// console.log(doSomething(direction.Down));
