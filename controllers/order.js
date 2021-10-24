const User = require("../models/user");
const Order = require("../models/order");

exports.postOrder = async (req, res, next) => {
  console.log(req.user.username);
  const { message, order } = req.body;
  let GreetingText = [
    "hi",
    "hellow",
    "xup",
    "how far",
    "how are you doing",
    "what's up",
  ];
  let OrderingFood = [
    "amala",
    "rice & beans",
    "rice",
    "beans & plantain",
    "pounded yam",
    "fufu",
    "eba",
    "fried rice",
    "jollof rice",
  ];

  let isGreeting = GreetingText.find(
    (greeting) => greeting === message.toLowerCase()
  );
  let isOrderingFood = OrderingFood.find(
    (food) => food === message.toLowerCase()
  );
  let userOrder = {};

  if (!message) {
    return res.json({ errorResponse: "please fill the field correctly" });
  } else {
    if (isGreeting) {
      return res.json({
        resMessage: "Hi,what did you want to buy",
        isGreeting: true,
      });
    } else if (isOrderingFood) {
      return res.json({
        resMessage: "how many plate did you want",
        isOrderingFood: true,
      });
    } else if (typeof Number(message) === "number") {
      userOrder.name = order[1];
      userOrder.quantity = message;
      userOrder.price = userOrder.quantity * 300;
      userOrder.userId = req.user.id;
      let saveOrder = new Order(userOrder);
      saveOrder.save();
      return res.json({
        resMessage: `${req.user.username} your order has been received,it will be ready in 10 minute time`,
        isSaved: true,
      });
    }
  }
};

exports.getAllMyOrder = (req, res, next) => {
  const userId = req.user.id;
  Order.find({ userId }, { userId: 0 })
    .then((resp) => {
      return res.json({ orders: resp });
    })
    .catch((err) => console.log(err));
};
