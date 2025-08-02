const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");
const moment = require("moment");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 👇 FIXED: Proper 60-day and 30-day date cutoffs using moment
    const sixtyDaysAgo = moment().subtract(60, "days").startOf("day").toDate();
    const thirtyDaysAgo = moment().subtract(30, "days").startOf("day").toDate();

    // Last 60 days income
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: sixtyDaysAgo },
    })
      .sort({ date: -1 })
      .select("source amount date"); // Clean payload

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 days expense
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: thirtyDaysAgo },
    })
      .sort({ date: -1 })
      .select("category amount date");

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 recent transactions
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          title: txn.source,
          amount: txn.amount,
          date: txn.date,
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          title: txn.category,
          amount: txn.amount,
          date: txn.date,
          type: "expense",
        })
      ),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // 👇 TEMP DEBUG — remove after confirming
    console.log("💰 Last 60 Days Income Transactions:", last60DaysIncomeTransactions);

    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
