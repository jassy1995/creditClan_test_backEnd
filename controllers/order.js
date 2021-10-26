const User = require("../models/user");
const Order = require("../models/order");

exports.postOrder = async (req, res, next) => {
  let { step, message } = req.body;
  let GreetingText = [
    "hi",
    "hellow",
    "xup",
    "how far",
    "how are you doing",
    "what's up",
  ];

  let operations = [
    "Buy airtime on credit",
    "Pay DSTV on credit",
    "Buy data on credit",
    "Buy Power on credit",
    "Pay Startimes on credit",
    "Pay Gotv on credit",
    "Renew rent",
    "Find house",
    "Quit",
  ];
  let networks = ["MTN", "GLO", "AIRTEL", "9MOBILE", "PREVIOUS"];
  let amounts = [100, 200, 500, 1000, "PREVIOUS"];
  let Durations = ["1 month", "2 Months", "3 Months", "PREVIOUS"];
  let DurationAmount = [2000, 2500, 5000, "PREVIOUS"];
  let datas = ["1GB", "2GB", "4GB", "PREVIOUS"];

  let isGreeting = GreetingText.find(
    (greeting) => greeting === message.toLowerCase()
  );

  let isNetwork = networks.find((network) => network === step);
  let isAmount = amounts.find((amount) => amount === step);
  let isDuration = Durations.find((duration) => duration === step);
  let isDurationAmount = DurationAmount.find((da) => da === step);
  let isData = datas.find((d) => d === step);

  if (!message) {
    return res.json({ errorResponse: "please fill the field correctly" });
  } else {
    if (isGreeting) {
      return res.json({
        resMessage: "Hi, what will you love to purchase on credit?",
        operations,
      });
    } else if (message === "1" && step === operations[0]) {
      let savedOrder = new Order({
        Title: step,
        Network: "pending",
        Duration: "null",
        Amount: 0,
        Quantity: "null",
        userId: req.user.id,
      });
      savedOrder.save();
      return res.json({
        resMessage: "please select network type",
        operations: networks,
      });
    } else if (
      (message === "1" ||
        message === "2" ||
        message === "3" ||
        message === "4") &&
      isNetwork
    ) {
      let updateOrderNetwork = await Order.findOne({
        userId: req.user.id,
        Network: "pending",
      });
      if (updateOrderNetwork) {
        updateOrderNetwork.Network = step;
        updateOrderNetwork.save();
      }
      return res.json({
        resMessage: "please select amount",
        operations: amounts,
      });
    } else if (message === "5" && networks[networks.length - 2] === "9MOBILE") {
      return res.json({
        resMessage: "please select network type",
        operations: networks,
      });
    } else if (
      (message === "1" ||
        message === "2" ||
        message === "3" ||
        message === "4") &&
      isAmount
    ) {
      let updateOrderAmount = await Order.findOne({
        userId: req.user.id,
        Amount: 0,
      });
      if (updateOrderAmount) {
        updateOrderAmount.Amount = Number(step);
        updateOrderAmount.save();
      }
      return res.json({
        resMessage: "your request has been received",
        operations,
      });
    } else if (message === "2" && step === operations[1]) {
      let savedOrder = new Order({
        Title: step,
        Network: "null",
        Duration: "pending",
        Amount: 0,
        Quantity: "null",
        userId: req.user.id,
      });
      savedOrder.save();
      return res.json({
        resMessage: "please select duration",
        operations: Durations,
      });
    } else if (
      (message === "1" || message === "2" || message === "3") &&
      isDuration
    ) {
      let updateOrderDuration = await Order.findOne({
        userId: req.user.id,
        Duration: "pending",
      });
      if (updateOrderDuration) {
        updateOrderDuration.Duration = step;
        updateOrderDuration.save();
      }
      return res.json({
        resMessage: "please select amount to pay",
        operations: DurationAmount,
      });
    } else if (
      (message === "1" || message === "2" || message === "3") &&
      isDurationAmount
    ) {
      let updateOrderDurationAmount = await Order.findOne({
        userId: req.user.id,
        Amount: 0,
      });
      if (updateOrderDurationAmount) {
        updateOrderDurationAmount.Amount = Number(step);
        updateOrderDurationAmount.save();
      }
      return res.json({
        resMessage: "your request has been received",
        operations,
      });
    } else if (message === "3" && step === operations[2]) {
      let savedOrder = new Order({
        Title: step,
        Network: "pending",
        Duration: "null",
        Amount: "null",
        Quantity: "pending",
        userId: req.user.id,
      });
      savedOrder.save();
      return res.json({
        resMessage: "please select network type",
        operations: networks,
      });
    } else if (
      (message === "1" ||
        message === "2" ||
        message === "3" ||
        message === "4") &&
      isNetwork
    ) {
      let updateOrderNetwork = await Order.findOne({
        userId: req.user.id,
        Network: "pending",
      });
      if (updateOrderNetwork) {
        updateOrderNetwork.Network = step;
        updateOrderNetwork.save();
      }
      return res.json({
        resMessage: "please select quantity",
        operations: datas,
      });
    } else if (message === "4" && isData) {
      return res.json({
        resMessage: "please select network type",
        operations: networks,
      });
    } else if (
      (message === "1" || message === "2" || message === "3") &&
      isData
    ) {
      let updateOrderQuantity = await Order.findOne({
        userId: req.user.id,
        Quantity: "pending",
      });
      if (updateOrderQuantity) {
        updateOrderQuantity.Quantity = step;
        updateOrderQuantity.save();
      }
      return res.json({
        resMessage: "your request has been received",
        operations,
      });
    } else if (message === "9" && step === operations[8]) {
      return res.json({
        resMessage: "you have successful quit the app",
      });
    } else {
      return res.json({
        resError: "please enter a valid option",
        operations,
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
