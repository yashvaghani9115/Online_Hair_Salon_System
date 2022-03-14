import Barber from "../models/barberModel.js";
import CustomerOrder from "../models/CustomerOrderModel.js";
import Shop from "../models/shopModel.js";

export const ordercomplete = async (req, res) => {
    try {
        const { cust_id, barber_id } = req.body;
        const barber = await Barber.findByIdAndUpdate(barber_id, { $pull: { customer_ids: cust_id } });
        const order = await CustomerOrder.findOneAndUpdate({ customer_id: cust_id, status: "waiting" }, { status: "completed" }, {
            new: true
        });

        res.json({ stat: true, message: "Completed" });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
};

export const deleteorder = async (req, res) => {
    try {
        const { cust_id, barber_id } = req.body;

        await Barber.findByIdAndUpdate(barber_id, { $pull: { customer_ids: cust_id } });
        await CustomerOrder.findOneAndUpdate({ customer_id: cust_id, status: "waiting" }, { status: "cancel" }, { new: true });
        res.json({ stat: true, message: "removed" });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
};

export const orderList = async (req, res) => {
    try {
        const { cust_id } = req.body;
        const orderlist = await CustomerOrder.find({ customer_id: cust_id })
        let Orders = []

        for (let i = 0; i < orderlist.length; i++) {
            const barber = await Barber.findById(orderlist[i].barber_id);
            const shop = await Shop.findById(orderlist[i].shop_id)
            Orders.push({ barber: barber, shop: shop, status: orderlist[i].status, order_id: orderlist[i]._id, rating: orderlist[i].rating, date: orderlist[i].date })
        }

        Orders.sort(
            function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }
        )
        res.json({ stat: true, orders: Orders, message: "order list" });

    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
};

export const updateRating = async (req, res) => {
    try {
        const { order_id, new_rating } = req.body;
        const order = await CustomerOrder.findById(order_id);
        const shop = await Shop.findById(order.shop_id);

        const avgRating = shop.avg_rating;
        const NumberOfRating = shop.number_of_rating;
        const newRating = (avgRating * NumberOfRating / (NumberOfRating + 1)) + (new_rating / (NumberOfRating + 1));

        await shop.set({ number_of_rating: NumberOfRating + 1, avg_rating: newRating });
        await shop.save();

        await order.set({ rating: new_rating });
        await order.save();

        res.json({ stat: true, message: "Thank you for your valuable rating." });
    }
    catch (err) {
        res.json({ wentWrong: true, message: "Something went wrong !" });
        console.log(err.message);
    }
};
